'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateWithdrawRequestBuilder = undefined;

var _xdr_generated = require('../generated/xdr_generated');

var _xdr_generated2 = _interopRequireDefault(_xdr_generated);

var _isUndefined = require('lodash/isUndefined');

var _isUndefined2 = _interopRequireDefault(_isUndefined);

var _base_operation = require('./base_operation');

var _keypair = require('../keypair');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CreateWithdrawRequestBuilder {
  /**
     * Creates operation to create withdraw request with autoconversion
     * @param {object} opts
     * @param {string} opts.balance - Balance ID from which withdraw will be perfromed
     * @param {string} opts.amount - amount to be withdrawn
     * @param {object} opts.fee - fee to be charged
     * @param {string} opts.fee.fixed - fixed fee to be charged
     * @param {string} opts.fee.percent - percent fee to be charged
     * @param {object} opts.externalDetails - External details needed for PSIM to process withdraw operation
     * @param {string} opts.destAsset - Asset in which specifed amount will be autoconverted
     * @param {string} opts.expectedDestAssetAmount - Expected dest asset amount
     * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
     * @returns {xdr.CreateWithdrawalRequestOp}
     */
  static createWithdrawWithAutoConversion(opts) {
    let attrs = {};

    if (!_keypair.Keypair.isValidBalanceKey(opts.balance)) {
      throw new Error('balance is invalid');
    }

    attrs.balance = _keypair.Keypair.fromBalanceId(opts.balance).xdrBalanceId();

    if (!_base_operation.BaseOperation.isValidAmount(opts.amount, false)) {
      throw new Error('opts.amount is invalid');
    }

    attrs.amount = _base_operation.BaseOperation._toUnsignedXDRAmount(opts.amount);
    attrs.universalAmount = _base_operation.BaseOperation._toUnsignedXDRAmount('0');

    if (!_base_operation.BaseOperation.isFeeValid(opts.fee)) {
      throw new Error('opts.fee is invalid');
    }

    attrs.fee = _base_operation.BaseOperation.feeToXdr(opts.fee);

    if ((0, _isUndefined2.default)(opts.externalDetails)) {
      throw new Error('externalDetails is invalid');
    }

    attrs.externalDetails = JSON.stringify(opts.externalDetails);

    if (!_base_operation.BaseOperation.isValidAsset(opts.destAsset)) {
      throw new Error('opts.destAsset is invalid');
    }

    if (!_base_operation.BaseOperation.isValidAmount(opts.expectedDestAssetAmount, false)) {
      throw new Error('opts.expectedDestAssetAmount is invalid');
    }

    let autoConversionDetails = new _xdr_generated2.default.AutoConversionWithdrawalDetails({
      destAsset: opts.destAsset,
      expectedAmount: _base_operation.BaseOperation._toUnsignedXDRAmount(opts.expectedDestAssetAmount),
      ext: new _xdr_generated2.default.AutoConversionWithdrawalDetailsExt(_xdr_generated2.default.LedgerVersion.emptyVersion())
    });

    attrs.details = new _xdr_generated2.default.WithdrawalRequestDetails.autoConversion(autoConversionDetails);
    attrs.ext = new _xdr_generated2.default.WithdrawalRequestExt(_xdr_generated2.default.LedgerVersion.emptyVersion());

    attrs.preConfirmationDetails = '';
    let request = new _xdr_generated2.default.WithdrawalRequest(attrs);
    let withdrawRequestOp = new _xdr_generated2.default.CreateWithdrawalRequestOp({
      request: request,
      ext: new _xdr_generated2.default.CreateWithdrawalRequestOpExt(_xdr_generated2.default.LedgerVersion.emptyVersion())
    });
    let opAttributes = {};
    opAttributes.body = _xdr_generated2.default.OperationBody.createWithdrawalRequest(withdrawRequestOp);
    _base_operation.BaseOperation.setSourceAccount(opAttributes, opts);
    return new _xdr_generated2.default.Operation(opAttributes);
  }

  static createWithdrawalRequestOpToObject(result, attrs) {
    let request = attrs.request();
    result.balance = _base_operation.BaseOperation.balanceIdtoString(request.balance());
    result.amount = _base_operation.BaseOperation._fromXDRAmount(request.amount());
    result.fee = {
      fixed: _base_operation.BaseOperation._fromXDRAmount(request.fee().fixed()),
      percent: _base_operation.BaseOperation._fromXDRAmount(request.fee().percent())
    };
    result.externalDetails = JSON.parse(request.externalDetails());
    result.details = {
      type: request.details().switch(),
      autoConversion: {
        destAsset: request.details().autoConversion().destAsset(),
        expectedAmount: _base_operation.BaseOperation._fromXDRAmount(request.details().autoConversion().expectedAmount())
      }
    };
  }
}
exports.CreateWithdrawRequestBuilder = CreateWithdrawRequestBuilder;