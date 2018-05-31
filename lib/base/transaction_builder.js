'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransactionBuilder = undefined;

var _xdr_generated = require('./generated/xdr_generated');

var _xdr_generated2 = _interopRequireDefault(_xdr_generated);

var _jsXdr = require('js-xdr');

var _keypair = require('./keypair');

var _transaction = require('./transaction');

var _memo = require('./memo');

var _bignumber = require('bignumber.js');

var _bignumber2 = _interopRequireDefault(_bignumber);

var _clone = require('lodash/clone');

var _clone2 = _interopRequireDefault(_clone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let TX_EXPIRATION_PERIOD = 60 * 60 * 24 * 7 - 60 * 60;

class TransactionBuilder {
  /**
     * <p>Transaction builder helps constructs a new `{@link Transaction}` using the given account id</p>
     *
     * <p>Operations can be added to the transaction via their corresponding builder methods, and
     * each returns the TransactionBuilder object so they can be chained together. After adding
     * the desired operations, call the `build()` method on the `TransactionBuilder` to return a fully
     * constructed `{@link Transaction}` that can be signed. The returned transaction will contain
     * signature from the source account.</p>
     *
     * <p>The following code example creates a new transaction with {@link Operation.createAccount} and
     * {@link Operation.payment} operations.
     * The Transaction's source account first funds `destinationA`, then sends
     * a payment to `destinationB`. The built transaction is then signed by `sourceKeypair`.</p>
     *
     * ```
     * var transaction = new TransactionBuilder(source)
     *   .addOperation(Operation.createAccount({
            destination: destinationA,
            startingBalance: "20"
        }) // <- funds and creates destinationA
        .addOperation(Operation.payment({
            destination: destinationB,
            amount: "100"
            asset: Asset.native()
        }) // <- sends 100 XLM to destinationB
     *   .build();
     *
     * transaction.sign(sourceKeypair);
     * ```
     * @constructor
     * @param {string} sourceAccount - The source account for this transaction.
     * @param {object} [opts]
     * @param {object} [opts.timebounds] - The timebounds for the validity of this transaction.
     * @param {string} [opts.timebounds.minTime] - 64 bit unix timestamp
     * @param {string} [opts.timebounds.maxTime] - 64 bit unix timestamp
     * @param {Memo} [opts.memo] - The memo for the transaction
     */
  constructor(sourceAccount, opts = {}) {
    if (!sourceAccount) {
      throw new Error('must specify source account for the transaction');
    }
    this.source = sourceAccount;
    this.operations = [];
    this.signers = [];

    this.timebounds = (0, _clone2.default)(opts.timebounds);
    this.salt = opts.salt;
    this.memo = opts.memo || _memo.Memo.none();

    // the signed base64 form of the transaction to be sent to Horizon
    this.blob = null;
  }

  /**
     * Adds an operation to the transaction.
     * @param {xdr.Operation} operation The xdr operation object, use {@link Operation} static methods.
     * @returns {TransactionBuilder}
     */
  addOperation(operation) {
    this.operations.push(operation);
    return this;
  }

  /**
     * Adds a memo to the transaction.
     * @param {xdr.Memo} memo The xdr memo object, use {@link Memo} static methods.
     * @returns {TransactionBuilder}
     */
  addMemo(memo) {
    this.memo = memo;
    return this;
  }

  /**
     * This will build the transaction.
     * It will also increment the source account's sequence number by 1.
     * @returns {Transaction} This method will return the built {@link Transaction}.
     */
  build() {
    if (!this.salt) {
      this.salt = _bignumber2.default.random(0);
    }

    let attrs = {
      sourceAccount: _keypair.Keypair.fromAccountId(this.source).xdrAccountId(),
      salt: _xdr_generated2.default.Salt.fromString(this.salt.toString()),
      memo: this.memo,
      ext: new _xdr_generated2.default.TransactionExt(_xdr_generated2.default.LedgerVersion.emptyVersion())
    };

    if (!this.timebounds) {
      this.timebounds = {
        minTime: 0,
        maxTime: Math.round(Date.now() / 1000) + TX_EXPIRATION_PERIOD
      };
    }

    this.timebounds = {
      minTime: _jsXdr.UnsignedHyper.fromString(this.timebounds.minTime.toString()),
      maxTime: _jsXdr.UnsignedHyper.fromString(this.timebounds.maxTime.toString())
    };

    attrs.timeBounds = new _xdr_generated2.default.TimeBounds(this.timebounds);

    let xtx = new _xdr_generated2.default.Transaction(attrs);
    xtx.operations(this.operations);
    let xenv = new _xdr_generated2.default.TransactionEnvelope({ tx: xtx });

    let tx = new _transaction.Transaction(xenv);
    tx.sign(...this.signers);

    return tx;
  }
}
exports.TransactionBuilder = TransactionBuilder;