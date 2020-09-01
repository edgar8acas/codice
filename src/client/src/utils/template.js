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
  onlyNewLines = false,
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

export function findOccurrencesInText({ text, processed }) {
  let occurrences = [];
  processed.forEach((word) => {
    const regex = getRegexForWord(word);

    for (const match of text.rawContent.matchAll(regex)) {
      occurrences.push(
        new Occurrence(
          {
            word: word,
            start: match.index,
            ending: match.index + match[0].length,
            textId: text.textId,
          }
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
export function generateOccurrences({ occurrences, template = false }) {
  return occurrences.map((o) => {
    if (template) {
      return new Occurrence(o);
    } else {
      return new UserOccurrence(o);
    }
  });
}

function getRegexForWord(word) {
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
}
