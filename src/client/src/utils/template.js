//Will escape the string passed to it so it's mached verbatim as it was passed
function escapeForRegExp(str) {
  return str.replace(/[\\^$.*+?()[\]{}|]/g, '\\$&');
}

/** Encloses each text's essential word in a span element, returning a modified text content */
export function markEssentialWords(text, words) {
  let replacedText;
  if(words.length > 0) {
    const next = words.shift()
    const regex = new RegExp('\\b' + escapeForRegExp(next.word) + '\\b', 'gi');
    replacedText = text.replace(regex, `<span class="identified">${next.word}</span>`)
    return markEssentialWords(replacedText, words);
  }
  else
    return text;
}

/** It receives the modified content, and returns an array where each element can be either a chunk of the content
 * or a hypermarked essential word, in the order they appear in text.
 */
export function splitTemplate(template) {
  let regex = /(?:<span[\s\w="-]*>)([\w\sóé,.íñ;á:ú]*)(?:<\/span[\s\w="-]*>)/gi;
  const matches = [...template.matchAll(regex)];
  
  const splitted = matches.flatMap((match, j, matches) => {
    let start;
    let end = match.index;
    
    if (j === 0) {
      start = 0;
    } else {
      let previous = j - 1;
      start = matches[previous].index + matches[previous][0].length;
    }
    
    return [template.substring(start, end), match[0]];
  });
  
  return splitted;
}