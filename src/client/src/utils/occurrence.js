export default function Occurrence({
  templateId,
  start,
  ending,
  word,
  textId,
}) {
  this.occurrenceId = templateId;
  this.start = start;
  this.ending = ending;
  this.word = word;
  this.textId = textId;
}

Occurrence.prototype.toJSON = function () {
  return {
    occurrenceId: this.occurrenceId,
    matchingWords: this.matchingWords,
    start: this.start,
    word: this.word,
    ending: this.ending,
    textId: this.textId,
  };
};
