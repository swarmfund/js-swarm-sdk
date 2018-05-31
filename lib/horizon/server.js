'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HorizonServer = undefined;

var _server_base = require('../server_base');

var _response = require('./response');

var _errors = require('./errors');

var errors = _interopRequireWildcard(_errors);

var _errors2 = require('../api/errors');

var _resources = require('./resources');

var resources = _interopRequireWildcard(_resources);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Facilitates interaction with a Horizon server instance.
 *
 * @class
 */
class HorizonServer extends _server_base.ServerBase {
  /**
   * Create a new Horizon instance.
   *
   * @constructor
   *
   * @param {Swarm} sdk Parent SDK instance.
   * @param {string} serverUrl Horizon server instance URL.
   * @param {boolean} [opts.allowHttp] Allow connecting to http servers, default: `false`. This must be set to false in production deployments!
   * @param {Object} [opts.proxy] Proxy configuration. Look [axios docs](https://github.com/axios/axios#request-config) for more info
   * @param {Object} [opts.httpBasicAuth] HTTP basic auth credentials. Look [axios docs](https://github.com/axios/axios#request-config) for more info.
   * @param {Object} [opts.customHeaders] Custom headers for request.
   * @param {boolean} [opts.withCredentials] Indicates whether or not cross-site Access-Control requests should be made using credentials.
   */
  constructor(sdk, serverUrl, opts = {}) {
    opts.responseType = 'json';
    super(sdk, serverUrl, opts);

    this.useResponseInterceptor(response => new _response.HorizonResponse(response, this._sdk), error => this._parseResponseError(error));
  }

  /**
   * Get network details.
   *
   * @return {HorizonResponse} Network details.
   */
  getNetworkDetails() {
    return this._makeCallBuilder().get();
  }

  /**
   * Balances.
   *
   * @return {Balances}
   */
  get balances() {
    return new resources.Balances(this, this._sdk);
  }

  /**
   * Account details.
   *
   * @return {Account}
   */
  get account() {
    return new resources.Account(this, this._sdk);
  }

  /**
   * Transactions.
   *
   * @return {Account}
   */
  get transactions() {
    return new resources.Transactions(this, this._sdk);
  }

  _parseResponseError(error) {
    if (error.response && error.response.status) {
      switch (error.response.status) {
        case 400:
          error = new errors.BadRequestError(error, this._axios);
          break;
        case 401:
          error = new errors.UnauthorizedError(error, this._axios);
          break;
        case 403:
          // TFA errors are returned by API, parse as an API error
          error = new _errors2.TFARequiredError(error, this._axios);
          break;
        case 404:
          error = new errors.NotFoundError(error, this._axios);
          break;
        case 500:
          error = new errors.InternalServerError(error, this._axios);
          break;
      }
    }

    return Promise.reject(error);
  }
}
exports.HorizonServer = HorizonServer;