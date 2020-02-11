/* global before, describe, it */
/* eslint global-require: 0, no-unused-expressions: 0 */

const request = require('supertest');
const { expect } = require('chai');

process.env.NODE_ENV = 'production';
let api;

describe('Routes', () => {
  before((done) => {
    api = require('../examples/server.js');
    done();
  });

  it('GET    /', (done) => {
    request(api)
      .get('/')
      .expect(200)
      .expect((res) => {
        expect(res.body).to.have.property('method');
        expect(res.body.method).to.equal('GET');
      })
      .end(done);
  });

  it('GET   /admin', (done) => {
    request(api)
      .get('/admin')
      .expect(401)
      .expect((res) => {
        expect(res.text).to.equal('Your are not an Administrator');
      })
      .end(done);
  });

  it('GET    /teapot', (done) => {
    request(api)
      .get('/teapot')
      .expect(418)
      .expect((res) => {
        expect(res.body).to.have.property('method');
        expect(res.body.method).to.equal('GET');
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.equal(418);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.equal('I\'am a teapot !');
      })
      .end(done);
  });

  it('GET    /blog/1', (done) => {
    request(api)
      .get('/blog/1')
      .expect(200)
      .expect((res) => {
        expect(res.body).to.have.property('method');
        expect(res.body.method).to.equal('GET');
        expect(res.body).to.have.property('article');
        expect(res.body.article.id).to.equal('1');
        expect(res.body.article.author).to.equal('John Doe');
      })
      .end(done);
  });

  it('PATCH  /blog/1/edit', (done) => {
    request(api)
      .patch('/blog/1/edit')
      .query({ author: 'Jane Doe' })
      .expect(200)
      .expect((res) => {
        expect(res.body).to.have.property('method');
        expect(res.body.method).to.equal('PATCH');
        expect(res.body).to.have.property('data');
        expect(res.body.data.author).to.equal('Jane Doe');
      })
      .end(done);
  });
});
