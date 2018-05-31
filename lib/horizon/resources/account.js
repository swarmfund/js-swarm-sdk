'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Account = undefined;

var _resource_group_base = require('../../resource_group_base');

/**
 * Account.
 *
 * @class
 */
class Account extends _resource_group_base.ResourceGroupBase {
  /**
   * Get user's account.
   *
   * @param {sting} [accountId] User's account ID. Use account ID of the attached wallet by default.
   * @return {HorizonResponse}
   */
  get(accountId) {
    return this._makeCallBuilderWithSignature(accountId).get();
  }

  /**
   * Get balances.
   *
   * @param {object} [query] Request options.
   * @param {Number} [query.limit] Page limit.
   * @param {string} [query.cursor] Page cursor.
   * @param {sting} [query.order] Sorting order.
   * @param {sting} [accountId] User's account ID. Use account ID of the attached wallet by default.
   *
   * @return {HorizonResponse} Collection of balances.
   */
  getBalances(query, accountId) {
    return this._makeCallBuilderWithSignature(accountId).appendUrlSegment('balances').get(query);
  }

  /**
   * Get balances details.
   *
   * @param {sting} [accountId] User's account ID. Use account ID of the attached wallet by default.
   * @return {HorizonResponse}
   */
  getDetails(accountId) {
    return this._makeCallBuilderWithSignature(accountId).appendUrlSegment(['balances', 'details']).get();
  }

  /**
   * Get referrals.
   *
   * @param {object} [query] Request options.
   * @param {Number} [query.limit] Page limit.
   * @param {string} [query.cursor] Page cursor.
   * @param {sting} [query.order] Sorting order.
   * @param {sting} [accountId] User's account ID. Use account ID of the attached wallet by default.
   * @return {HorizonResponse}
   */
  getReferrals(query, accountId) {
    return this._makeCallBuilderWithSignature(accountId).appendUrlSegment('referrals').get(query);
  }

  /**
   * Get account signers.
   *
   * @param {sting} [accountId] User's account ID. Use account ID of the attached wallet by default.
   * @return {HorizonResponse}
   */
  getSigners(accountId = null) {
    return this._makeCallBuilder(accountId).appendUrlSegment('signers').get();
  }

  /**
   * Get account signers.
   *
   * @param {sting} signerId Signer ID.
   * @param {sting} [accountId] User's account ID. Use account ID of the attached wallet by default.
   * @return {HorizonResponse}
   */
  getSigner(signerId, accountId) {
    return this._makeCallBuilder(accountId).appendUrlSegment(['signers', signerId]).get();
  }

  /**
   * Get balances.
   *
   * @param {object} [query] Request options.
   * @param {Number} [query.since] Start of the timespan.
   * @param {Number} [query.to] End of the timespan.
   * @param {sting} [accountId] User's account ID. Use account ID of the attached wallet by default.
   *
   * @return {HorizonResponse} Collection of balances.
   */
  getSummary(query, accountId) {
    return this._makeCallBuilderWithSignature(accountId).appendUrlSegment('summary').get(query);
  }

  _makeCallBuilder(accountId) {
    return this._server._makeCallBuilder().appendUrlSegment('accounts').appendAccountId(accountId);
  }

  _makeCallBuilderWithSignature(accountId) {
    return this._makeCallBuilder(accountId).withSignature();
  }
}
exports.Account = Account;