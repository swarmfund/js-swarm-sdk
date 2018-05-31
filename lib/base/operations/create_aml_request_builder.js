'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateAMLRequestBuilder = undefined;

var _xdr_generated = require('../generated/xdr_generated');

var _xdr_generated2 = _interopRequireDefault(_xdr_generated);

var _isUndefined = require('lodash/isUndefined');

var _isUndefined2 = _interopRequireDefault(_isUndefined);

var _base_operation = require('./base_operation');

var _keypair = require('../keypair');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CreateAMLRequestBuilder {
  /**
     * Creates operation to create aml alert
     * @param {object} opts
     *
     * @param {string} opts.balanceID - balance for which specified amount will be locked
     * @param {string} opts.amount - amount to be locked
     * @param {string} opts.reason - reason due to which alert was raised
     * @param {string} opts.reference - Unique reference of the alert
     * @param {string} [opts.source] - The source account for the operation. Defaults to the transaction's source account.
     *
     * @returns {xdr.CreateAMLAlertRequestOp}
     */
  static createAMLAlert(opts) {
    let rawRequest = {};
    if (!_base_operation.BaseOperation.isValidAmount(opts.amount)) {
      throw new Error('opts.amount is invalid');
    }

    rawRequest.amount = _base_operation.BaseOperation._toUnsignedXDRAmount(opts.amount);

    if (!_keypair.Keypair.isValidBalanceKey(opts.balanceID)) {
      throw new Error('opts.balanceID is invalid');
    }

    rawRequest.balanceId = _keypair.Keypair.fromBalanceId(opts.balanceID).xdrBalanceId();
    rawRequest.reason = opts.reason;
    rawRequest.ext = new _xdr_generated2.default.AmlAlertRequestExt(_xdr_generated2.default.LedgerVersion.emptyVersion());
    let request = new _xdr_generated2.default.AmlAlertRequest(rawRequest);

    if ((0, _isUndefined2.default)(opts.reference)) {
      throw new Error('opts.reference is invalid');
    }

    let opAttributes = {};
    opAttributes.body = new _xdr_generated2.default.OperationBody.createAmlAlert(new _xdr_generated2.default.CreateAmlAlertRequestOp({
      amlAlertRequest: request,
      reference: opts.reference,
      ext: new _xdr_generated2.default.CreateAmlAlertRequestOpExt(_xdr_generated2.default.LedgerVersion.emptyVersion())
    }));
    _base_operation.BaseOperation.setSourceAccount(opAttributes, opts);
    return new _xdr_generated2.default.Operation(opAttributes);
  }

  static createAmlAlertToObject(result, attrs) {
    result.balanceID = _base_operation.BaseOperation.balanceIdtoString(attrs.amlAlertRequest().balanceId());
    result.amount = _base_operation.BaseOperation._fromXDRAmount(attrs.amlAlertRequest().amount());
    result.reason = attrs.amlAlertRequest().reason().toString();
    result.reference = attrs.reference().toString();
  }
}
exports.CreateAMLRequestBuilder = CreateAMLRequestBuilder;