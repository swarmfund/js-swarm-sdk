'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUpdateKYCRequestBuilder = undefined;

var _xdr_generated = require('../generated/xdr_generated');

var _xdr_generated2 = _interopRequireDefault(_xdr_generated);

var _isUndefined = require('lodash/isUndefined');

var _isUndefined2 = _interopRequireDefault(_isUndefined);

var _base_operation = require('./base_operation');

var _keypair = require('../keypair');

var _jsXdr = require('js-xdr');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CreateUpdateKYCRequestBuilder {
  /**
     * Creates operation to create KYC request
     * @param {object} opts
     * @param {number|string} opts.requestID - set to zero to create new request
     * @param {string} opts.accountToUpdateKYC
     * @param {string} opts.accountTypeToSet
     * @param {number} opts.kycLevelToSet
     * @param {object} opts.kycData
     * @param {number|string} opts.allTasks
     * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
     * @returns {xdr.CreateUpdateKycRequestOp}
     */
  static createUpdateKYCRequest(opts) {
    let attrs = {};

    if ((0, _isUndefined2.default)(opts.requestID)) {
      throw new Error('opts.requestID is invalid');
    }

    if (!_keypair.Keypair.isValidPublicKey(opts.accountToUpdateKYC)) {
      throw new Error('opts.accountToUpdateKYC is invalid');
    }

    attrs.accountToUpdateKyc = _keypair.Keypair.fromAccountId(opts.accountToUpdateKYC).xdrAccountId();
    attrs.accountTypeToSet = _base_operation.BaseOperation._accountTypeFromNumber(opts.accountTypeToSet);
    attrs.kycLevelToSet = opts.kycLevelToSet;
    attrs.kycData = JSON.stringify(opts.kycData);
    attrs.allTasks = _base_operation.BaseOperation._checkUnsignedIntValue('allTasks', opts.allTasks);
    attrs.ext = new _xdr_generated2.default.UpdateKycRequestDataExt(_xdr_generated2.default.LedgerVersion.emptyVersion());

    let updateKYCRequestData = new _xdr_generated2.default.UpdateKycRequestData(attrs);

    let kycRequestOp = new _xdr_generated2.default.CreateUpdateKycRequestOp({
      requestId: _jsXdr.UnsignedHyper.fromString(opts.requestID),
      updateKycRequestData: updateKYCRequestData,
      ext: new _xdr_generated2.default.CreateUpdateKycRequestOpExt(_xdr_generated2.default.LedgerVersion.emptyVersion())
    });
    let opAttributes = {};
    opAttributes.body = _xdr_generated2.default.OperationBody.createKycRequest(kycRequestOp);
    _base_operation.BaseOperation.setSourceAccount(opAttributes, opts);
    return new _xdr_generated2.default.Operation(opAttributes);
  }

  static createUpdateKYCRequestOpToObject(result, attrs) {
    result.requestID = attrs.requestId;
    result.accountToUpdateKYC = _base_operation.BaseOperation.accountIdtoAddress(attrs.updateKycRequestData().accountToUpdateKyc());
    result.accountTypeToSet = attrs.updateKycRequestData().accountTypeToSet().value;
    result.kycLevelToSet = attrs.updateKycRequestData().kycLevelToSet();
    result.kycData = JSON.parse(attrs.updateKycRequestData().kycData());
    result.allTasks = attrs.updateKycRequestData().allTasks();
  }
}
exports.CreateUpdateKYCRequestBuilder = CreateUpdateKYCRequestBuilder;