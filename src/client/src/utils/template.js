//Will escape the string passed to it so it's mached verbatim as it was passed
function escapeForRegExp(str) {
  return str.replace(/[\\^$.*+?()[\]{}|]/g, '\\$&');
}


export default function generateTemplate(words, text) {
  let content = text.rawContent;
  const template = words.map((w) => {
    const escapedWord = escapeForRegExp(w.word);
    const wordRegex = new RegExp('\\b' + escapedWord + '\\b', 'gi');
    content = content.replace(wordRegex, `<span class="identified">${escapedWord}</span>`);
    return content;
  })
  return template[words.length-1];
}