'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Swarm = undefined;

var _api = require('./api');

var _horizon = require('./horizon');

var _wallet = require('./wallet');

var _network = require('./base/network');

/**
 * Swarm Software Development Toolkit.
 *
 * @class
 */
class Swarm {
  /**
   * Internal constructor. Use Swarm.create() isntead.
   *
   * @private
   * @constructor
   */
  constructor(url, opts = {}) {
    this._api = new _api.ApiServer(this, url, opts);
    this._horizon = new _horizon.HorizonServer(this, url, opts);
    this._clockDiff = 0;
    this._legacySignatures = opts.legacySignatures || false;
  }

  /**
   * Make a new Swarm SDK instance.
   *
   * @constructor
   *
   * @param {string} url Swarm backend url.
   * @param {object} [opts]
   * @param {boolean} [opts.allowHttp] Allow connecting to http servers, default: `false`. This must be set to false in production deployments!
   * @param {object} [opts.proxy] Proxy configuration. Look [axios docs](https://github.com/axios/axios#request-config) for more info
   * @param {object} [opts.httpBasicAuth] HTTP basic auth credentials. Look [axios docs](https://github.com/axios/axios#request-config) for more info.
   * @param {object} [opts.customHeaders] Custom headers for request.
   * @param {boolean} [opts.withCredentials] Indicates whether or not cross-site Access-Control requests should be made using credentials.
   * @param {boolean} [opts.legacySignatures] Use legacy signature scheme instead of IETF HTTP Signatures
   *
   * @return {Promise.<Swarm>}
   */
  static async create(url, opts) {
    let sdk = new Swarm(url, opts);
    let networkDetails = await sdk.horizon.getNetworkDetails();

    sdk._useNetworkPassphrase(networkDetails.data.networkPassphrase);
    sdk._calculateClockDiff(networkDetails.data.currentTime);

    return sdk;
  }

  /**
   * Horizon server instance.
   */
  get horizon() {
    return this._horizon;
  }

  /**
   * API server instance.
   */
  get api() {
    return this._api;
  }

  /**
   * User's wallet.
   */
  get wallet() {
    return this._wallet;
  }

  /**
   * Clock difference with the backend.
   */
  get clockDiff() {
    return this._clockDiff;
  }

  /**
   * Use legacy signature scheme instead of IETF HTTP Signatures.
   */
  get legacySignatures() {
    return this._legacySignatures;
  }

  /**
   * Use a wallet to sign transactions.
   *
   * @param {Wallet} wallet User's wallet.
   */
  useWallet(wallet) {
    if (!(wallet instanceof _wallet.Wallet)) {
      throw new TypeError('A wallet instance expected.');
    }

    this._wallet = wallet;
  }

  /**
   * Eject current wallet.
   */
  ejectWallet() {
    this._wallet = null;
  }

  _useNetworkPassphrase(networkPassphrase) {
    _network.Network.use(new _network.Network(networkPassphrase));
  }

  _calculateClockDiff(timestamp) {
    this._clockDiff = Date.now() / 1000 - timestamp;
  }
}
exports.Swarm = Swarm;