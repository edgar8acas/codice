export default function Occurrence(data, matchingWords = []) {
  for (const key of Object.keys(data)) {
    this[key] = data[key];
  }
  this.matchingWords = matchingWords;
}

Object.defineProperties(Occurrence.prototype, {
  _selectedWordId: { writable: true, enumerable: false },
  selectedWordId: {
    get: function () {
      return this._selectedWordId || null;
    },
    set: function (wordId) {
      const word = this.matchingWords.find((w) => w.wordId === wordId);
      if (word) {
        this._selectedWordId = word.wordId;
        this.markedStatus = "ready";
      } else {
        this._selectedWordId = null;
        this.markedStatus = "conflict";
      }
    },
    enumerable: true,
  },

  _matchingWords: { writable: true, enumerable: false },
  matchingWords: {
    get: function () {
      return this._matchingWords || [];
    },
    set: function (matchingWords) {
      this._matchingWords = matchingWords;
    },
    enumerable: true,
  },

  /*status: {
    get: function () {
      if (this._matchingWords.length > 0) {
        return "with-meanings";
      }
      return "no-meanings";
    },
  },*/

  availableStyle: {
    get: function () {
      return this.availableMeanings ? "with-meanings" : "no-meanings";
    },
    enumerable: true,
  },
});

Occurrence.prototype.selectDefault = function () {
  if (this.matchingWords.length > 0) {
    this.selectedWordId = this.matchingWords[0].wordId;
    this.markedStatus = "ready";
  }
};

Occurrence.prototype.toJSON = function () {
  return {
    start: this.start,
    word: this.word,
    ending: this.ending,
    textId: this.textId,
    wordId: this.wordId,
    occurrenceId: this.occurrenceId,
    markedStatus: this.markedStatus,
    matchingWords: this.matchingWords,
    selectedWordId: this.selectedWordId,
  };
};
