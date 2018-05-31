'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseOperation = undefined;

var _xdr_generated = require('../generated/xdr_generated');

var _xdr_generated2 = _interopRequireDefault(_xdr_generated);

var _keypair = require('../keypair');

var _jsXdr = require('js-xdr');

var _strkey = require('../strkey');

var _bignumber = require('bignumber.js');

var _bignumber2 = _interopRequireDefault(_bignumber);

var _continued_fraction = require('../util/continued_fraction');

var _isUndefined = require('lodash/isUndefined');

var _isUndefined2 = _interopRequireDefault(_isUndefined);

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

var _isNumber = require('lodash/isNumber');

var _isNumber2 = _interopRequireDefault(_isNumber);

var _isFinite = require('lodash/isFinite');

var _isFinite2 = _interopRequireDefault(_isFinite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ONE = 1000000;
const DECIMAL_PLACES = 6;
const MAX_INT64 = '9223372036854775807';
const MAX_INT64_AMOUNT = '9223372036854.775807';

class BaseOperation {
  static get MAX_INT64() {
    return MAX_INT64;
  }

  static get ONE() {
    return ONE;
  }

  static get MAX_INT64_AMOUNT() {
    return MAX_INT64_AMOUNT;
  }

  static isPayment(op) {
    if (!(op instanceof _xdr_generated2.default.Operation)) {
      throw new Error('should be used for operations');
    }
    return op.body().switch().name === 'payment';
  }

  static isValidAsset(value) {
    return BaseOperation.isValidString(value, 1, 16);
  }

  static isValidString(value, minSize, maxSize) {
    if (!(0, _isString2.default)(value)) {
      return false;
    }

    if (!(0, _isUndefined2.default)(minSize) && value.length < minSize) {
      return false;
    }

    if (!(0, _isUndefined2.default)(maxSize) && value.length > maxSize) {
      return false;
    }

    return true;
  }

  static isValidSubject(value) {
    return BaseOperation.isValidString(value, 0, 256);
  }

  static isValidArray(value, minSize) {
    return Array.isArray(value) && value.length >= minSize;
  }

  static isValidArrayOfClass(value, minSize, cls) {
    if (!BaseOperation.isValidArray(value, minSize)) {
      return false;
    }
    for (let i = 0; i < value.length; i++) {
      if (!(value[i] instanceof cls)) {
        return false;
      }
    }
    return true;
  }

  static isValidPeriod(value, allowZero = false) {
    if (!(0, _isString2.default)(value)) {
      return false;
    }

    let period;
    try {
      period = new _bignumber2.default(value);
    } catch (e) {
      return false;
    }

    // == 0
    if (!allowZero && period.isZero()) {
      return false;
    }

    // < 0
    if (period.isNegative()) {
      return false;
    }

    if (period.decimalPlaces() > 0) {
      return false;
    }

    // Infinity
    if (!period.isFinite()) {
      return false;
    }

    // NaN
    if (period.isNaN()) {
      return false;
    }

    return true;
  }

  static isValidAmount(value, allowZero = false, max = undefined, min = undefined) {
    if (!(0, _isString2.default)(value)) {
      return false;
    }

    let amount;
    try {
      amount = new _bignumber2.default(value);
    } catch (e) {
      return false;
    }

    // == 0
    if (!allowZero && amount.isZero()) {
      return false;
    }

    // < 0
    if (amount.isNegative()) {
      return false;
    }

    // > Max value
    if (amount.times(ONE).greaterThan(new _bignumber2.default(MAX_INT64).toString())) {
      return false;
    }

    if (max && amount.greaterThan(new _bignumber2.default(max).toString())) {
      return false;
    }

    if (min && new _bignumber2.default(min).greaterThan(amount.toString())) {
      return false;
    }

    // Decimal places
    if (amount.decimalPlaces() > DECIMAL_PLACES) {
      return false;
    }

    // Infinity
    if (!amount.isFinite()) {
      return false;
    }

    // NaN
    if (amount.isNaN()) {
      return false;
    }

    return true;
  }

  /**
     * Returns value converted to uint32 value or undefined.
     * If `value` is not `Number`, `String` or `Undefined` then throws an error.
     * Used in {@link Operation.setOptions}.
     * @private
     * @param {string} name Name of the property (used in error message only)
     * @param {*} value Value to check
     * @param {function(value, name)} isValidFunction Function to check other constraints (the argument will be a `Number`)
     * @returns {undefined|Number}
     * @private
     */
  static _checkUnsignedIntValue(name, value, isValidFunction = null) {
    if ((0, _isUndefined2.default)(value)) {
      return undefined;
    }

    if ((0, _isString2.default)(value)) {
      value = parseFloat(value);
    }

    if (!(0, _isNumber2.default)(value) || !(0, _isFinite2.default)(value) || value % 1 !== 0) {
      throw new Error(`${name} value is invalid`);
    }

    if (value < 0) {
      throw new Error(`${name} value must be unsigned`);
    }

    if (!isValidFunction || isValidFunction && isValidFunction(value, name)) {
      return value;
    }

    throw new Error(`${name} value is invalid`);
  }

  static calcPercentFee(amountValue, percentValue) {
    let amount = new _bignumber2.default(amountValue);
    let rate = new _bignumber2.default(percentValue).div(100);
    return amount.times(rate).toString();
  }

  /**
     * @private
     */
  static _toXDRAmount(value) {
    let amount = new _bignumber2.default(value).mul(ONE);
    return _jsXdr.Hyper.fromString(amount.toString());
  }

  /**
     * @private
     */
  static _toUnsignedXDRAmount(value) {
    let amount = new _bignumber2.default(value).mul(ONE);
    return _jsXdr.UnsignedHyper.fromString(amount.toString());
  }

  /**
     * @private
     */
  static _fromXDRAmount(value) {
    return new _bignumber2.default(value).div(ONE).toString();
  }

  /**
     * @private
     */
  static _fromXDRPrice(price) {
    let n = new _bignumber2.default(price.n());
    return n.div(new _bignumber2.default(price.d())).toString();
  }

  /**
     * @private
     */
  static _toXDRPrice(price) {
    let xdrObject;
    if (price.n && price.d) {
      xdrObject = new _xdr_generated2.default.Price(price);
    } else {
      price = new _bignumber2.default(price);
      let approx = (0, _continued_fraction.bestR)(price);
      xdrObject = new _xdr_generated2.default.Price({
        n: parseInt(approx[0]),
        d: parseInt(approx[1])
      });
    }

    if (xdrObject.n() < 0 || xdrObject.d() < 0) {
      throw new Error('price must be positive');
    }

    return xdrObject;
  }

  static _accountTypeFromNumber(rawAccountType) {
    if (!BaseOperation._isValidAccountType(rawAccountType)) {
      throw new Error(`XDR Read Error: Unknown AccountType member for value ${rawAccountType}`);
    }

    return _xdr_generated2.default.AccountType._byValue.get(rawAccountType);
  }

  static isFeeValid(fee) {
    return BaseOperation.isValidAmount(fee.fixed, true) && BaseOperation.isValidAmount(fee.percent, true);
  }

  static feeToXdr(fee) {
    let attrs = {
      fixed: BaseOperation._toUnsignedXDRAmount(fee.fixed),
      percent: BaseOperation._toUnsignedXDRAmount(fee.percent),
      ext: new _xdr_generated2.default.FeeExt(_xdr_generated2.default.LedgerVersion.emptyVersion())
    };

    return new _xdr_generated2.default.Fee(attrs);
  }

  static _requestTypeFromNumber(rawRequestType) {
    if (!BaseOperation._isValidRequestType(rawRequestType)) {
      throw new Error(`XDR Read Error: Unknown RequestType member for value ${rawRequestType}`);
    }

    return _xdr_generated2.default.RequestType._byValue.get(rawRequestType);
  }

  static _isValidAccountType(rawAccountType) {
    return _xdr_generated2.default.AccountType._byValue.has(rawAccountType);
  }

  static _isValidRequestType(rawRequestType) {
    return _xdr_generated2.default.RequestType._byValue.has(rawRequestType);
  }

  static accountIdtoAddress(accountId) {
    return (0, _strkey.encodeCheck)('accountId', accountId.ed25519());
  }

  static balanceIdtoString(balanceId) {
    return (0, _strkey.encodeCheck)('balanceId', balanceId.ed25519());
  }

  /**
     * This operation set SourceAccount
     * @param {object} [opts]
     * @returns undefined
     */
  static setSourceAccount(opAttributes, opts) {
    if (opts.source) {
      if (!_keypair.Keypair.isValidPublicKey(opts.source)) {
        throw new Error('Source address is invalid');
      }
      opAttributes.sourceAccount = _keypair.Keypair.fromAccountId(opts.source).xdrAccountId();
    }
  }
}
exports.BaseOperation = BaseOperation;