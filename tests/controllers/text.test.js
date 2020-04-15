import supertest from 'supertest';
import app from './../../server.js';
import test from 'ava';
import path from 'path';
import { insertTexts, deleteTexts } from './../helpers/initialization.js';

test.before('prepare database', async t => {
  t.context.agent = supertest(app);
  t.context.texts = await insertTexts();
})

test.after.always('clean up database', async t => {
  await deleteTexts();
})

test('should save a new text', async t => {
  t.plan(2);
  const text = require('./../fixtures/texts.json')[3];

  const res = await t.context.agent
    .post('/api/texts')
    .send(text)
  
  const { body, statusCode } = res;
  t.is(statusCode, 201);
  t.not(body.data, undefined);
})

test('should save raw content of an existing text', async t => {
  const text = t.context.texts[0];

  const res = await t.context.agent
    .post('/api/texts/:id/content')
    .attach('rawContent', path.resolve(__dirname, '../data/aeropuerto.txt'))
    .field('textId', text.textId);
  
    const { body, statusCode } = res;
    t.is(statusCode, 200);
    t.not(body.data.rawContent, null);
})

test('should get single text from database', async t => {
  t.plan(2);
  let textId = t.context.texts[1].textId;

  const res = await t.context.agent
    .get(`/api/texts/${textId}`);
  
  const { body, statusCode } = res;
  t.is(statusCode, 200);
  t.is(body.data.textId, textId);
})
