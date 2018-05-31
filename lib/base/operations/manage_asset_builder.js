'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ManageAssetBuilder = undefined;

var _xdr_generated = require('../generated/xdr_generated');

var _xdr_generated2 = _interopRequireDefault(_xdr_generated);

var _isUndefined = require('lodash/isUndefined');

var _isUndefined2 = _interopRequireDefault(_isUndefined);

var _base_operation = require('./base_operation');

var _keypair = require('../keypair');

var _jsXdr = require('js-xdr');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ManageAssetBuilder {
  /**
     * Creates operation to create asset creation request
     * @param {object} opts
     *
     * @param {string} opts.requestID - request ID, if 0 - creates new, updates otherwise
     * @param {string} opts.code - Asset code
     * @param {string} opts.preissuedAssetSigner - AccountID of keypair which will sign request for asset to be authrorized to be issued
     * @param {string} opts.maxIssuanceAmount - Max amount can be issued of that asset
     * @param {number} opts.policies - Asset policies
     * @param {string} opts.initialPreissuedAmount - Amount of pre issued tokens available after creation of the asset
     *
     * @param {object} opts.details - Additional details about asset
     * @param {string} opts.details.name - Name of the asset
     * @param {array}  opts.details.documents - Documents attached to asset
     * @param {string} opts.details.logo - Asset picture
     * @param {string} opts.details.logo.key - Key to compose asset picture url
     * @param {string} opts.details.logo.type - Content type of asset logo
     * @param {string} opts.details.terms - Asset terms
     * @param {string} opts.details.terms.type - Content type of terms document
     * @param {string} opts.details.terms.name - Name of terms document
     *
     * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
     *
     * @returns {xdr.ManageAssetOp}
     */
  static assetCreationRequest(opts) {
    let attrs = ManageAssetBuilder._createUpdateAttrs(opts);

    if (!_keypair.Keypair.isValidPublicKey(opts.preissuedAssetSigner)) {
      throw new Error('opts.preissuedAssetSigner is invalid');
    }

    attrs.preissuedAssetSigner = _keypair.Keypair.fromAccountId(opts.preissuedAssetSigner).xdrAccountId();

    if (!_base_operation.BaseOperation.isValidAmount(opts.maxIssuanceAmount, true)) {
      throw new Error('opts.maxIssuanceAmount is invalid');
    }

    attrs.maxIssuanceAmount = _base_operation.BaseOperation._toUnsignedXDRAmount(opts.maxIssuanceAmount);

    if ((0, _isUndefined2.default)(opts.initialPreissuedAmount)) {
      opts.initialPreissuedAmount = '0';
    }

    if (!_base_operation.BaseOperation.isValidAmount(opts.initialPreissuedAmount, true)) {
      throw new Error('opts.initialPreissuedAmount is invalid');
    }

    attrs.initialPreissuedAmount = _base_operation.BaseOperation._toUnsignedXDRAmount(opts.initialPreissuedAmount);

    attrs.ext = new _xdr_generated2.default.AssetCreationRequestExt(_xdr_generated2.default.LedgerVersion.emptyVersion());

    let assetCreationRequest = new _xdr_generated2.default.AssetCreationRequest(attrs);
    return ManageAssetBuilder._createManageAssetOp(opts, new _xdr_generated2.default.ManageAssetOpRequest.createAssetCreationRequest(assetCreationRequest));
  }

  /**
     * Creates operation to create asset update request
     * @param {object} opts
     *
     * @param {string} opts.requestID - request ID, if 0 - creates new, updates otherwise
     * @param {string} opts.code - Asset code
     * @param {number} opts.policies - asset policies
     *
     * @param {object} opts.details - Additional details about asset
     * @param {string} opts.details.name - Name of the asset
     * @param {string} opts.details.logo - Asset picture
     * @param {string} opts.details.logo.key - Key to compose asset picture url
     * @param {string} opts.details.logo.type - Content type of asset logo
     * @param {string} opts.details.terms - Asset terms
     * @param {string} opts.details.terms.type - Content type of terms document
     * @param {string} opts.details.terms.name - Name of terms document
     *
     * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
     *
     * @returns {xdr.ManageAssetOp}
     */
  static assetUpdateRequest(opts) {
    let attrs = ManageAssetBuilder._createUpdateAttrs(opts);
    attrs.ext = new _xdr_generated2.default.AssetUpdateRequestExt(_xdr_generated2.default.LedgerVersion.emptyVersion());
    let assetUpdateRequest = new _xdr_generated2.default.AssetUpdateRequest(attrs);

    return ManageAssetBuilder._createManageAssetOp(opts, new _xdr_generated2.default.ManageAssetOpRequest.createAssetUpdateRequest(assetUpdateRequest));
  }

  /**
     * Creates operation to cancel asset creation/update request
     * @param {object} opts
     * @param {string} opts.requestID - request ID
     * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
     * @returns {xdr.ManageAssetOp}
     */
  static cancelAssetRequest(opts) {
    let attrs = {
      ext: new _xdr_generated2.default.CancelAssetRequestExt(_xdr_generated2.default.LedgerVersion.emptyVersion())
    };
    let cancelAssetRequest = new _xdr_generated2.default.CancelAssetRequest(attrs);

    return ManageAssetBuilder._createManageAssetOp(opts, new _xdr_generated2.default.ManageAssetOpRequest.cancelAssetRequest(cancelAssetRequest));
  }

  /**
     * Creates operation to cancel asset creation/update request
     * @param {object} opts
     * @param {string} opts.accountID - accountID to whome rights will be passed
     * @param {string} opts.code - asset code for which to rights will be passed
     * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
     * @returns {xdr.ManageAssetOp}
     */
  static changeAssetPreIssuer(opts) {
    if (!_keypair.Keypair.isValidPublicKey(opts.accountID)) {
      throw new Error('opts.accountID is invalid');
    }

    if ((0, _isUndefined2.default)(opts.code)) {
      throw new Error('opts.code is invalid - must be string');
    }

    opts.requestID = '0';

    let attrs = {
      ext: new _xdr_generated2.default.AssetChangePreissuedSignerExt(_xdr_generated2.default.LedgerVersion.emptyVersion()),
      accountId: _keypair.Keypair.fromAccountId(opts.accountID).xdrAccountId(),
      code: opts.code
    };
    let changePreissuedSigner = new _xdr_generated2.default.AssetChangePreissuedSigner(attrs);

    return ManageAssetBuilder._createManageAssetOp(opts, new _xdr_generated2.default.ManageAssetOpRequest.changePreissuedAssetSigner(changePreissuedSigner));
  }

  static _getValidDetails(opts) {
    let details = opts.details;

    if ((0, _isUndefined2.default)(details)) {
      details = {};
    }

    if ((0, _isUndefined2.default)(details.name)) {
      details.name = '';
    }

    if ((0, _isUndefined2.default)(details.terms)) {
      details.terms = {};
    }

    if ((0, _isUndefined2.default)(details.terms.key)) {
      details.terms.key = '';
    }

    if ((0, _isUndefined2.default)(details.terms.type)) {
      details.terms.type = '';
    }

    if ((0, _isUndefined2.default)(details.terms.name)) {
      details.terms.name = '';
    }

    if ((0, _isUndefined2.default)(details.logo)) {
      details.logo = {};
    }

    if ((0, _isUndefined2.default)(details.logo.key)) {
      details.logo.key = '';
    }

    if ((0, _isUndefined2.default)(details.logo.type)) {
      details.logo.type = '';
    }

    return {
      name: details.name,
      logo: details.logo,
      terms: details.terms
    };
  }

  static _createUpdateAttrs(opts) {
    if (!_base_operation.BaseOperation.isValidAsset(opts.code)) {
      throw new Error('opts.code is invalid');
    }

    if ((0, _isUndefined2.default)(opts.policies) || opts.policies < 0) {
      throw new Error('opts.policies must be nonnegative number');
    }

    let details = ManageAssetBuilder._getValidDetails(opts);

    let attrs = {
      code: opts.code,
      policies: opts.policies,
      details: JSON.stringify(details)
    };

    return attrs;
  }

  static _createManageAssetOp(opts, request) {
    if ((0, _isUndefined2.default)(opts.requestID)) {
      throw new Error('opts.requestID is invalid');
    }

    let assetUpdateOp = new _xdr_generated2.default.ManageAssetOp({
      requestId: _jsXdr.UnsignedHyper.fromString(opts.requestID),
      request: request,
      ext: new _xdr_generated2.default.ManageAssetOpExt(_xdr_generated2.default.LedgerVersion.emptyVersion())
    });

    let opAttributes = {};
    opAttributes.body = _xdr_generated2.default.OperationBody.manageAsset(assetUpdateOp);
    _base_operation.BaseOperation.setSourceAccount(opAttributes, opts);
    return new _xdr_generated2.default.Operation(opAttributes);
  }

  static manageAssetToObject(result, attrs) {
    result.requestID = attrs.requestId().toString();
    result.requestType = attrs.request().switch().name;
    switch (attrs.request().switch()) {
      case _xdr_generated2.default.ManageAssetAction.createAssetCreationRequest():
        {
          let request = attrs.request().createAsset();
          result.code = request.code();
          result.preissuedAssetSigner = _base_operation.BaseOperation.accountIdtoAddress(request.preissuedAssetSigner());
          result.policies = request.policies();
          result.maxIssuanceAmount = _base_operation.BaseOperation._fromXDRAmount(request.maxIssuanceAmount());
          result.initialPreissuedAmount = _base_operation.BaseOperation._fromXDRAmount(request.initialPreissuedAmount());
          result.details = JSON.parse(request.details());
          break;
        }
      case _xdr_generated2.default.ManageAssetAction.createAssetUpdateRequest():
        {
          let request = attrs.request().updateAsset();
          result.code = request.code();
          result.policies = request.policies();
          result.details = JSON.parse(request.details());
          break;
        }
      case _xdr_generated2.default.ManageAssetAction.cancelAssetRequest():
        {
          // nothing to do here
          break;
        }
      case _xdr_generated2.default.ManageAssetAction.changePreissuedAssetSigner():
        {
          let request = attrs.request().changePreissuedSigner();
          result.code = request.code();
          result.accountID = _base_operation.BaseOperation.accountIdtoAddress(request.accountId());
          break;
        }
    }
  }
}
exports.ManageAssetBuilder = ManageAssetBuilder;