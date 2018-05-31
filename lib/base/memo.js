'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Memo = undefined;

var _xdr_generated = require('./generated/xdr_generated');

var _xdr_generated2 = _interopRequireDefault(_xdr_generated);

var _isUndefined = require('lodash/isUndefined');

var _isUndefined2 = _interopRequireDefault(_isUndefined);

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

var _jsXdr = require('js-xdr');

var _bignumber = require('bignumber.js');

var _bignumber2 = _interopRequireDefault(_bignumber);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * `Memo` represents memos attached to transactions. Use static methods to create memos.
 *
 * @see [Transactions concept](https://www.stellar.org/developers/learn/concepts/transactions.html)
 * @class Memo
 */
class Memo {
  /**
     * Returns an empty memo (`MEMO_NONE`).
     * @returns {xdr.Memo}
     */
  static none() {
    return _xdr_generated2.default.Memo.memoNone();
  }

  /**
     * Creates and returns a `MEMO_TEXT` memo.
     * @param {string} text - memo text
     * @returns {xdr.Memo}
     */
  static text(text) {
    if (!(0, _isString2.default)(text)) {
      throw new Error('Expects string type got a ' + typeof text);
    }
    if (Buffer.byteLength(text, 'utf8') > 28) {
      throw new Error('Text should be <= 28 bytes. Got ' + Buffer.byteLength(text, 'utf8'));
    }
    return _xdr_generated2.default.Memo.memoText(text);
  }

  /**
     * Creates and returns a `MEMO_ID` memo.
     * @param {string} id - 64-bit number represented as a string
     * @returns {xdr.Memo}
     */
  static id(id) {
    let error = new Error('Expects a int64 as a string. Got ' + id);

    if (!(0, _isString2.default)(id)) {
      throw error;
    }

    let number;
    try {
      number = new _bignumber2.default(id);
    } catch (e) {
      throw error;
    }

    // Infinity
    if (!number.isFinite()) {
      throw error;
    }

    // NaN
    if (number.isNaN()) {
      throw error;
    }

    return _xdr_generated2.default.Memo.memoId(_jsXdr.UnsignedHyper.fromString(id));
  }

  /**
     * Creates and returns a `MEMO_HASH` memo.
     * @param {array|string} hash - 32 byte hash or hex encoded string
     * @returns {xdr.Memo}
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

    return _xdr_generated2.default.Memo.memoHash(hash);
  }

  /**
     * Creates and returns a `MEMO_RETURN` memo.
     * @param {array|string} hash - 32 byte hash or hex encoded string
     * @returns {xdr.Memo}
     */
  static returnHash(hash) {
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

    return _xdr_generated2.default.Memo.memoReturn(hash);
  }
}
exports.Memo = Memo;