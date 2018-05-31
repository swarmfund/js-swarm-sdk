'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _blobs = require('./blobs');

Object.keys(_blobs).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _blobs[key];
    }
  });
});

var _wallets = require('./wallets');

Object.keys(_wallets).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _wallets[key];
    }
  });
});

var _factors = require('./factors');

Object.keys(_factors).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _factors[key];
    }
  });
});

var _users = require('./users');

Object.keys(_users).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _users[key];
    }
  });
});

var _documents = require('./documents');

Object.keys(_documents).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _documents[key];
    }
  });
});

var _kyc_entities = require('./kyc_entities');

Object.keys(_kyc_entities).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _kyc_entities[key];
    }
  });
});