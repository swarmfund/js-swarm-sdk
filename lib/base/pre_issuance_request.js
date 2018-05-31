'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PreIssuanceRequest = undefined;

var _base_operation = require('./operations/base_operation');

var _xdr_generated = require('./generated/xdr_generated');

var _xdr_generated2 = _interopRequireDefault(_xdr_generated);

var _hashing = require('./hashing');

var _isUndefined = require('lodash/isUndefined');

var _isUndefined2 = _interopRequireDefault(_isUndefined);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PreIssuanceRequest {
  /**
     * Creates pre issuance request
     * @param {object} opts
     * @param {string} opts.amount - amount to be preissued
     * @param {string} opts.reference - reference of the request
     * @param {string} opts.asset - asset to be pre issued
     * @param {KeyPair} opts.keyPair - signer of the pre issued asset request
     * @returns {xdr.PreIssuanceRequest}
     */
  static build(opts) {
    if (!_base_operation.BaseOperation.isValidAmount(opts.amount, false)) {
      throw new TypeError('amount must be of type String and represent a positive number');
    }
    if (!_base_operation.BaseOperation.isValidString(opts.reference, 4, 64)) {
      throw new TypeError('reference must be 4-64 string');
    }

    if (!_base_operation.BaseOperation.isValidAsset(opts.asset)) {
      throw new TypeError('asset is invalid');
    }

    if ((0, _isUndefined2.default)(opts.keyPair)) {
      throw new TypeError('opts.keyPair is invalid');
    }

    opts.amount = _base_operation.BaseOperation._toUnsignedXDRAmount(opts.amount);
    let signature = opts.keyPair.signDecorated(this._getSignatureData(opts));
    return new _xdr_generated2.default.PreIssuanceRequest({
      reference: opts.reference,
      amount: opts.amount,
      asset: opts.asset,
      signature: signature,
      ext: new _xdr_generated2.default.PreIssuanceRequestExt(_xdr_generated2.default.LedgerVersion.emptyVersion())
    });
  }

  static xdrFromData(data) {
    return new _xdr_generated2.default.PreIssuanceRequest({
      reference: data.reference,
      amount: _base_operation.BaseOperation._toUnsignedXDRAmount(data.amount),
      asset: data.asset,
      signature: data.signature
    });
  }

  static dataFromXdr(xdr) {
    let attributes = {};
    attributes.amount = _base_operation.BaseOperation._fromXDRAmount(xdr.amount());
    attributes.reference = xdr.reference();
    attributes.asset = xdr.asset();
    attributes.signature = xdr.signature();
    return attributes;
  }

  static isXdrPreIssuanceRequestSigned(attributes, keyPair) {
    let signature = attributes.signature();
    let signatureData = this._getSignatureData({
      reference: attributes.reference(),
      asset: attributes.asset(),
      amount: attributes.amount()
    });
    return keyPair.verify(signatureData, signature.signature());
  }

  static _getSignatureData(opts) {
    if ((0, _isUndefined2.default)(opts.reference)) {
      throw new Error('opts.reference is invalid');
    }

    if ((0, _isUndefined2.default)(opts.asset)) {
      throw new Error('opts.asset is invalid');
    }

    let rawSignatureData = `${opts.reference}:${opts.amount.toString()}:${opts.asset}`;
    return (0, _hashing.hash)(rawSignatureData);
  }
}
exports.PreIssuanceRequest = PreIssuanceRequest;