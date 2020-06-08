export default function Occurrence(data, relatedWords = []) {
  const { word, start, ending, textId, wordId, markedStatus } = data;
  this.start = start;
  this.word = word;
  this.ending = ending;
  this.textId = textId;
  this.wordId = wordId;
  this.occurrenceId = undefined;
  this.markedStatus = markedStatus;
  this.relatedWords = relatedWords;
}

Object.defineProperties(Occurrence.prototype, {
  _selectedWordId: {writable: true, enumerable: false},
  selectedWordId: {
    get: function() {
      return this._selectedWordId || null;
    },
    set: function(wordId) {
      const word = this.relatedWords.find(
        w => w.wordId === wordId 
      );
      if(word) {
        this._selectedWordId = word.wordId
        this.markedStatus = 'ready';
      }
      else {
        this._selectedWordId = null;
        this.markedStatus = 'conflict';
      }
    },
    enumerable: true
  }
});

Occurrence.prototype.selectDefault = function() {
  if(this.relatedWords.length > 0) {
    this.selectedWordId = this.relatedWords[0].wordId;
    this.markedStatus = 'ready';
  }
}

Occurrence.prototype.toJSON = function() {
  return {
    start: this.start,
    word: this.word,
    ending: this.ending,
    textId: this.textId,
    wordId: this.wordId,
    occurrenceId: this.occurrenceId,
    markedStatus: this.markedStatus,
    relatedWords: this.relatedWords,
    selectedWordId: this.selectedWordId,
  }
}