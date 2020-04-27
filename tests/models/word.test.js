import test from 'ava';
import { insertWords, deleteWords, injectWords } from './../helpers/initialization.js';
import { Word } from '@models';

test.before('prepare database', async t => {
  t.context.words = await insertWords("words1");
  t.context.words3 = injectWords(require('./../fixtures/words.json')["words3"], t.context.words)
})

test.after.always('clean up database', async t => {
  await deleteWords('Test%');
})

test('should get the filtrated list of words for the user to decide which to keep', async t => {
  const processed = require('./../fixtures/words.json')["words2"];
  const actual = await Word.compareBeforeSaving(processed);
  const expected = t.context.words3;

  t.deepEqual(actual, expected);
})