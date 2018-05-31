'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PreIssuanceRequestOpBuilder = undefined;

var _xdr_generated = require('../generated/xdr_generated');

var _xdr_generated2 = _interopRequireDefault(_xdr_generated);

var _base_operation = require('./base_operation');

var _pre_issuance_request = require('../pre_issuance_request');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PreIssuanceRequestOpBuilder {
  /**
     * Creates operation to review reviewable request
     * @param {object} opts
     * @param {xdr.PreIssuanceRequest} opts.request - signed pre issuance request
     * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
     * @returns {xdr.ManageAssetOp}
     */
  static createPreIssuanceRequestOp(opts) {
    let attrs = {};
    attrs.request = opts.request;
    attrs.ext = new _xdr_generated2.default.CreatePreIssuanceRequestOpExt(_xdr_generated2.default.LedgerVersion.emptyVersion());

    let preIssuanceRequestOp = new _xdr_generated2.default.CreatePreIssuanceRequestOp(attrs);
    let opAttributes = {};
    opAttributes.body = _xdr_generated2.default.OperationBody.createPreissuanceRequest(preIssuanceRequestOp);
    _base_operation.BaseOperation.setSourceAccount(opAttributes, opts);
    return new _xdr_generated2.default.Operation(opAttributes);
  }

  static preIssuanceRequestOpToObject(result, attrs) {
    result.request = _pre_issuance_request.PreIssuanceRequest.dataFromXdr(attrs.request());
  }
}
exports.PreIssuanceRequestOpBuilder = PreIssuanceRequestOpBuilder;