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

