'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateIssuanceRequestBuilder = undefined;

var _xdr_generated = require('../generated/xdr_generated');

var _xdr_generated2 = _interopRequireDefault(_xdr_generated);

var _isUndefined = require('lodash/isUndefined');

var _isUndefined2 = _interopRequireDefault(_isUndefined);

var _base_operation = require('./base_operation');

var _keypair = require('../keypair');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CreateIssuanceRequestBuilder {
  /**
     * Creates operation to create issuance request
     * @param {object} opts
     * @param {string} opts.asset - asset to be issued
     * @param {string} opts.amount - amount to be issued
     * @param {string} opts.receiver - balance ID of the receiver
     * @param {string} opts.reference - Reference of the request
     * @param {object} opts.externalDetails - External details needed for PSIM to process withdraw operation
     * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
     * @returns {xdr.CreateIssuanceRequestOp}
     */
  static createIssuanceRequest(opts) {
    let attrs = {};
    if (!_base_operation.BaseOperation.isValidAsset(opts.asset)) {
      throw new Error('opts.asset is invalid');
    }

    attrs.asset = opts.asset;

    if (!_base_operation.BaseOperation.isValidAmount(opts.amount)) {
      throw new Error('opts.amount is invalid');
    }

    attrs.amount = _base_operation.BaseOperation._toUnsignedXDRAmount(opts.amount);

    if (!_keypair.Keypair.isValidBalanceKey(opts.receiver)) {
      throw new Error('receiver is invalid');
    }

    attrs.receiver = _keypair.Keypair.fromBalanceId(opts.receiver).xdrBalanceId();

    if (!_base_operation.BaseOperation.isValidString(opts.reference, 1, 64)) {
      throw new Error('opts.reference is invalid');
    }

    if ((0, _isUndefined2.default)(opts.externalDetails)) {
      throw new Error('externalDetails is invalid');
    }

    attrs.externalDetails = JSON.stringify(opts.externalDetails);

    let fee = {
      fixed: '0',
      percent: '0'
    };
    attrs.fee = _base_operation.BaseOperation.feeToXdr(fee);

    attrs.ext = new _xdr_generated2.default.IssuanceRequestExt(_xdr_generated2.default.LedgerVersion.emptyVersion());
    let request = new _xdr_generated2.default.IssuanceRequest(attrs);
    let issuanceRequestOp = new _xdr_generated2.default.CreateIssuanceRequestOp({
      request: request,
      reference: opts.reference,
      externalDetails: request.externalDetails(),
      ext: new _xdr_generated2.default.CreateIssuanceRequestOpExt(_xdr_generated2.default.LedgerVersion.emptyVersion())
    });
    let opAttributes = {};
    opAttributes.body = _xdr_generated2.default.OperationBody.createIssuanceRequest(issuanceRequestOp);
    _base_operation.BaseOperation.setSourceAccount(opAttributes, opts);
    return new _xdr_generated2.default.Operation(opAttributes);
  }

  static createIssuanceRequestOpToObject(result, attrs) {
    result.reference = attrs.reference();
    let request = attrs.request();
    result.asset = request.asset();
    result.amount = _base_operation.BaseOperation._fromXDRAmount(request.amount());
    result.receiver = _base_operation.BaseOperation.balanceIdtoString(request.receiver());
    result.externalDetails = JSON.parse(request.externalDetails());
  }
}
exports.CreateIssuanceRequestBuilder = CreateIssuanceRequestBuilder;