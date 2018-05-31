'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Network = exports.Networks = undefined;

var _hashing = require('./hashing');

/**
* Contains passphrases for common networks:
* * `Networks.PUBLIC`: `Public Global Stellar Network ; September 2015`
* * `Networks.TESTNET`: `Test SDF Network ; September 2015`
* @type {{PUBLIC: string, TESTNET: string}}
*/
const Networks = exports.Networks = {
  PUBLIC: 'Public Global Stellar Network ; September 2015',
  TESTNET: 'Test SDF Network ; September 2015'
};

let current;

class Network {
  /**
    * The Network class provides helper methods to get the passphrase or id for different
    * stellar networks.  It also provides the {@link Network.current} class method that returns the network
    * that will be used by this process for the purposes of generating signatures.
    *
    * The test network is the default, but you can also override the default by using the `use`,
    * `usePublicNetwork` and `useTestNetwork` helper methods.
    *
    * Creates a new `Network` object.
    * @constructor
    * @param {string} networkPassphrase Network passphrase
    */
  constructor(networkPassphrase) {
    this._networkPassphrase = networkPassphrase;
  }

  /**
    * Use default network (right now default network is `testnet`).
    */
  static useDefault() {
    this.useTestNetwork();
  }

  /**
    * Use Stellar Public Network
    */
  static usePublicNetwork() {
    this.use(new Network(Networks.PUBLIC));
  }

  /**
    * Use test network.
    */
  static useTestNetwork() {
    this.use(new Network(Networks.TESTNET));
  }

  /**
    * Use network defined by Network object.
    * @param {Network} network Network to use
    */
  static use(network) {
    current = network;
  }

  /**
    * Returns currently selected network.
    * @returns {Network}
    */
  static current() {
    return current;
  }

  /**
    * Returns network passphrase.
    * @returns {string}
    */
  networkPassphrase() {
    return this._networkPassphrase;
  }

  /**
    * Returns Network ID. Network ID is SHA-256 hash of network passphrase.
    * @returns {string}
    */
  networkId() {
    return (0, _hashing.hash)(this.networkPassphrase());
  }
}

exports.Network = Network;
Network.useDefault();