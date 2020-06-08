import Occurrence from '@/utils/occurrence';

//Will escape the string passed to it so it's mached verbatim as it was passed
function escapeForRegExp(str) {
  return str.replace(/[\\^$.*+?()[\]{}|]/g, '\\$&');
}

/** Encloses each text's essential word in a span element, returning the modified text content */
export function markEssentialWords(text, words) {
  const isConflicts = words.conflicts !== undefined && words.ready !== undefined;
  const mWords = prepareWordsArray(words, isConflicts);
  
  const markedContent = replaceWithSpan(text, mWords, isConflicts);
  return markedContent;
}

function replaceWithSpan(text, words, isConflicts = false) {
  let replacedText = "";
  if(words.length > 0) {
    const next = words.shift();
    if(isConflicts) {
      const regex = new RegExp('\\b' + escapeForRegExp(next[1].word) + '\\b', 'gi');
      replacedText = text.replace(regex, `<span class="inline-word ${next[0]}" data-id="_${next[1].wordId}">${next[1].word}</span>`);
    } else {
      const regex = new RegExp('\\b' + escapeForRegExp(next.word) + '\\b', 'gi');
      replacedText = text.replace(regex, `<span class="inline-word" data-id="_${next.wordId}">${next.word}</span>`);
    }
    return replaceWithSpan(replacedText, words, isConflicts);
  }
  else
    return text;
}

/** In case words is a conflict/ready structure, transform it to array of words */
function prepareWordsArray(words, isConflicts = false) {
  if(isConflicts) {
    //merge conflicts structure in single array
    let joined = []
    for (const property of ['conflicts', 'ready']) {
      joined = [...joined,
        ...Object.entries({...words[property]}) //avoid mutating the object
          .map(([key, value]) => {
            let mWord = value.length > 0 ? [[...value]] : [[]]; //avoid mutating the array
            mWord.unshift(property);
            mWord.push(key); //Word string
            return mWord;
          })];
    }
    return joined;
  }
  return words;
}

/** It receives the modified content, and returns an array where each element can be either a chunk of the content
 * or a hypermarked essential word, in the order they appear in text.
 */
export function splitContentFromTokens(tokens, text) {
  if(Array.isArray(tokens)) {
    const splitted = tokens.flatMap((token, j, tokens) => {
      let start;
      let end = token.start;
      
      if (j === 0) {
        start = 0;
      } else {
        let previous = j - 1;
        start = tokens[previous].ending;
      }

      //Last token
      if(j === tokens.length - 1) {
        return [
          text.rawContent.substring(start, end), 
          token.relatedWords[2], 
          text.rawContent.substring(token.ending, text.rawContent.length + 1)
        ];
      }

      //Any other token
      return [
        text.rawContent.substring(start, end), 
        token
      ];

    });
    return splitted;
  }
  throw new TypeError('Occurrences is not an array')

}

export function getTokenizedContent(wordOccurrences, text) {
  const newLineOccurrences = findNewLinesInText(text);
  const tokens = [...wordOccurrences, ...newLineOccurrences];
  tokens.sort((a, b) => a.start - b.start);
  const tokenizedContent = splitContentFromTokens(tokens, text);
  return tokenizedContent;
}

export function findOccurrencesInText({text, conflicts, ready}) {
  const mWords = prepareWordsArray({ conflicts: {...conflicts}, ready: {...ready}}, true);
  let occurrences = [];
  mWords.forEach(related => {
    const status = 'conflicts';
    const regex = new RegExp('\\b' + escapeForRegExp(related[2]) + '\\b', 'gi');
    
    for(const match of text.rawContent.matchAll(regex)) {
      occurrences.push(new Occurrence({
        word: related[2],
        start: match.index,
        ending: match.index + match[0].length,
        textId: text.textId,
        markedStatus: status
      }, related[1]));
    }
  });
  return occurrences;
}


function findNewLinesInText(text) {
  let newLines = [];
  for(const match of text.rawContent.matchAll(new RegExp('\\n+', 'g'))) {
    newLines.push({
      start: match.index,
      ending: match.index + match[0].length
    })
  }
  return newLines;
}
