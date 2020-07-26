export default function UserOccurrence(
  {
    userOccurrenceId,
    selectedWordId,
    userId,
    essential,
    visible,
    textId,
    start,
    ending,
    word,
    Word,
  }
) {
  this.userOccurrenceId = userOccurrenceId;
  this.selectedWordId = selectedWordId;
  this.userId = userId;
  this.essential = essential;
  this.visible = visible;
  this.textId = textId;
  this.start = start;
  this.ending = ending;
  this.word = word;
  this.selectedWordObject = Word;
  this.current = false;
}

UserOccurrence.prototype.selectDefault = function () {
  if (this.matchingWords.length > 0) {
    this.selectedWordId = this.matchingWords[0].wordId;
    this.markedStatus = "ready";
  }
};

UserOccurrence.prototype.toggleCurrent = function() {
  this.current = !this.current;
}
/*Occurrence.prototype.toJSON = function() {
  return {
    start: this.start,
    word: this.word,
    ending: this.ending,
    textId: this.textId,
    wordId: this.wordId,
    occurrenceId: this.occurrenceId,
    markedStatus: this.markedStatus,
  }
}*/
