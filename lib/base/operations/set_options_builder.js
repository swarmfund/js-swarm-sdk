'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SetOptionsBuilder = undefined;

var _xdr_generated = require('../generated/xdr_generated');

var _xdr_generated2 = _interopRequireDefault(_xdr_generated);

var _isUndefined = require('lodash/isUndefined');

var _isUndefined2 = _interopRequireDefault(_isUndefined);

var _base_operation = require('./base_operation');

var _keypair = require('../keypair');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SetOptionsBuilder {
  /**
     * Returns an XDR SetOptionsOp. A "set options" operations set or clear account flags,
     * set the account's inflation destination, and/or add new signers to the account.
     * The flags used in `opts.clearFlags` and `opts.setFlags` can be the following:
     *   - `{@link AuthRequiredFlag}`
     *   - `{@link AuthRevocableFlag}`
     *   - `{@link AuthImmutableFlag}`
     *
     * It's possible to set/clear multiple flags at once using logical or.
     * @param {object} opts
     * @param {number|string} [opts.masterWeight] - The master key weight.
     * @param {number|string} [opts.lowThreshold] - The sum weight for the low threshold.
     * @param {number|string} [opts.medThreshold] - The sum weight for the medium threshold.
     * @param {number|string} [opts.highThreshold] - The sum weight for the high threshold.
     * @param {object} [opts.signer] - Add or remove a signer from the account. The signer is
     *                                 deleted if the weight is 0.
     * @param {string} [opts.signer.pubKey] - The public key of the new signer (old `address` field name is deprecated).
     * @param {number|string} [opts.signer.weight] - The weight of the new signer (0 to delete or 1-255)
     * @param {number|string} [opts.signer.signerType] - The type of the new signer
     * @param {number|string} [opts.signer.identity] - The identity of the new signer
     * * @param {string} [opts.signer.name] - Name of the signer
     * @param {object} [opts.limitsUpdateRequestData] - required data for LimitsUpdateRequest creation
     * * @param {string} [opts.limitsUpdateRequestData.documentHash] - hash of the document to review
     * @param {string} [opts.source] - The source account (defaults to transaction source).
     * @returns {xdr.SetOptionsOp}
     * @see [Account flags](https://www.stellar.org/developers/guides/concepts/accounts.html#flags)
     */
  static setOptions(opts) {
    let attributes = {
      ext: new _xdr_generated2.default.SetOptionsOpExt(_xdr_generated2.default.LedgerVersion.emptyVersion())
    };

    let weightCheckFunction = (value, name) => {
      if (value >= 0 && value <= 255) {
        return true;
      } else {
        throw new Error(`${name} value must be between 0 and 255`);
      }
    };
    attributes.masterWeight = _base_operation.BaseOperation._checkUnsignedIntValue('masterWeight', opts.masterWeight, weightCheckFunction);
    attributes.lowThreshold = _base_operation.BaseOperation._checkUnsignedIntValue('lowThreshold', opts.lowThreshold, weightCheckFunction);
    attributes.medThreshold = _base_operation.BaseOperation._checkUnsignedIntValue('medThreshold', opts.medThreshold, weightCheckFunction);
    attributes.highThreshold = _base_operation.BaseOperation._checkUnsignedIntValue('highThreshold', opts.highThreshold, weightCheckFunction);

    if (opts.signer) {
      if (opts.signer.address) {
        console.warn('signer.address is deprecated. Use signer.pubKey instead.');
        opts.signer.pubKey = opts.signer.address;
      }

      if (!_keypair.Keypair.isValidPublicKey(opts.signer.pubKey)) {
        throw new Error('signer.pubKey is invalid');
      }

      opts.signer.weight = _base_operation.BaseOperation._checkUnsignedIntValue('signer.weight', opts.signer.weight, weightCheckFunction);
      opts.signer.signerType = _base_operation.BaseOperation._checkUnsignedIntValue('signer.signerType', opts.signer.signerType);
      if ((0, _isUndefined2.default)(opts.signer.signerType)) {
        throw new Error('signer.signerType is invalid');
      }

      opts.signer.identity = _base_operation.BaseOperation._checkUnsignedIntValue('signer.identity', opts.signer.identity);
      if ((0, _isUndefined2.default)(opts.signer.identity)) {
        throw new Error('signer.identity is invalid');
      }

      let signerName = '';
      if (!(0, _isUndefined2.default)(opts.signer.name) && opts.signer.name.length > 0) {
        if (opts.signer.name.length > 256) {
          throw new Error('Signer name must be less that 256 chars');
        }
        signerName = opts.signer.name;
      }

      let signerExt = new _xdr_generated2.default.SignerExt(_xdr_generated2.default.LedgerVersion.emptyVersion());
      attributes.signer = new _xdr_generated2.default.Signer({
        pubKey: _keypair.Keypair.fromAccountId(opts.signer.pubKey).xdrAccountId(),
        weight: opts.signer.weight,
        signerType: opts.signer.signerType,
        identity: opts.signer.identity,
        name: signerName,
        ext: signerExt
      });
    }

    if (opts.trustData) {
      if ((0, _isUndefined2.default)(opts.trustData.action)) {
        throw new Error('trustData.action is not defined');
      }
      if (!_keypair.Keypair.isValidPublicKey(opts.trustData.allowedAccount)) {
        throw new Error('trustData.allowedAccount is invalid');
      }
      if (!_keypair.Keypair.isValidBalanceKey(opts.trustData.balanceToUse)) {
        throw new Error('trustData.balanceToUse is invalid');
      }
      let trust = new _xdr_generated2.default.TrustEntry({
        allowedAccount: _keypair.Keypair.fromAccountId(opts.trustData.allowedAccount).xdrAccountId(),
        balanceToUse: _keypair.Keypair.fromBalanceId(opts.trustData.balanceToUse).xdrBalanceId(),
        ext: new _xdr_generated2.default.TrustEntryExt(_xdr_generated2.default.LedgerVersion.emptyVersion())
      });

      attributes.trustData = new _xdr_generated2.default.TrustData({
        trust,
        action: opts.trustData.action,
        ext: new _xdr_generated2.default.TrustDataExt(_xdr_generated2.default.LedgerVersion.emptyVersion())
      });
    }

    if (opts.limitsUpdateRequestData) {
      if ((0, _isUndefined2.default)(opts.limitsUpdateRequestData.documentHash)) {
        throw new Error('limitsUpdateRequestData.documentHash is not defined');
      }

      attributes.limitsUpdateRequestData = new _xdr_generated2.default.LimitsUpdateRequestData({
        documentHash: opts.limitsUpdateRequestData.documentHash,
        ext: new _xdr_generated2.default.LimitsUpdateRequestDataExt(_xdr_generated2.default.LedgerVersion.emptyVersion())
      });
    }

    let setOptionsOp = new _xdr_generated2.default.SetOptionsOp(attributes);

    let opAttributes = {};
    opAttributes.body = _xdr_generated2.default.OperationBody.setOption(setOptionsOp);
    _base_operation.BaseOperation.setSourceAccount(opAttributes, opts);
    return new _xdr_generated2.default.Operation(opAttributes);
  }

  static setOptionsToObject(result, attrs) {
    result.masterWeight = attrs.masterWeight();
    result.lowThreshold = attrs.lowThreshold();
    result.medThreshold = attrs.medThreshold();
    result.highThreshold = attrs.highThreshold();

    if (attrs.signer()) {
      let signer = {};
      signer.pubKey = _base_operation.BaseOperation.accountIdtoAddress(attrs.signer().pubKey());
      signer.weight = attrs.signer().weight();
      signer.signerType = attrs.signer().signerType();
      signer.identity = attrs.signer().identity();
      signer.name = attrs.signer().name();

      result.signer = signer;
    }
    if (attrs.trustData()) {
      let trustData = {};
      trustData.allowedAccount = _base_operation.BaseOperation.accountIdtoAddress(attrs.trustData().trust().allowedAccount());
      trustData.balanceToUse = _base_operation.BaseOperation.balanceIdtoString(attrs.trustData().trust().balanceToUse());
      trustData.action = attrs.trustData().action();
      result.trustData = trustData;
    }
    if (attrs.limitsUpdateRequestData()) {
      let limitsUpdateRequestData = {};
      limitsUpdateRequestData.documentHash = attrs.limitsUpdateRequestData().documentHash();
      result.limitsUpdateRequestData = limitsUpdateRequestData;
    }
  }
}
exports.SetOptionsBuilder = SetOptionsBuilder;