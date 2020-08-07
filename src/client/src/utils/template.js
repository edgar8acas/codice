import Occurrence from "@/utils/occurrence";
import UserOccurrence from "@/utils/user_occurrence";

//Will escape the string passed to it so it's mached verbatim as it was passed
function escapeForRegExp(str) {
  return str.replace(/[\\^$.*+?()[\]{}|]/g, "\\$&");
}

/** Returns an array of occurrences, new lines or strings representing chunks of the text.*/
export function getTokenizedContent({
  ocurrences,
  text,
  onlyNewLines = false
}) {
  const newLineOccurrences = findNewLinesInText(text);
  const tokens = [];
  if (onlyNewLines) {
    tokens.push(...newLineOccurrences);
  } else {
    tokens.push(...ocurrences, ...newLineOccurrences);
  }
  tokens.sort((a, b) => a.start - b.start);
  const tokenizedContent = splitContentFromTokens(tokens, text);
  return tokenizedContent;
}

/** In case words is a conflict/ready structure, transform it to array of words */
function prepareWordsArray(words, isConflicts = false) {
  if (isConflicts) {
    //merge conflicts structure in single array
    let joined = [];
    for (const property of ["conflicts", "ready"]) {
      joined = [
        ...joined,
        ...Object.entries({ ...words[property] }) //avoid mutating the object
          .map(([key, value]) => {
            let mWord = value.length > 0 ? [[...value]] : [[]]; //avoid mutating the array
            mWord.unshift(property);
            mWord.push(key); //Word string
            return mWord;
          }),
      ];
    }
    return joined;
  }
  return words;
}

/** It receives the text content, ordered new lines and occurrences tokens,
 * and returns an array where each element can be either a chunk of the content text,
 * an occurrence or a new line in the order they appear in text.
 */
export function splitContentFromTokens(tokens, text) {
  if (Array.isArray(tokens)) {
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
      if (j === tokens.length - 1) {
        return [
          text.rawContent.substring(start, end),
          token.relatedWords ? token.relatedWords[2] : token.word,
          text.rawContent.substring(token.ending, text.rawContent.length + 1),
        ];
      }

      //Any other token
      return [text.rawContent.substring(start, end), token];
    });
    return splitted;
  }
  throw new TypeError("Occurrences is not an array");
}

export function findOccurrencesInText({ text, conflicts, ready }) {
  const mWords = prepareWordsArray(
    { conflicts: { ...conflicts }, ready: { ...ready } },
    true
  );
  let occurrences = [];
  mWords.forEach((related) => {
    const status = "conflicts";
    const regex = getRegexFromWord(related[2]);

    for (const match of text.rawContent.matchAll(regex)) {
      occurrences.push(
        new Occurrence(
          {
            word: related[2],
            start: match.index,
            ending: match.index + match[0].length,
            textId: text.textId,
            markedStatus: status,
          },
          related[1]
        )
      );
    }
  });
  return occurrences;
}

function findNewLinesInText(text) {
  let newLines = [];
  for (const match of text.rawContent.matchAll(new RegExp("\\n+", "g"))) {
    newLines.push({
      start: match.index,
      ending: match.index + match[0].length,
    });
  }
  return newLines;
}
/** Transform the row response of occurrence objects and creates instances of Occurrence or UserOccurrences */
export function generateOccurrences({
  occurrences,
  template = false,
  dictionaryWords,
}) {
  return occurrences.map((o) => {
    if (template) {
      return new Occurrence(o);
    } else {
      return new UserOccurrence(
        o,
        dictionaryWords.find((dw) => dw.Word.wordId === o.Word.wordId)
      );
    }
  });
}

function getRegexFromWord(word) {
  return new RegExp("\\b" + escapeForRegExp(word) + "\\b", "gi");
}

export function getSelectedWordDetails(text) {
  const selection = window.getSelection();
  console.log(selection);
  console.log(
    text.rawContent.substring(selection.anchorOffset, selection.focusOffset)
  );

  return {
    start: selection.anchorOffset,
    ending: selection.focusOffset,
    word: text.rawContent.substring(
      selection.anchorOffset,
      selection.focusOffset
    ),
    textId: text.textId,
  };
  //const range = selection.getRangeAt(0);
  /*const textContentNode = range.startContainer.parentNode;
  const textContentRange = new Range();
  textContentRange.selectNode(textContentNode);
  const startContainerRange = new Range();
  startContainerRange.selectNode(range.startContainer);

  let startCharOfStartContainer = 0;
  for (let i = 0; i < startContainerRange.startOffset; i++) {
    const node = textContentNode.childNodes[i];
    
    //text-node
    if (node.nodeType === 3) {
      startCharOfStartContainer += node.length;
    }

    //element-node
    if (node.nodeType === 1) {
      /*if (node.nodeName === 'br') 
        //startCharOfStartContainer += 1
      else 
        startCharOfStartContainer += node.innerText.length
    }
  }

  const startOfWord = startCharOfStartContainer + range.startOffset;
  const endOfWord = startCharOfStartContainer + range.startOffset + (range.endOffset - range.startOffset);
  console.log(startCharOfStartContainer, range.startOffset);
  console.log(textContentNode.innerText.substring(startOfWord, endOfWord));
  
  
  console.log(selection)
  console.log(range)
  console.log(textContentNode, textContentNode.nodeType);
  console.log(startContainerRange, range.startContainer.nodeType);
  */
}
