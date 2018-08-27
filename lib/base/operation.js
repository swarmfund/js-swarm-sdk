"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Operation = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _xdr_generated = _interopRequireDefault(require("./generated/xdr_generated"));

var _keypair = require("./keypair");

var _jsXdr = require("js-xdr");

var _hashing = require("./hashing");

var _strkey = require("./strkey");

var _isUndefined = _interopRequireDefault(require("lodash/isUndefined"));

var _base_operation = require("./operations/base_operation");

var _manage_asset_builder = require("./operations/manage_asset_builder");

var _review_request_builder = require("./operations/review_request_builder");

var _pre_issuance_request_op_builder = require("./operations/pre_issuance_request_op_builder");

var _create_issuance_request_builder = require("./operations/create_issuance_request_builder");

var _create_withdraw_request_builder = require("./operations/create_withdraw_request_builder");

var _sale_request_builder = require("./operations/sale_request_builder");

var _manage_offer_builder = require("./operations/manage_offer_builder");

var _set_options_builder = require("./operations/set_options_builder");

var _create_aml_request_builder = require("./operations/create_aml_request_builder");

var _create_update_kyc_request_builder = require("./operations/create_update_kyc_request_builder");

var _manage_sale = require("./operations/manage_sale");

var Operation =
/*#__PURE__*/
function (_BaseOperation) {
  (0, _inherits2.default)(Operation, _BaseOperation);

  function Operation() {
    (0, _classCallCheck2.default)(this, Operation);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Operation).apply(this, arguments));
  }

  (0, _createClass2.default)(Operation, null, [{
    key: "createAccount",

    /**
       * Create and fund a non existent account.
       * @param {object} opts
       * @param {string} opts.destination - Destination account ID to create an account for.
       * @param {string} opts.recoveryKey - AccountID of recovery signer.
       * @param {string} opts.accountType - Type of the account to be created.
       * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
       * * @param {string} opts.accountPolicies - The policies of the account.
       * @returns {xdr.CreateAccountOp}
       */
    value: function createAccount(opts) {
      if (!_keypair.Keypair.isValidPublicKey(opts.destination)) {
        throw new Error('destination is invalid');
      }

      if (!_keypair.Keypair.isValidPublicKey(opts.recoveryKey)) {
        throw new Error('recoveryKey is invalid');
      }

      var attributes = {};
      attributes.destination = _keypair.Keypair.fromAccountId(opts.destination).xdrAccountId();
      attributes.recoveryKey = _keypair.Keypair.fromAccountId(opts.recoveryKey).xdrAccountId();
      attributes.accountType = Operation._accountTypeFromNumber(opts.accountType);

      if (!(0, _isUndefined.default)(opts.accountPolicies)) {
        if (opts.accountPolicies < 0) {
          throw new TypeError('accountPolicies should be positive or zero');
        }

        attributes.policies = opts.accountPolicies;
      } else {
        attributes.policies = 0; // default no_permissions
      }

      if (opts.referrer) {
        if (!_keypair.Keypair.isValidPublicKey(opts.referrer)) {
          throw new TypeError('referrer is invalid');
        }

        attributes.referrer = _keypair.Keypair.fromAccountId(opts.referrer).xdrAccountId();
      }

      attributes.ext = new _xdr_generated.default.CreateAccountOpExt(_xdr_generated.default.LedgerVersion.emptyVersion());
      var createAccount = new _xdr_generated.default.CreateAccountOp(attributes);
      var opAttributes = {};
      opAttributes.body = _xdr_generated.default.OperationBody.createAccount(createAccount);
      Operation.setSourceAccount(opAttributes, opts);
      return new _xdr_generated.default.Operation(opAttributes);
    }
    /**
       * Create a payment operation.
       * @param {object} opts
       * @param {string} opts.sourceBalanceId - The balance id of source.
       * @param {string} opts.destinationBalanceId - The destination balance ID.
       * @param {boolean} opts.feeFromSource - if true - fee charged from source account, if false - from destination
       * @param {string} opts.amount - The amount to send.
       * @param {string} opts.paymentFee - The payment fee.
       * @param {string} opts.fixedFee - The fixed fee.
       * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
       * @returns {xdr.PaymentOp}
       */

  }, {
    key: "payment",
    value: function payment(opts) {
      var attributes = {};

      if (!Operation.isValidAmount(opts.amount)) {
        throw new TypeError('amount argument must be of type String and represent a positive number');
      }

      if (!_keypair.Keypair.isValidBalanceKey(opts.sourceBalanceId)) {
        throw new TypeError('sourceBalanceId is invalid');
      }

      if (!_keypair.Keypair.isValidBalanceKey(opts.destinationBalanceId)) {
        throw new TypeError('destinationBalanceId is invalid');
      }

      if (!Operation.isValidSubject(opts.subject)) {
        throw new Error('subject argument must be of type String 0-256 long');
      }

      if (!(0, _isUndefined.default)(opts.feeData)) {
        var sourceFee = new _xdr_generated.default.FeeData({
          paymentFee: Operation._toXDRAmount(opts.feeData.sourceFee.paymentFee),
          fixedFee: Operation._toXDRAmount(opts.feeData.sourceFee.fixedFee),
          ext: new _xdr_generated.default.FeeDataExt(_xdr_generated.default.LedgerVersion.emptyVersion())
        });
        var destinationFee = new _xdr_generated.default.FeeData({
          paymentFee: Operation._toXDRAmount(opts.feeData.destinationFee.paymentFee),
          fixedFee: Operation._toXDRAmount(opts.feeData.destinationFee.fixedFee),
          ext: new _xdr_generated.default.FeeDataExt(_xdr_generated.default.LedgerVersion.emptyVersion())
        });
        attributes.feeData = new _xdr_generated.default.PaymentFeeData({
          sourceFee: sourceFee,
          destinationFee: destinationFee,
          sourcePaysForDest: opts.feeData.sourcePaysForDest,
          ext: new _xdr_generated.default.PaymentFeeDataExt(_xdr_generated.default.LedgerVersion.emptyVersion())
        });
      } else {
        throw new Error('feeData argument must be defined');
      }

      if ((0, _isUndefined.default)(opts.reference)) {
        opts.reference = '';
      }

      if (!(0, _isUndefined.default)(opts.invoiceReference)) {
        var invoiceReference = new _xdr_generated.default.InvoiceReference({
          invoiceId: _jsXdr.UnsignedHyper.fromString(opts.invoiceReference.invoiceId),
          accept: opts.invoiceReference.accept,
          ext: new _xdr_generated.default.InvoiceReferenceExt(_xdr_generated.default.LedgerVersion.emptyVersion())
        });
        attributes.invoiceReference = invoiceReference;
      }

      attributes.amount = Operation._toXDRAmount(opts.amount);
      attributes.sourceBalanceId = _keypair.Keypair.fromBalanceId(opts.sourceBalanceId).xdrBalanceId();
      attributes.destinationBalanceId = _keypair.Keypair.fromBalanceId(opts.destinationBalanceId).xdrBalanceId();
      attributes.subject = opts.subject;
      attributes.reference = opts.reference;
      attributes.ext = new _xdr_generated.default.PaymentOpExt(_xdr_generated.default.LedgerVersion.emptyVersion());
      var payment = new _xdr_generated.default.PaymentOp(attributes);
      var opAttributes = {};
      opAttributes.body = _xdr_generated.default.OperationBody.payment(payment);
      Operation.setSourceAccount(opAttributes, opts);
      return new _xdr_generated.default.Operation(opAttributes);
    }
  }, {
    key: "directDebit",
    value: function directDebit(opts) {
      if (!_keypair.Keypair.isValidPublicKey(opts.from)) {
        throw new TypeError('from is invalid');
      }

      var attributes = {};
      attributes.from = _keypair.Keypair.fromAccountId(opts.from).xdrAccountId();
      attributes.paymentOp = Operation.payment(opts.paymentOp).body().value();
      attributes.ext = new _xdr_generated.default.DirectDebitOpExt(_xdr_generated.default.LedgerVersion.emptyVersion());
      var directDebit = new _xdr_generated.default.DirectDebitOp(attributes);
      var opAttributes = {};
      opAttributes.body = _xdr_generated.default.OperationBody.directDebit(directDebit);
      Operation.setSourceAccount(opAttributes, opts);
      return new _xdr_generated.default.Operation(opAttributes);
    }
    /**
       * Create a recovery op.
       * @param {object} opts
       * @param {string} opts.account - The target account to recover
       * @param {string} opts.oldSigner - Signer to recover.
       * @param {string} opts.newSigner - Signer to recover to.
       * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
       * @returns {xdr.RecoverOp}
       */

  }, {
    key: "recover",
    value: function recover(opts) {
      if (!_keypair.Keypair.isValidPublicKey(opts.account)) {
        throw new TypeError('account is invalid');
      }

      if (!_keypair.Keypair.isValidPublicKey(opts.oldSigner)) {
        throw new TypeError('oldSigner is invalid');
      }

      if (!_keypair.Keypair.isValidPublicKey(opts.newSigner)) {
        throw new TypeError('newSigner is invalid');
      }

      var attributes = {
        ext: new _xdr_generated.default.RecoverOpExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      };
      attributes.account = _keypair.Keypair.fromAccountId(opts.account).xdrAccountId();
      attributes.oldSigner = _keypair.Keypair.fromAccountId(opts.oldSigner).xdrAccountId();
      attributes.newSigner = _keypair.Keypair.fromAccountId(opts.newSigner).xdrAccountId();
      attributes.action = opts.action;
      var recover = new _xdr_generated.default.RecoverOp(attributes);
      var opAttributes = {};
      opAttributes.body = _xdr_generated.default.OperationBody.recover(recover);
      Operation.setSourceAccount(opAttributes, opts);
      return new _xdr_generated.default.Operation(opAttributes);
    }
    /**
       * Set Fees to the ledger
       * @param {object} opts
       * @param {string} opts.destination - Destination account ID to create an account for.
       * @param {Object} [opts.fee] - Amount in XLM the account should be funded for.
       * @param {string} opts.fee.feeType - feeType
       * @param {string} opts.fee.feeAmount - fee amount
       * @param {bool} [opts.isDelete] - isDelete - true for remove fee
       * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
       * @returns {xdr.SetFeesOp}
       */

  }, {
    key: "setFees",
    value: function setFees(opts) {
      var attributes = {
        ext: new _xdr_generated.default.SetFeesOpExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      };

      if (!(0, _isUndefined.default)(opts.fee)) {
        if (!Operation.isValidAmount(opts.fee.fixedFee, true)) {
          throw new TypeError('fixedFee argument must be of type String and represent a non-negative number');
        }

        if (!Operation.isValidAmount(opts.fee.percentFee, true, 100)) {
          throw new TypeError('percentFee argument must be of type String and represent a non-negative number less than 100');
        }

        if ((0, _isUndefined.default)(opts.fee.feeType)) {
          throw new TypeError('feeType must be defined');
        }

        if (!(opts.fee.feeType instanceof _xdr_generated.default.FeeType)) {
          throw new TypeError('feeType must be xdr.FeeType');
        }

        if (!Operation.isValidAsset(opts.fee.asset)) {
          throw new TypeError('Asset is invalid');
        }

        if ((0, _isUndefined.default)(opts.fee.period)) {
          opts.fee.period = '0'; // <<clear
        }

        if ((0, _isUndefined.default)(opts.fee.subtype)) {
          opts.fee.subtype = '0';
        }

        if ((0, _isUndefined.default)(opts.fee.lowerBound)) {
          opts.fee.lowerBound = '0';
        }

        if ((0, _isUndefined.default)(opts.fee.upperBound)) {
          opts.fee.upperBound = _base_operation.BaseOperation.MAX_INT64_AMOUNT;
        }

        var feeData = {
          fixedFee: Operation._toXDRAmount(opts.fee.fixedFee),
          percentFee: Operation._toXDRAmount(opts.fee.percentFee),
          feeType: opts.fee.feeType,
          asset: opts.fee.asset,
          subtype: _jsXdr.Hyper.fromString(opts.fee.subtype),
          lowerBound: Operation._toXDRAmount(opts.fee.lowerBound),
          upperBound: Operation._toXDRAmount(opts.fee.upperBound),
          ext: new _xdr_generated.default.FeeEntryExt(_xdr_generated.default.LedgerVersion.emptyVersion())
        };
        var data = "type:".concat(opts.fee.feeType.value, "asset:").concat(opts.fee.asset, "subtype:").concat(opts.fee.subtype.toString());

        if (opts.fee.accountId) {
          if (!_keypair.Keypair.isValidPublicKey(opts.fee.accountId)) {
            throw new TypeError('accountId is invalid');
          } else {
            feeData.accountId = _keypair.Keypair.fromAccountId(opts.fee.accountId).xdrAccountId();
            data += "accountID:".concat(opts.fee.accountId);
          }
        }

        if (opts.fee.accountType) {
          feeData.accountType = Operation._accountTypeFromNumber(opts.fee.accountType);
          data += "accountType:".concat(opts.fee.accountType);
        }

        feeData.hash = (0, _hashing.hash)(data);
        var entry = new _xdr_generated.default.FeeEntry(feeData);
        attributes.fee = entry;
      }

      if ((0, _isUndefined.default)(opts.isDelete)) {
        attributes.isDelete = false;
      } else {
        attributes.isDelete = opts.isDelete;
      }

      var setfees = new _xdr_generated.default.SetFeesOp(attributes);
      var opAttributes = {};
      opAttributes.body = _xdr_generated.default.OperationBody.setFee(setfees);
      Operation.setSourceAccount(opAttributes, opts);
      return new _xdr_generated.default.Operation(opAttributes);
    }
    /**
       * Returns an XDR ManageAccountOp. A "manage account" operations block|ublocks account.
       * @param {object} opts
       * @param {string} opts.account - Account to be managed.
       * @param {boolean} [opts.block] - True to block account.
       * @returns {xdr.ManageAccountOp}
       */

  }, {
    key: "manageAccount",
    value: function manageAccount(opts) {
      var attributes = {
        ext: new _xdr_generated.default.ManageAccountOpExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      };

      if (!_keypair.Keypair.isValidPublicKey(opts.account)) {
        throw new Error('account is invalid');
      }

      attributes.account = _keypair.Keypair.fromAccountId(opts.account).xdrAccountId();

      if ((0, _isUndefined.default)(opts.blockReasonsToAdd)) {
        opts.blockReasonsToAdd = 0;
      }

      if ((0, _isUndefined.default)(opts.blockReasonsToRemove)) {
        opts.blockReasonsToRemove = 0;
      }

      if ((0, _isUndefined.default)(opts.accountType)) {
        throw new Error('accountType should be defined');
      }

      attributes.accountType = Operation._accountTypeFromNumber(opts.accountType);
      attributes.blockReasonsToAdd = opts.blockReasonsToAdd;
      attributes.blockReasonsToRemove = opts.blockReasonsToRemove;
      var manageAccountOp = new _xdr_generated.default.ManageAccountOp(attributes);
      var opAttributes = {};
      opAttributes.body = _xdr_generated.default.OperationBody.manageAccount(manageAccountOp);
      Operation.setSourceAccount(opAttributes, opts);
      return new _xdr_generated.default.Operation(opAttributes);
    }
    /**
       * Returns an XDR ManageBalanceOp. A "manage account" operations creates|deletes balance for account.
       * @param {object} opts
       * @param {string} opts.destination - Account to create account for.
       * @param {xdr.ManageBalanceAction} – Delete or create
       * @returns {xdr.ManageBalanceOp}
       */

  }, {
    key: "manageBalance",
    value: function manageBalance(opts) {
      var attributes = {
        ext: new _xdr_generated.default.ManageBalanceOpExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      };

      if (!_keypair.Keypair.isValidPublicKey(opts.destination)) {
        throw new Error('account is invalid');
      }

      if (!(opts.action instanceof _xdr_generated.default.ManageBalanceAction)) {
        throw new TypeError('action argument should be value of xdr.ManageBalanceAction enum');
      }

      if (!Operation.isValidAsset(opts.asset)) {
        throw new TypeError('asset is invalid');
      }

      attributes.destination = _keypair.Keypair.fromAccountId(opts.destination).xdrAccountId();
      attributes.action = opts.action;
      attributes.asset = opts.asset;
      var manageBalanceOp = new _xdr_generated.default.ManageBalanceOp(attributes);
      var opAttributes = {};
      opAttributes.body = _xdr_generated.default.OperationBody.manageBalance(manageBalanceOp);
      Operation.setSourceAccount(opAttributes, opts);
      return new _xdr_generated.default.Operation(opAttributes);
    }
  }, {
    key: "reviewPaymentRequest",
    value: function reviewPaymentRequest(opts) {
      var attributes = {
        ext: new _xdr_generated.default.ReviewPaymentRequestOpExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      };

      if ((0, _isUndefined.default)(opts.paymentId)) {
        throw new Error('paymentId should be defined');
      }

      if ((0, _isUndefined.default)(opts.accept)) {
        throw new TypeError('accept should be defined');
      }

      if (!(0, _isUndefined.default)(opts.rejectReason)) {
        attributes.rejectReason = opts.rejectReason;
      }

      attributes.paymentId = _jsXdr.UnsignedHyper.fromString(opts.paymentId);
      attributes.accept = opts.accept;
      var reviewPaymentRequestOp = new _xdr_generated.default.ReviewPaymentRequestOp(attributes);
      var opAttributes = {};
      opAttributes.body = _xdr_generated.default.OperationBody.reviewPaymentRequest(reviewPaymentRequestOp);
      Operation.setSourceAccount(opAttributes, opts);
      return new _xdr_generated.default.Operation(opAttributes);
    }
    /**
       * Returns an XDR ManageAssetPairOp. A "manage asset pair" operations creates|updates asset pair.
       * @param {object} opts
       * @param {string} opts.base - base asset
       * @param {string} opts.quote - quote asset
       * @param {number|string} opts.policies - asset pair policies
       * @param {number|string} opts.physicalPriceCorrection - correction of physical price in percents. If physical price is set and restriction by physical price set, mininal price for offer for this pair will be physicalPrice * physicalPriceCorrection
       * @param {number|string} opts.maxPriceStep - max price step in percent. User is allowed to set offer with price < (1 - maxPriceStep)*currentPrice and > (1 + maxPriceStep)*currentPrice
       * @param {number|string} opts.physicalPrice - physical price
       * @param {xdr.ManageAssetPairAction} – Create or update
       * @returns {xdr.ManageBalanceOp}
       */

  }, {
    key: "manageAssetPair",
    value: function manageAssetPair(opts) {
      var attributes = {
        ext: new _xdr_generated.default.ManageAssetPairOpExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      };

      if (!Operation.isValidAsset(opts.base)) {
        throw new TypeError('base is invalid');
      }

      if (!Operation.isValidAsset(opts.quote)) {
        throw new TypeError('quote is invalid');
      }

      if (!(opts.action instanceof _xdr_generated.default.ManageAssetPairAction)) {
        throw new TypeError('action argument should be value of xdr.ManageAssetPairAction enum');
      }

      if ((0, _isUndefined.default)(opts.policies)) {
        throw new TypeError('policies are not defined');
      }

      if (!Operation.isValidAmount(opts.physicalPriceCorrection, true)) {
        throw new TypeError('physicalPriceCorrection argument must be of type String and represent a positive number or zero');
      }

      if (!Operation.isValidAmount(opts.maxPriceStep, true)) {
        throw new TypeError('maxPriceStep argument must be of type String and represent a positive number or zero');
      }

      if (!Operation.isValidAmount(opts.physicalPrice, true)) {
        throw new TypeError('physicalPrice argument must be of type String and represent a positive number or zero');
      }

      attributes.base = opts.base;
      attributes.quote = opts.quote;
      attributes.policies = opts.policies;
      attributes.action = opts.action;
      attributes.physicalPriceCorrection = Operation._toXDRAmount(opts.physicalPriceCorrection); // won't be updated

      attributes.physicalPrice = Operation._toXDRAmount(opts.physicalPrice);
      attributes.maxPriceStep = Operation._toXDRAmount(opts.maxPriceStep);
      var manageAssetPairOp = new _xdr_generated.default.ManageAssetPairOp(attributes);
      var opAttributes = {};
      opAttributes.body = _xdr_generated.default.OperationBody.manageAssetPair(manageAssetPairOp);
      Operation.setSourceAccount(opAttributes, opts);
      return new _xdr_generated.default.Operation(opAttributes);
    }
  }, {
    key: "manageInvoice",
    value: function manageInvoice(opts) {
      var attributes = {
        ext: new _xdr_generated.default.ManageInvoiceOpExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      };

      if (!_keypair.Keypair.isValidPublicKey(opts.sender)) {
        throw new Error('sender is invalid');
      }

      if (!_keypair.Keypair.isValidBalanceKey(opts.receiverBalance)) {
        throw new Error('receiverBalance is invalid');
      }

      if (!Operation.isValidAmount(opts.amount, true)) {
        throw new TypeError('amount argument must be of type String and represent a positive number or zero');
      }

      attributes.amount = Operation._toXDRAmount(opts.amount);

      if ((0, _isUndefined.default)(opts.invoiceId)) {
        throw new TypeError('invoiceId must be specified');
      }

      attributes.invoiceId = _jsXdr.UnsignedHyper.fromString(opts.invoiceId);
      attributes.sender = _keypair.Keypair.fromAccountId(opts.sender).xdrAccountId();
      attributes.receiverBalance = _keypair.Keypair.fromBalanceId(opts.receiverBalance).xdrBalanceId();
      var manageInvoiceOp = new _xdr_generated.default.ManageInvoiceOp(attributes);
      var opAttributes = {};
      opAttributes.body = _xdr_generated.default.OperationBody.manageInvoice(manageInvoiceOp);
      Operation.setSourceAccount(opAttributes, opts);
      return new _xdr_generated.default.Operation(opAttributes);
    }
  }, {
    key: "setLimits",
    value: function setLimits() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var attributes = {
        ext: new _xdr_generated.default.SetLimitsOpExt(_xdr_generated.default.LedgerVersion.emptyVersion()),
        limits: new _xdr_generated.default.Limits({
          dailyOut: Operation._toXDRAmount(opts.limits.dailyOut),
          weeklyOut: Operation._toXDRAmount(opts.limits.weeklyOut),
          monthlyOut: Operation._toXDRAmount(opts.limits.monthlyOut),
          annualOut: Operation._toXDRAmount(opts.limits.annualOut),
          ext: new _xdr_generated.default.LimitsExt(_xdr_generated.default.LedgerVersion.emptyVersion())
        })
      };

      if (opts.account) {
        if (!_keypair.Keypair.isValidPublicKey(opts.account)) {
          throw new Error('account is invalid');
        }

        attributes.account = _keypair.Keypair.fromAccountId(opts.account).xdrAccountId();
      } else if (opts.accountType) {
        attributes.accountType = Operation._accountTypeFromNumber(opts.accountType);
      }

      var setLimitsOp = new _xdr_generated.default.SetLimitsOp(attributes);
      var opAttributes = {};
      opAttributes.body = _xdr_generated.default.OperationBody.setLimit(setLimitsOp);
      Operation.setSourceAccount(opAttributes, opts);
      return new _xdr_generated.default.Operation(opAttributes);
    }
    /**
       * Converts the XDR Operation object to the opts object used to create the XDR
       * operation.
       * @param {xdr.Operation} operation - An XDR Operation.
       * @return {Operation}
       */

  }, {
    key: "operationToObject",
    value: function operationToObject(operation) {
      function accountIdtoAddress(accountId) {
        return (0, _strkey.encodeCheck)('accountId', accountId.ed25519());
      }

      function balanceIdtoString(balanceId) {
        return (0, _strkey.encodeCheck)('balanceId', balanceId.ed25519());
      }

      var result = {};

      if (operation.sourceAccount()) {
        result.source = accountIdtoAddress(operation.sourceAccount());
      }

      var attrs = operation.body().value();
      result.type = operation.body().switch().name;

      switch (operation.body().switch()) {
        case _xdr_generated.default.OperationType.createAccount():
          result.destination = accountIdtoAddress(attrs.destination());
          result.recoveryKey = accountIdtoAddress(attrs.recoveryKey());
          result.accountType = attrs.accountType().value;
          result.policies = attrs.policies();

          if (attrs.referrer()) {
            result.referrer = accountIdtoAddress(attrs.referrer());
          }

          break;

        case _xdr_generated.default.OperationType.payment():
          result.amount = Operation._fromXDRAmount(attrs.amount());
          result.feeFromSource = attrs.feeFromSource;
          result.sourceBalanceId = balanceIdtoString(attrs.sourceBalanceId());
          result.destinationBalanceId = balanceIdtoString(attrs.destinationBalanceId());
          result.subject = attrs.subject();
          result.reference = attrs.reference();
          result.feeData = {
            sourceFee: {
              paymentFee: Operation._fromXDRAmount(attrs.feeData().sourceFee().paymentFee()),
              fixedFee: Operation._fromXDRAmount(attrs.feeData().sourceFee().fixedFee())
            },
            destinationFee: {
              paymentFee: Operation._fromXDRAmount(attrs.feeData().destinationFee().paymentFee()),
              fixedFee: Operation._fromXDRAmount(attrs.feeData().destinationFee().fixedFee())
            },
            sourcePaysForDest: attrs.feeData().sourcePaysForDest()
          };

          if (attrs.invoiceReference()) {
            result.invoiceReference = {
              invoiceId: attrs.invoiceReference().invoiceId().toString(),
              accept: attrs.invoiceReference().accept()
            };
          }

          break;

        case _xdr_generated.default.OperationType.directDebit():
          var paymentOp = attrs.paymentOp();
          result.amount = Operation._fromXDRAmount(paymentOp.amount());
          result.feeFromSource = paymentOp.feeFromSource;
          result.sourceBalanceId = balanceIdtoString(paymentOp.sourceBalanceId());
          result.destinationBalanceId = balanceIdtoString(paymentOp.destinationBalanceId());
          result.subject = paymentOp.subject();
          result.reference = paymentOp.reference();
          result.from = accountIdtoAddress(attrs.from());
          result.feeData = {
            sourceFee: {
              paymentFee: Operation._fromXDRAmount(paymentOp.feeData().sourceFee().paymentFee()),
              fixedFee: Operation._fromXDRAmount(paymentOp.feeData().sourceFee().fixedFee())
            },
            destinationFee: {
              paymentFee: Operation._fromXDRAmount(paymentOp.feeData().destinationFee().paymentFee()),
              fixedFee: Operation._fromXDRAmount(paymentOp.feeData().destinationFee().fixedFee())
            },
            sourcePaysForDest: paymentOp.feeData().sourcePaysForDest()
          };
          break;

        case _xdr_generated.default.OperationType.setOption():
          _set_options_builder.SetOptionsBuilder.setOptionsToObject(result, attrs);

          break;

        case _xdr_generated.default.OperationType.setFee():
          if (!(0, _isUndefined.default)(attrs.fee())) {
            result.fee = {};
            result.fee.fixedFee = Operation._fromXDRAmount(attrs.fee().fixedFee());
            result.fee.percentFee = Operation._fromXDRAmount(attrs.fee().percentFee());
            result.fee.feeType = attrs.fee().feeType();
            result.fee.asset = attrs.fee().asset();
            result.fee.subtype = attrs.fee().subtype().toString();
            result.fee.lowerBound = Operation._fromXDRAmount(attrs.fee().lowerBound());
            result.fee.upperBound = Operation._fromXDRAmount(attrs.fee().upperBound());

            if (attrs.fee().accountId()) {
              result.fee.accountId = accountIdtoAddress(attrs.fee().accountId());
            }

            if (attrs.fee().accountType()) {
              result.fee.accountType = attrs.fee().accountType();
            }

            result.fee.hash = attrs.fee().hash();
          }

          break;

        case _xdr_generated.default.OperationType.manageAccount():
          result.account = accountIdtoAddress(attrs.account());
          result.blockReasonsToAdd = attrs.blockReasonsToAdd();
          result.blockReasonsToRemove = attrs.blockReasonsToRemove();
          result.accountType = attrs.accountType().value;
          break;

        case _xdr_generated.default.OperationType.manageBalance():
          result.action = attrs.action();
          result.destination = accountIdtoAddress(attrs.destination());
          result.asset = attrs.asset();
          break;

        case _xdr_generated.default.OperationType.reviewPaymentRequest():
          result.accept = attrs.accept();
          result.paymentId = attrs.paymentId().toString();

          if (attrs.rejectReason()) {
            result.rejectReason = attrs.rejectReason();
          }

          break;

        case _xdr_generated.default.OperationType.manageAsset():
          _manage_asset_builder.ManageAssetBuilder.manageAssetToObject(result, attrs);

          break;

        case _xdr_generated.default.OperationType.createPreissuanceRequest():
          _pre_issuance_request_op_builder.PreIssuanceRequestOpBuilder.preIssuanceRequestOpToObject(result, attrs);

          break;

        case _xdr_generated.default.OperationType.setLimit():
          if (attrs.account()) {
            result.account = accountIdtoAddress(attrs.account());
          }

          if (attrs.accountType()) {
            result.accountType = attrs.accountType().value;
          }

          result.limits = {};
          result.limits.dailyOut = Operation._fromXDRAmount(attrs.limits().dailyOut());
          result.limits.weeklyOut = Operation._fromXDRAmount(attrs.limits().weeklyOut());
          result.limits.monthlyOut = Operation._fromXDRAmount(attrs.limits().monthlyOut());
          result.limits.annualOut = Operation._fromXDRAmount(attrs.limits().annualOut());
          break;

        case _xdr_generated.default.OperationType.manageOffer():
          _manage_offer_builder.ManageOfferBuilder.manageOfferOpToObject(result, attrs);

          break;

        case _xdr_generated.default.OperationType.manageInvoice():
          result.amount = Operation._fromXDRAmount(attrs.amount());
          result.sender = accountIdtoAddress(attrs.sender());
          result.receiverBalance = balanceIdtoString(attrs.receiverBalance());
          result.invoiceId = attrs.invoiceId().toString();
          break;

        case _xdr_generated.default.OperationType.manageAssetPair():
          result.action = attrs.action();
          result.base = attrs.base();
          result.quote = attrs.quote();
          result.policies = attrs.policies();
          result.physicalPriceCorrection = Operation._fromXDRAmount(attrs.physicalPriceCorrection());
          result.maxPriceStep = Operation._fromXDRAmount(attrs.maxPriceStep());
          break;

        case _xdr_generated.default.OperationType.reviewRequest():
          _review_request_builder.ReviewRequestBuilder.reviewRequestToObject(result, attrs);

          break;

        case _xdr_generated.default.OperationType.createIssuanceRequest():
          _create_issuance_request_builder.CreateIssuanceRequestBuilder.createIssuanceRequestOpToObject(result, attrs);

          break;

        case _xdr_generated.default.OperationType.createWithdrawalRequest():
          _create_withdraw_request_builder.CreateWithdrawRequestBuilder.createWithdrawalRequestOpToObject(result, attrs);

          break;

        case _xdr_generated.default.OperationType.createSaleRequest():
          _sale_request_builder.SaleRequestBuilder.crateSaleCreationRequestToObject(result, attrs);

          break;

        case _xdr_generated.default.OperationType.checkSaleState():
          _sale_request_builder.SaleRequestBuilder.checkSaleStateToObject(result, attrs);

          break;

        case _xdr_generated.default.OperationType.createAmlAlert():
          _create_aml_request_builder.CreateAMLRequestBuilder.createAmlAlertToObject(result, attrs);

          break;

        case _xdr_generated.default.OperationType.createKycRequest():
          _create_update_kyc_request_builder.CreateUpdateKYCRequestBuilder.createUpdateKYCRequestOpToObject(result, attrs);

          break;

        case _xdr_generated.default.OperationType.manageSale():
          _manage_sale.ManageSaleBuilder.manageSaleToObject(result, attrs);

          break;

        default:
          throw new Error('Unknown operation');
      }

      return result;
    }
  }]);
  return Operation;
}(_base_operation.BaseOperation);

exports.Operation = Operation;