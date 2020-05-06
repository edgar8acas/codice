import test from 'ava';
import { insertTexts, insertRawContent, cleanupDatabase } from './../helpers/initialization.js';
import { extractIds, prepareEssentialWords } from './../helpers/utils.js';
import { Text } from '@models';
import { processTexts } from '@processing';

test.before('prepare database', async t => {
  t.context.texts = await insertTexts(require('./../fixtures/texts.json').slice(4,7));
  let files = [
    'bancos.txt',
    'cine.txt',
    'colegios.txt',
  ];
  await Promise.all(files.map((file, index) => insertRawContent(file, t.context.texts[index])))
})

test.after.always('clean up database', async t => {
  await cleanupDatabase();
})

test('should get the default group of texts to process a new text, given its id', async t => {
  const textIds = extractIds(t.context.texts, 'text');
  const items = await Text.getTextsToProcess(textIds[0]);
  const expectedIds = extractIds(items, 'text');
  t.deepEqual(textIds.sort(), expectedIds.sort());
})

test.skip('should get the essential words for a single text, given its id', async t => {
  const textIds = extractIds(t.context.texts, 'text')
  const texts = await Text.getTextsToProcess(textIds[0]);
  
  const actual = await processTexts(texts);
  const expected = await prepareEssentialWords(require('./../fixtures/words.json')["words4"], t.context.texts);
  
  t.deepEqual(actual, expected);
})