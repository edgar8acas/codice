export default function UserOccurrence(data, dictionaryWord = {}) {
  const { Word, start, ending, textId, userOccurrenceId, userId,} = data;
  this.Word = Word
  this.start = start;
  this.word = Word.word;
  this.ending = ending;
  this.textId = textId;
  this.wordId = Word.wordId;
  this.userId = userId;
  this.occurrenceId = userOccurrenceId;
  this.dictionaryWord = dictionaryWord;
}

Object.defineProperties(UserOccurrence.prototype, {
  _markedStatus: { writable: true, enumerable: false },
  markedStatus: {
    get: function() {
      return this.dictionaryWord.isLearned ? 'learnt' : 'unlearnt';
    },
    enumerable: true
  }
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