export function extractIds(items, modelName) {
  return items.map(item => item[modelName + 'Id'])
}

//Will push words already in the database to the expected result
export function prepareWordsToChoose(fixture, saved) {
  const conflictWords = Object.keys(fixture.conflicts);
  const savedWords = saved.map(saved => saved.word);
  const intersection = conflictWords.filter(conflict => savedWords.includes(conflict));

  intersection.forEach(word => {
    fixture.conflicts[word].unshift(
      ...saved
        .filter(s => s.word === word)
        .map(s => s.dataValues)
      );
  });
  return fixture;
}