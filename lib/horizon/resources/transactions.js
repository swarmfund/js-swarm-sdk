'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Transactions = exports.SUBMIT_TRANSACTION_TIMEOUT = undefined;

var _resource_group_base = require('../../resource_group_base');

const SUBMIT_TRANSACTION_TIMEOUT = exports.SUBMIT_TRANSACTION_TIMEOUT = 60 * 10000;

/**
 * Transactions.
 *
 * @class
 */
class Transactions extends _resource_group_base.ResourceGroupBase {
  /**
   * Submit a transaction.
   *
   * @param {Transaction} transaction A transaction to be submitted.
   * @return {HorizonResponse} Response.
   */
  submit(transaction) {
    let tx = transaction.toEnvelope().toXDR().toString('base64');

    return this._makeCallBuilder().withTimeout(SUBMIT_TRANSACTION_TIMEOUT).post({ tx });
  }

  _makeCallBuilder() {
    return this._server._makeCallBuilder().appendUrlSegment('transactions');
  }
}
exports.Transactions = Transactions;