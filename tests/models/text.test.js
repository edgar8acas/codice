import test from 'ava';
import { insertTexts, insertRawContent, deleteTexts } from './../helpers/initialization.js';
import { extractIds } from './../helpers/utils.js';
import { Text } from '@models';
import { processTexts } from '@processing';

test.before('prepare database', async t => {
  t.context.texts = await insertTexts(-3);
  let files = [
    'bancos.txt',
    'cine.txt',
    'colegios.txt',
  ];
  await Promise.all(files.map((file, index) => insertRawContent(file, t.context.texts[index])))
})

test.after.always('clean up database', async t => {
  await deleteTexts('test%');
})

test.skip('should get the default group of texts to process a new text, given its id', async t => {
  const textIds = extractIds(t.context.texts, 'text');
  const items = await Text.getTextsToProcess(textIds[0]);
  const expectedIds = extractIds(items, 'text');
  t.deepEqual(textIds.sort(), expectedIds.sort());
})

test.serial('should get the essential words for a single text, given its id', async t => {
  const textIds = extractIds(t.context.texts, 'text')
  const texts = await Text.getTextsToProcess(textIds[0]);
  const words = await processTexts(texts);
  
  //TODO: Define structure
  const expectedWords = require('./../fixtures/words.json');
  t.deepEqual(words, expectedWords);
})