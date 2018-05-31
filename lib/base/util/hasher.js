'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Hasher = undefined;

var _isUndefined = require('lodash/isUndefined');

var _isUndefined2 = _interopRequireDefault(_isUndefined);

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Hasher {
  /**
     * Creates and returns a `xdr.Hash`.
     * @param {array|string} hash - 32 byte hash or hex encoded string
     * @returns {xdr.Hash}
     */
  static hash(hash) {
    let error = new Error('Expects a 32 byte hash value or hex encoded string. Got ' + hash);

    if ((0, _isUndefined2.default)(hash)) {
      throw error;
    }

    if ((0, _isString2.default)(hash)) {
      if (!/^[0-9A-Fa-f]{64}$/g.test(hash)) {
        throw error;
      }
      hash = Buffer.from(hash, 'hex');
    }

    if (!hash.length || hash.length !== 32) {
      throw error;
    }

    return hash;
  }
}
exports.Hasher = Hasher;