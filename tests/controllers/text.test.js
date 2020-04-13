import supertest from 'supertest';
import app from './../../server.js';
import test from 'ava';

test.before(async t => {
  t.context.agent = supertest(app)
})

test('should save a new text', async t => {
  const body = {
    name: 'a text'
  };

  const res = await t.context.agent
    .post('/api/texts')
    .send(body)
    .expect('Content-Type', /json/)
    .expect(200)

  console.log(res.body);
  t.pass();
})