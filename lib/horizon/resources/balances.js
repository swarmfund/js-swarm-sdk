'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Balances = undefined;

var _resource_group_base = require('../../resource_group_base');

/**
 * Balances.
 *
 * @class
 */
class Balances extends _resource_group_base.ResourceGroupBase {
  /**
   * Get balances.
   *
   * @param {object} [query] Request options.
   * @param {Number} [query.limit] Page limit.
   * @param {string} [query.cursor] Page cursor.
   * @param {sting} [query.order] Sorting order.
   * @param {string} [query.asset] Filter by asset code.
   * @param {string} [query.account] Filter by balance owner.
   *
   * @return {Promise} Collection of balances.
   */
  getPage(query) {
    return this._makeCallBuilder().get(query);
  }

  /**
   * Get balance asset.
   *
   * @param {string} balanceId Balance ID.
   */
  getAsset(balanceId) {
    return this._makeCallBuilder().appendUrlSegment([balanceId, 'asset']).get();
  }

  /**
   * Get balance owner.
   *
   * @param {sting} balanceId Balance ID.
   */
  getAccount(balanceId) {
    return this._makeCallBuilder().appendUrlSegment([balanceId, 'account']).get();
  }

  _makeCallBuilder() {
    return this._server._makeCallBuilder().appendUrlSegment('balances').withSignature();
  }
}
exports.Balances = Balances;