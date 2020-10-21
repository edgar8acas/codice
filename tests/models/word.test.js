import test from "ava";
import { insertWords, deleteWords } from "./../helpers/initialization.js";
import { prepareWordsToChoose } from "./../helpers/utils.js";
import { Word } from "@/models";

test.before("prepare database", async (t) => {
  t.context.words = await insertWords("words1");
  t.context.wordsToChoose = prepareWordsToChoose(
    require("./../fixtures/words.json")["words3"],
    t.context.words
  );
});

test.afterEach.always("clean up database", async () => {
  await deleteWords("Test%");
});

test.skip("should get the filtrated list of words for the user to choose which to keep", async (t) => {
  const processed = require("./../fixtures/words.json")["words2"];
  const actual = await Word.compareBeforeSaving(processed);
  const expected = t.context.wordsToChoose;
  t.deepEqual(actual, expected);
});
