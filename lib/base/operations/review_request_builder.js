'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReviewRequestBuilder = undefined;

var _xdr_generated = require('../generated/xdr_generated');

var _xdr_generated2 = _interopRequireDefault(_xdr_generated);

var _isUndefined = require('lodash/isUndefined');

var _isUndefined2 = _interopRequireDefault(_isUndefined);

var _base_operation = require('./base_operation');

var _jsXdr = require('js-xdr');

var _hasher = require('../util/hasher');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ReviewRequestBuilder {
  /**
     * Creates operation to review reviewable request
     * @param {object} opts
     * @param {string} opts.requestID - request ID
     * @param {string} opts.requestHash - Hash of the request to be reviewed
     * @param {number} opts.requestType - Type of the request to be reviewed (xdr.ReviewableRequestType)
     * @param {number} opts.action - action to be performed over request (xdr.ReviewRequestOpAction)
     * @param {string} opts.reason - Reject reason
     * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
     * @returns {xdr.ReviewRequestOp}
     */
  static reviewRequest(opts) {
    let attrs = ReviewRequestBuilder._prepareAttrs(opts);

    let validRequestType = !(0, _isUndefined2.default)(opts.requestType) && _xdr_generated2.default.ReviewableRequestType._byValue.has(opts.requestType);
    if (!validRequestType) {
      throw new Error('opts.requestType is invalid');
    }

    let requestType = _xdr_generated2.default.ReviewableRequestType._byValue.get(opts.requestType);
    attrs.requestDetails = new _xdr_generated2.default.ReviewRequestOpRequestDetails(requestType);

    return ReviewRequestBuilder._createOp(opts, attrs);
  }

  static _createOp(opts, attrs) {
    let reviewRequestOp = new _xdr_generated2.default.ReviewRequestOp(attrs);
    let opAttributes = {};
    opAttributes.body = _xdr_generated2.default.OperationBody.reviewRequest(reviewRequestOp);
    _base_operation.BaseOperation.setSourceAccount(opAttributes, opts);
    return new _xdr_generated2.default.Operation(opAttributes);
  }

  static _prepareAttrs(opts) {
    let attrs = {};
    if ((0, _isUndefined2.default)(opts.requestID) || opts.requestID === '0') {
      throw new Error('opts.requestID is invalid');
    }

    attrs.requestId = _jsXdr.UnsignedHyper.fromString(opts.requestID);
    attrs.requestHash = _hasher.Hasher.hash(opts.requestHash);

    let validAction = opts.action && _xdr_generated2.default.ReviewRequestOpAction._byValue.has(opts.action);
    if (!validAction) {
      throw new Error('opts.action is invalid');
    }

    attrs.action = _xdr_generated2.default.ReviewRequestOpAction._byValue.get(opts.action);

    if (!_base_operation.BaseOperation.isValidString(opts.reason, 0, 256)) {
      throw new Error('opts.reason is invalid');
    }

    attrs.reason = opts.reason;
    attrs.ext = new _xdr_generated2.default.ReviewRequestOpExt(_xdr_generated2.default.LedgerVersion.emptyVersion());

    return attrs;
  }

  /**
     * Creates operation to review withdraw request
     * @param {object} opts
     * @param {string} opts.requestID - request ID
     * @param {string} opts.requestHash - Hash of the request to be reviewed
     * @param {number} opts.action - action to be performed over request (xdr.ReviewRequestOpAction)
     * @param {string} opts.reason - Reject reason
     * @param {string} opts.externalDetails - External System details
     * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
     * @returns {xdr.ReviewRequestOp}
     */
  static reviewWithdrawRequest(opts) {
    if ((0, _isUndefined2.default)(opts.externalDetails)) {
      throw new Error('opts.externalDetails is invalid');
    }

    let attrs = ReviewRequestBuilder._prepareAttrs(opts);

    attrs.requestDetails = new _xdr_generated2.default.ReviewRequestOpRequestDetails.withdraw(new _xdr_generated2.default.WithdrawalDetails({
      ext: new _xdr_generated2.default.WithdrawalDetailsExt(_xdr_generated2.default.LedgerVersion.emptyVersion()),
      externalDetails: JSON.stringify(opts.externalDetails)
    }));

    return ReviewRequestBuilder._createOp(opts, attrs);
  }

  /**
     * Creates operation to review aml alert request
     * @param {object} opts
     * @param {string} opts.requestID - request ID
     * @param {string} opts.requestHash - Hash of the request to be reviewed
     * @param {number} opts.action - action to be performed over request (xdr.ReviewRequestOpAction)
     * @param {string} opts.reason - Reject reason
     * @param {string} opts.comment - Comment to review
     * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
     * @returns {xdr.ReviewRequestOp}
     */
  static reviewAmlAlertRequest(opts) {
    if ((0, _isUndefined2.default)(opts.comment)) {
      throw new Error('opts.comment is invalid');
    }

    let attrs = ReviewRequestBuilder._prepareAttrs(opts);

    attrs.requestDetails = new _xdr_generated2.default.ReviewRequestOpRequestDetails.amlAlert(new _xdr_generated2.default.AmlAlertDetails({
      ext: new _xdr_generated2.default.AmlAlertDetailsExt(_xdr_generated2.default.LedgerVersion.emptyVersion()),
      comment: opts.comment
    }));

    return ReviewRequestBuilder._createOp(opts, attrs);
  }

  /**
     * Creates operation to review two step withdraw request
     * @param {object} opts
     * @param {string} opts.requestID - request ID
     * @param {string} opts.requestHash - Hash of the request to be reviewed
     * @param {number} opts.action - action to be performed over request (xdr.ReviewRequestOpAction)
     * @param {string} opts.reason - Reject reason
     * @param {string} opts.externalDetails - External System details
     * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
     * @returns {xdr.ReviewRequestOp}
     */
  static reviewTwoStepWithdrawRequest(opts) {
    if ((0, _isUndefined2.default)(opts.externalDetails)) {
      throw new Error('opts.externalDetails is invalid');
    }

    let attrs = ReviewRequestBuilder._prepareAttrs(opts);

    attrs.requestDetails = new _xdr_generated2.default.ReviewRequestOpRequestDetails.twoStepWithdrawal(new _xdr_generated2.default.WithdrawalDetails({
      ext: new _xdr_generated2.default.WithdrawalDetailsExt(_xdr_generated2.default.LedgerVersion.emptyVersion()),
      externalDetails: JSON.stringify(opts.externalDetails)
    }));

    return ReviewRequestBuilder._createOp(opts, attrs);
  }

  static reviewLimitsUpdateRequest(opts) {
    if ((0, _isUndefined2.default)(opts.newLimits)) {
      throw new Error('opts.newLimits is invalid');
    }

    let attrs = ReviewRequestBuilder._prepareAttrs(opts);

    attrs.requestDetails = new _xdr_generated2.default.ReviewRequestOpRequestDetails.limitsUpdate(new _xdr_generated2.default.LimitsUpdateDetails({
      newLimits: new _xdr_generated2.default.Limits({
        dailyOut: _base_operation.BaseOperation._toXDRAmount(opts.newLimits.dailyOut),
        weeklyOut: _base_operation.BaseOperation._toXDRAmount(opts.newLimits.weeklyOut),
        monthlyOut: _base_operation.BaseOperation._toXDRAmount(opts.newLimits.monthlyOut),
        annualOut: _base_operation.BaseOperation._toXDRAmount(opts.newLimits.annualOut),
        ext: new _xdr_generated2.default.LimitsExt(_xdr_generated2.default.LedgerVersion.emptyVersion())
      }),
      ext: new _xdr_generated2.default.LimitsUpdateDetailsExt(_xdr_generated2.default.LedgerVersion.emptyVersion())
    }));

    return ReviewRequestBuilder._createOp(opts, attrs);
  }

  static reviewUpdateKYCRequest(opts) {
    let attrs = ReviewRequestBuilder._prepareAttrs(opts);

    attrs.requestDetails = new _xdr_generated2.default.ReviewRequestOpRequestDetails.updateKyc(new _xdr_generated2.default.UpdateKycDetails({
      tasksToAdd: opts.tasksToAdd,
      tasksToRemove: opts.tasksToRemove,
      externalDetails: JSON.stringify(opts.externalDetails),
      ext: new _xdr_generated2.default.UpdateKycDetailsExt(_xdr_generated2.default.LedgerVersion.emptyVersion())
    }));

    return ReviewRequestBuilder._createOp(opts, attrs);
  }

  static reviewRequestToObject(result, attrs) {
    result.requestID = attrs.requestId().toString();
    result.requestHash = attrs.requestHash().toString('hex');
    result.requestType = attrs.requestDetails().switch().value;
    switch (attrs.requestDetails().switch()) {
      case _xdr_generated2.default.ReviewableRequestType.withdraw():
        {
          result.withdrawal = {
            externalDetails: attrs.requestDetails().withdrawal().externalDetails()
          };
          break;
        }
      case _xdr_generated2.default.ReviewableRequestType.limitsUpdate():
        {
          result.limitsUpdate = {
            newLimits: {
              dailyOut: _base_operation.BaseOperation._fromXDRAmount(attrs.requestDetails().limitsUpdate().newLimits().dailyOut()),
              weeklyOut: _base_operation.BaseOperation._fromXDRAmount(attrs.requestDetails().limitsUpdate().newLimits().weeklyOut()),
              monthlyOut: _base_operation.BaseOperation._fromXDRAmount(attrs.requestDetails().limitsUpdate().newLimits().monthlyOut()),
              annualOut: _base_operation.BaseOperation._fromXDRAmount(attrs.requestDetails().limitsUpdate().newLimits().annualOut())
            }
          };
          break;
        }
      case _xdr_generated2.default.ReviewableRequestType.twoStepWithdrawal():
        {
          result.twoStepWithdrawal = {
            externalDetails: attrs.requestDetails().twoStepWithdrawal().externalDetails()
          };
          break;
        }
      case _xdr_generated2.default.ReviewableRequestType.updateKyc():
        {
          result.updateKyc = {
            tasksToAdd: attrs.requestDetails().updateKyc().tasksToAdd(),
            tasksToRemove: attrs.requestDetails().updateKyc().tasksToRemove(),
            externalDetails: attrs.requestDetails().updateKyc().externalDetails()
          };
          break;
        }
      case _xdr_generated2.default.ReviewableRequestType.amlAlert():
        {
          result.amlAlert = {
            comment: attrs.requestDetails().amlAlertDetails().comment()
          };
          break;
        }
    }
    result.action = attrs.action().value;
    result.reason = attrs.reason();
  }
}
exports.ReviewRequestBuilder = ReviewRequestBuilder;