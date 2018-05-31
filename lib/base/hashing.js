'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hash = hash;

var _lodash = require('lodash');

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function hash(data) {
  let hasher = _crypto2.default.createHash('sha256');

  if ((0, _lodash.isString)(data)) {
    data = Buffer.from(data, 'utf8');
  } else if ((0, _lodash.isArray)(data)) {
    data = Buffer.from(data);
  }
  hasher.update(data);

  return hasher.digest();
}