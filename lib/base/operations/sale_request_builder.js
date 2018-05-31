'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SaleRequestBuilder = undefined;

var _xdr_generated = require('../generated/xdr_generated');

var _xdr_generated2 = _interopRequireDefault(_xdr_generated);

var _isUndefined = require('lodash/isUndefined');

var _isUndefined2 = _interopRequireDefault(_isUndefined);

var _base_operation = require('./base_operation');

var _jsXdr = require('js-xdr');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SaleRequestBuilder {
  /**
     * Creates operation to create withdraw request with autoconversion
     * @param {object} opts
     * @param {string} opts.requestID - ID of the request. 0 - to create new;
     * @param {string} opts.baseAsset - asset for which sale will be performed
     * @param {string} opts.defaultQuoteAsset - asset in which hardcap/soft cap will be calculated
     * @param {string} opts.startTime - start time of the sale
     * @param {string} opts.endTime - close time of the sale
     * @param {string} opts.softCap - minimum amount of quote asset to be received at which sale will be considered a successful
     * @param {string} opts.hardCap - max amount of quote asset to be received
     * @param {object} opts.details - sale specific details
     * @param {object} opts.details.name - name of the sale
     * @param {object} opts.details.short_description - short description of the sale
     * @param {object} opts.details.desciption - sale specific details
     * @param {object} opts.details.logo - details of the logo
     * @param {array} opts.quoteAssets - accepted assets
     * @param {object} opts.quoteAssets.price - price for 1 baseAsset in terms of quote asset
     * @param {object} opts.quoteAssets.asset - asset code of the quote asset
     * @param {object} opts.isCrowdfunding - states if sale type is crowd funding
     * @param {string} [opts.source] - The source account for the operation. Defaults to the transaction's source account.
     * @returns {xdr.CreateSaleCreationRequestOp}
     */
  static createSaleCreationRequest(opts) {
    let attrs = {};

    if (!_base_operation.BaseOperation.isValidAsset(opts.baseAsset)) {
      throw new Error('opts.baseAsset is invalid');
    }
    attrs.baseAsset = opts.baseAsset;

    if (!_base_operation.BaseOperation.isValidAsset(opts.defaultQuoteAsset)) {
      throw new Error('opts.defaultQuoteAsset is invalid');
    }
    attrs.defaultQuoteAsset = opts.defaultQuoteAsset;

    if ((0, _isUndefined2.default)(opts.startTime)) {
      throw new Error('opts.startTime is invalid');
    }
    attrs.startTime = _jsXdr.UnsignedHyper.fromString(opts.startTime);

    if ((0, _isUndefined2.default)(opts.endTime)) {
      throw new Error('opts.endTime is invalid');
    }
    attrs.endTime = _jsXdr.UnsignedHyper.fromString(opts.endTime);

    if (!_base_operation.BaseOperation.isValidAmount(opts.softCap, true)) {
      throw new Error('opts.softCap is invalid');
    }
    attrs.softCap = _base_operation.BaseOperation._toUnsignedXDRAmount(opts.softCap);

    if (!_base_operation.BaseOperation.isValidAmount(opts.hardCap, true)) {
      throw new Error('opts.hardCap is invalid');
    }
    attrs.hardCap = _base_operation.BaseOperation._toUnsignedXDRAmount(opts.hardCap);

    SaleRequestBuilder.validateDetail(opts.details);
    attrs.details = JSON.stringify(opts.details);
    attrs.ext = new _xdr_generated2.default.SaleCreationRequestExt(_xdr_generated2.default.LedgerVersion.emptyVersion());

    let isCrowdfunding = !(0, _isUndefined2.default)(opts.isCrowdfunding) && opts.isCrowdfunding;
    if (isCrowdfunding) {
      let crowdFundingSale = new _xdr_generated2.default.CrowdFundingSale({
        ext: new _xdr_generated2.default.CrowdFundingSaleExt(_xdr_generated2.default.LedgerVersion.emptyVersion())
      });
      let saleTypeExtTypedSale = _xdr_generated2.default.SaleTypeExtTypedSale.crowdFunding(crowdFundingSale);
      let saleTypeExt = new _xdr_generated2.default.SaleTypeExt({
        typedSale: saleTypeExtTypedSale
      });

      attrs.ext = _xdr_generated2.default.SaleCreationRequestExt.typedSale(saleTypeExt);
    }
    let request = new _xdr_generated2.default.SaleCreationRequest(attrs);

    if ((0, _isUndefined2.default)(opts.requestID)) {
      opts.requestID = '0';
    }

    if ((0, _isUndefined2.default)(opts.quoteAssets) || opts.quoteAssets.length === 0) {
      throw new Error('opts.quoteAssets is invalid');
    }

    attrs.quoteAssets = [];
    for (let i = 0; i < opts.quoteAssets.length; i++) {
      let quoteAsset = opts.quoteAssets[i];
      let minAmount;
      let maxAmount;
      if (isCrowdfunding) {
        minAmount = 1;
        maxAmount = 1;
      }

      let validAmount = _base_operation.BaseOperation.isValidAmount(quoteAsset.price, false, minAmount, maxAmount);
      if (!validAmount) {
        throw new Error(`opts.quoteAssets[i].price is invalid: ${quoteAsset.price}`);
      }

      if ((0, _isUndefined2.default)(quoteAsset.asset)) {
        throw new Error('opts.quoteAssets[i].asset is invalid');
      }

      attrs.quoteAssets.push(new _xdr_generated2.default.SaleCreationRequestQuoteAsset({
        price: _base_operation.BaseOperation._toUnsignedXDRAmount(quoteAsset.price),
        quoteAsset: quoteAsset.asset,
        ext: new _xdr_generated2.default.SaleCreationRequestQuoteAssetExt(_xdr_generated2.default.LedgerVersion.emptyVersion())
      }));
    }

    let withdrawRequestOp = new _xdr_generated2.default.CreateSaleCreationRequestOp({
      requestId: _jsXdr.UnsignedHyper.fromString(opts.requestID),
      request: request,
      ext: new _xdr_generated2.default.CreateSaleCreationRequestOpExt(_xdr_generated2.default.LedgerVersion.emptyVersion())
    });
    let opAttributes = {};
    opAttributes.body = _xdr_generated2.default.OperationBody.createSaleRequest(withdrawRequestOp);
    _base_operation.BaseOperation.setSourceAccount(opAttributes, opts);
    return new _xdr_generated2.default.Operation(opAttributes);
  }

  static validateDetail(details) {
    if ((0, _isUndefined2.default)(details)) {
      throw new Error('details is invalid');
    }

    if ((0, _isUndefined2.default)(details.short_description)) {
      throw new Error('details.short_description is invalid');
    }

    if ((0, _isUndefined2.default)(details.description)) {
      throw new Error('details.description is invalid');
    }

    if ((0, _isUndefined2.default)(details.logo)) {
      throw new Error('details.logo is invalid');
    }

    if ((0, _isUndefined2.default)(details.name)) {
      throw new Error('details.name is invalid');
    }
  }

  static crateSaleCreationRequestToObject(result, attrs) {
    result.requestID = attrs.requestId().toString();
    let request = attrs.request();
    result.baseAsset = request.baseAsset();
    result.defaultQuoteAsset = request.defaultQuoteAsset();
    result.startTime = request.startTime().toString();
    result.endTime = request.endTime().toString();
    result.softCap = _base_operation.BaseOperation._fromXDRAmount(request.softCap());
    result.hardCap = _base_operation.BaseOperation._fromXDRAmount(request.hardCap());
    result.details = JSON.parse(request.details());
    result.quoteAssets = [];
    for (let i = 0; i < request.quoteAssets().length; i++) {
      result.quoteAssets.push({
        price: _base_operation.BaseOperation._fromXDRAmount(request.quoteAssets()[i].price()),
        asset: request.quoteAssets()[i].quoteAsset()
      });
    }
  }

  /**
     * Creates operation to check sale state
     * @param {object} opts
     * @param {string} saleID - id of the sale to check
     * @param {string} [opts.source] - The source account for the operation. Defaults to the transaction's source account.
     * @returns {xdr.CheckSaleStateOp}
     */
  static checkSaleState(opts) {
    if ((0, _isUndefined2.default)(opts.saleID)) {
      throw new Error('Invalid opts.saleID');
    }

    let checkSaleStateOp = new _xdr_generated2.default.CheckSaleStateOp({
      saleId: _jsXdr.UnsignedHyper.fromString(opts.saleID),
      ext: new _xdr_generated2.default.CheckSaleStateOpExt(_xdr_generated2.default.LedgerVersion.emptyVersion())
    });
    let opAttributes = {};
    opAttributes.body = _xdr_generated2.default.OperationBody.checkSaleState(checkSaleStateOp);
    _base_operation.BaseOperation.setSourceAccount(opAttributes, opts);
    return new _xdr_generated2.default.Operation(opAttributes);
  }

  static checkSaleStateToObject(result, attrs) {
    result.saleID = attrs.saleId().toString();
  }
}
exports.SaleRequestBuilder = SaleRequestBuilder;