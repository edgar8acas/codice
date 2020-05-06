import supertest from 'supertest';
import app from './../../server.js';
import test from 'ava';
import path from 'path';
import { insertTexts, cleanupDatabase } from './../helpers/initialization.js';

test.before('prepare database', async t => {
  t.context.agent = supertest(app);
})

test.afterEach.always('cleanup', async t => {
  await cleanupDatabase();
});

test.serial('should save a new text', async t => {
  const text = require('./../fixtures/texts.json')[0];

  const res = await t.context.agent
    .post('/api/texts')
    .send(text)
  
  const { body, statusCode } = res;
  t.is(statusCode, 201);
  t.is(body.title, text.title);
})

test.serial('should save raw content of an existing text', async t => {
  const text = require('./../fixtures/texts.json')[0];  
  const saved = await insertTexts([text]);

  const res = await t.context.agent
    .post('/api/texts/:id/content')
    .attach('rawContent', path.resolve(__dirname, '../data/aeropuerto.txt'))
    .field('textId', saved[0].textId);

  const { body, statusCode } = res;
  t.is(statusCode, 200);
  t.truthy(body.rawContent);
})

test.serial('should get single text from database', async t => {
  const text = require('./../fixtures/texts.json')[0];
  const saved = await insertTexts([text]);

  const res = await t.context.agent
    .get(`/api/texts/${saved[0].textId}`);
  
  const { body, statusCode } = res;
  t.is(statusCode, 200);
  t.is(body.textId, saved[0].textId);
})

test.serial('should get all texts from database', async t => {
  const texts = require('./../fixtures/texts.json').slice(0,3);
  const saved = await insertTexts(texts);

  const res = await t.context.agent
    .get('/api/texts');

  const { body, statusCode } = res;
  t.is(statusCode, 200);
  t.is(body.length, saved.length);
})
