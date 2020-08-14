export default function DictionaryWord({
  dictionaryId,
  wordId,
  userId,
  isLearned,
  Word,
}) {
  this.dictionaryId = dictionaryId;
  this.selectedWordObject = Word;
  this.wordId = wordId;
  this.userId = userId;
  this.isLearned = isLearned;
}
