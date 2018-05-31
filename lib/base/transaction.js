'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Transaction = undefined;

var _index = require('./index');

var _strkey = require('./strkey');

var _operation = require('./operation');

var _network = require('./network');

var _map = require('lodash/map');

var _map2 = _interopRequireDefault(_map);

var _each = require('lodash/each');

var _each2 = _interopRequireDefault(_each);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Transaction {
  /**
    * A new Transaction object is created from a transaction envelope or via {@link TransactionBuilder}.
    * Once a Transaction has been created from an envelope, its attributes and operations
    * should not be changed. You should only add signers (using {@link Transaction#sign}) to a Transaction object before
    * submitting to the network or forwarding on to additional signers.
    * @constructor
    * @param {string|xdr.TransactionEnvelope} envelope - The transaction envelope object or base64 encoded string.
    */
  constructor(envelope) {
    if (typeof envelope === 'string') {
      let buffer = Buffer.from(envelope, 'base64');
      envelope = _index.xdr.TransactionEnvelope.fromXDR(buffer);
    }
    // since this transaction is immutable, save the tx
    this.tx = envelope.tx();
    this.source = (0, _strkey.encodeCheck)('accountId', envelope.tx().sourceAccount().ed25519());
    this.memo = this.tx.memo();
    this.salt = this.tx.salt().toString();
    let timeBounds = this.tx.timeBounds();
    this.timeBounds = {
      minTime: timeBounds.minTime().toString(),
      maxTime: timeBounds.maxTime().toString()
    };

    let operations = this.tx.operations() || [];
    this.operations = (0, _map2.default)(operations, op => {
      return _operation.Operation.operationToObject(op);
    });

    let signatures = envelope.signatures() || [];
    this.signatures = (0, _map2.default)(signatures, s => s);
  }

  /**
     * Signs the transaction with the given {@link Keypair}.
     * @param {...Keypair} keypairs Keypairs of signers
     * @returns {void}
     */
  sign(...keypairs) {
    let txHash = this.hash();
    (0, _each2.default)(keypairs, kp => {
      let sig = kp.signDecorated(txHash);
      this.signatures.push(sig);
    });
  }

  /**
     * Returns a hash for this transaction, suitable for signing.
     * @returns {Buffer}
     */
  hash() {
    return (0, _index.hash)(this.signatureBase());
  }

  /**
     * Returns the "signature base" of this transaction, which is the value
     * that, when hashed, should be signed to create a signature that
     * validators on the Stellar Network will accept.
     *
     * It is composed of a 4 prefix bytes followed by the xdr-encoded form
     * of this transaction.
     * @returns {Buffer}
     */
  signatureBase() {
    return Buffer.concat([_network.Network.current().networkId(), _index.xdr.EnvelopeType.tx().toXDR(), this.tx.toXDR()]);
  }

  /**
     * To envelope returns a xdr.TransactionEnvelope which can be submitted to the network.
     * @returns {xdr.TransactionEnvelope}
     */
  toEnvelope() {
    let tx = this.tx;
    let signatures = this.signatures;
    let envelope = new _index.xdr.TransactionEnvelope({ tx, signatures });

    return envelope;
  }
}
exports.Transaction = Transaction;