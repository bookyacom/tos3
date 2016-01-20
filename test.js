'use strict';

import test from 'ava';
import proxyquire from 'proxyquire';

const fixture = {
  config: {
    ACCESS_KEY: 'test',
    SECRET_KEY: 'test',
    BUCKET: 'test',
    ACL: 'test',
  }
};

test('checks error on required fields', t => {
  t.plan(5);
  const app = require('./');
  const fixtures = [
      null,
    {
      ACCESS_KEY: 'test'
    },
    {
      SECRET_KEY: 'test'
    },
    {
      BUCKET: 'test'
    },
    {
      ACL: 'test'
    }
  ];

  for (let fixture of fixtures) {
    t.throws(app.bind(app, fixture), /required property are not available/g);
  }
});

test('checks on error required fields on upload', t => {
  const app = require('./');
  const uploader = app(fixture.config);
  t.throws(uploader, /url is required/g);
});

test.cb('checks on buffer unidentify-able', t => {
  const app = proxyquire('./', {
    got: function() {
      return Promise.resolve({
        body: 'test'
      });
    }
  });

  const uploader = app(fixture.config);
  uploader('url')
    .catch((err) => {
      t.is(err.message, 'buffer object type is unable to identify');
      t.end();
    });
});

test.cb('checks on return chuck is unavailable', t => {
  const app = proxyquire('./', {
    got: function() {
      return Promise.resolve({
        body: null
      });
    }
  });

  const uploader = app(fixture.config);
  uploader('url')
    .catch((err) => {
      t.is(err.message, 'no return value from URL');
      t.end();
    });
});
