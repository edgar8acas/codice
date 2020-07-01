export default function UserOccurrence(data, dictionaryWord = null, matchingWords = []) {
  for (const key of Object.keys(data)) {
    if (key === 'Word') {
      this['relatedWord'] = data[key];
      break;
    }
    this[key] = data[key];
  }
  this.dictionaryWord = dictionaryWord;
  this.matchingWords = matchingWords;
}

Object.defineProperties(UserOccurrence.prototype, {
  learntStyle: {
    get: function() {
      return this.dictionaryWord ? 
        this.dictionaryWord.isLearned ? 'learnt' : 'not-learned'
        : 'not-selected-word';
    },
    enumerable: true
  },
  availableStyle: {
    get: function() {
      return this.availableMeanings ? 'with-meanings' : 'no-meanings';
    },
    enumerable: true
  },
  essentialStyle: {
    get: function() {
      return this.essential ? 'essential' : 'unessential';
    },
    enumerable: true
  },
  visibleStyle: {
    get: function() {
      return this.visible ? 'visible' : 'invisible';
    },
    enumerable: true
  },
});

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