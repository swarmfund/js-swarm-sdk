'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Wallets = undefined;

var _lodash = require('lodash');

var _resource_group_base = require('../../resource_group_base');

var _wallet = require('../../wallet');

var _keypair = require('../../base/keypair');

var _change_signers = require('./change_signers');

var _errors = require('../errors');

var errors = _interopRequireWildcard(_errors);

var _horizon = require('../../horizon');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Wallets.
 */
class Wallets extends _resource_group_base.ResourceGroupBase {
  /**
   * Get key derivation params.
   *
   * @param {string} [email] User's email.
   * @param {boolean} [isRecovery=false] If true, get params for the recovery wallet.
   */
  getKdfParams(email, isRecovery = false) {
    return this._makeCallBuilder().appendUrlSegment('kdf').get({ email, isRecovery });
  }

  /**
   * Get an encrypted wallet.
   *
   * If verification is required, look for wallet ID in the errors meta:
   * ```
   * err.meta.walletId
   * ```
   *
   * @param {string} email User's email.
   * @param {string} password User's password.
   *
   * @return {Promise.<Wallet>} User's wallet.
   */
  async get(email, password) {
    let kdfResponse = await this.getKdfParams(email);
    let kdfParams = kdfResponse.data;
    let walletId = _wallet.Wallet.deriveId(email, password, kdfParams, kdfParams.salt);

    let walletResponse;
    try {
      walletResponse = await this._makeWalletsCallBuilder().appendUrlSegment(walletId).get();
    } catch (err) {
      // HACK: expose wallet Id to allow resend email
      let verificationRequired = err instanceof errors.VerificationRequiredError;

      if (verificationRequired) {
        (0, _lodash.set)(err.errors[0], 'meta.walletId', walletId);
      }

      throw err;
    }

    return _wallet.Wallet.fromEncrypted(walletResponse.data.keychainData, kdfParams, kdfParams.salt, email, password);
  }

  /**
   * Create a wallet.
   *
   * @param {string} email User's email.
   * @param {string} password User's password.
   *
   * @return {Promise.<object>} User's wallet and a recovery seed.
   */
  async create(email, password) {
    let kdfResponse = await this.getKdfParams();
    let kdfParams = kdfResponse.data;

    let mainWallet = _wallet.Wallet.generate(email);
    let encryptedMainWallet = mainWallet.encrypt(kdfParams, password);

    let secondFactorWallet = _wallet.Wallet.generate(email);
    let encryptedSecondFactorWallet = secondFactorWallet.encrypt(kdfParams, password);

    let recoveryKeypair = _keypair.Keypair.random();
    let encryptedRecoveryWallet = mainWallet.encryptRecoveryData(kdfParams, recoveryKeypair);

    await this._makeWalletsCallBuilder().post({
      data: {
        type: 'wallet',
        id: encryptedMainWallet.id,
        attributes: {
          accountId: encryptedMainWallet.accountId,
          keychainData: encryptedMainWallet.keychainData,
          email,
          salt: encryptedMainWallet.salt
        },
        relationships: {
          kdf: {
            data: {
              type: kdfParams.resourceType,
              id: kdfParams.id
            }
          },
          recovery: {
            data: {
              type: 'recovery',
              id: encryptedRecoveryWallet.id,
              attributes: {
                accountId: encryptedRecoveryWallet.accountId,
                keychainData: encryptedRecoveryWallet.keychainData,
                salt: encryptedRecoveryWallet.salt
              }
            }
          },
          factor: {
            data: {
              type: 'password',
              attributes: {
                accountId: secondFactorWallet.accountId,
                keychainData: encryptedSecondFactorWallet.keychainData,
                salt: encryptedSecondFactorWallet.salt
              }
            }
          }
        }
      }
    });

    return {
      wallet: mainWallet,
      recoverySeed: recoveryKeypair.secret()
    };
  }

  /**
   * Verify email.
   *
   * @param {string} payload Base64 encoded payload from the email link.
   */
  async verifyEmail(payload) {
    let decodedPayload = Buffer.from(payload, 'base64').toString('utf8');
    let jsonPayload = JSON.parse(decodedPayload);

    return this._makeWalletsCallBuilder().appendUrlSegment(jsonPayload.meta.wallet_id).appendUrlSegment('verification').put({ data: { attributes: { token: jsonPayload.meta.token } } });
  }

  /**
   * Re-send verification email.
   *
   * @param {string} [walletId] ID of the wallet to resend email for.
   */
  async resendEmail(walletId) {
    walletId = walletId || this._sdk.wallet.id;

    return this._makeWalletsCallBuilder().appendUrlSegment(walletId).appendUrlSegment('verification').post();
  }

  /**
   * Recover a wallet using the recovery seed.
   *
   * @param {string} email User's email.
   * @param {string} recoverySeed User's recovery seed.
   * @param {string} newPassword Desired password.
   *
   * @return {Wallet} New wallet.
   */
  async recovery(email, recoverySeed, newPassword) {
    let kdfResponse = await this.getKdfParams(email, true);
    let kdfParams = kdfResponse.data;

    let recoveryWallet = _wallet.Wallet.fromRecoverySeed(kdfParams, kdfParams.salt, email, recoverySeed);

    let newMainWallet = _wallet.Wallet.generate(email);
    let encryptedNewMainWallet = newMainWallet.encrypt(kdfParams, newPassword);

    let newSecondFactorWallet = _wallet.Wallet.generate(email);
    let encryptedSecondFactorWallet = newSecondFactorWallet.encrypt(kdfParams, newPassword);
    let accountId = await this._getAccountIdByRecoveryId(recoveryWallet.id);
    let signers = await this._getSigners(accountId);
    let tx = (0, _change_signers.makeChangeSignerTransaction)({
      newPublicKey: newMainWallet.accountId,
      signers,
      signingKeypair: recoveryWallet.keypair,
      soucreAccount: accountId
    });

    await this._makeWalletsCallBuilder().appendUrlSegment(recoveryWallet.id).withSignature(recoveryWallet).put({
      data: {
        type: 'wallet',
        id: encryptedNewMainWallet.id,
        attributes: {
          email,
          accountId: encryptedNewMainWallet.accountId,
          salt: encryptedNewMainWallet.salt,
          keychainData: encryptedNewMainWallet.keychainData
        },
        relationships: {
          transaction: {
            data: {
              attributes: {
                envelope: tx
              }
            }
          },
          kdf: {
            data: {
              type: kdfParams.resourceType,
              id: kdfParams.id
            }
          },
          factor: {
            data: {
              type: 'password',
              attributes: {
                accountId: encryptedSecondFactorWallet.accountId,
                keychainData: encryptedSecondFactorWallet.keychainData,
                salt: encryptedSecondFactorWallet.salt
              }
            }
          }
        }
      }
    });

    return newMainWallet;
  }

  /**
   * Change password.
   *
   * @param {string} newPassword Desired password.
   * @return {Wallet} New wallet.
   */
  async changePassword(newPassword) {
    const oldWallet = this._sdk.wallet;

    let kdfResponse = await this.getKdfParams(oldWallet.email, true);
    let kdfParams = kdfResponse.data;

    let newMainWallet = _wallet.Wallet.generate(oldWallet.email, oldWallet.accountId);
    let encryptedNewMainWallet = newMainWallet.encrypt(kdfParams, newPassword);

    let newSecondFactorWallet = _wallet.Wallet.generate(oldWallet.email);
    let encryptedSecondFactorWallet = newSecondFactorWallet.encrypt(kdfParams, newPassword);
    let signers = await this._getSigners(this._sdk.wallet.accountId);
    let tx = (0, _change_signers.makeChangeSignerTransaction)({
      newPublicKey: oldWallet.accountId,
      signers,
      signingKeypair: oldWallet.keypair,
      soucreAccount: oldWallet.accountId,
      signerToReplace: oldWallet.keypair.accountId()
    });

    await this._makeWalletsCallBuilder().appendUrlSegment(oldWallet.id).withSignature(oldWallet).put({
      data: {
        type: 'wallet',
        id: encryptedNewMainWallet.id,
        attributes: {
          email: oldWallet.email,
          accountId: encryptedNewMainWallet.accountId,
          salt: encryptedNewMainWallet.salt,
          keychainData: encryptedNewMainWallet.keychainData
        },
        relationships: {
          transaction: {
            data: {
              attributes: {
                envelope: tx
              }
            }
          },
          kdf: {
            data: {
              type: kdfParams.resourceType,
              id: kdfParams.id
            }
          },
          factor: {
            data: {
              type: 'password',
              attributes: {
                accountId: encryptedSecondFactorWallet.accountId,
                keychainData: encryptedSecondFactorWallet.keychainData,
                salt: encryptedSecondFactorWallet.salt
              }
            }
          }
        }
      }
    });

    return newMainWallet;
  }

  _makeCallBuilder() {
    return this._server._makeCallBuilder();
  }

  _makeWalletsCallBuilder() {
    return this._makeCallBuilder().appendUrlSegment('wallets');
  }

  _getSigners(accountId) {
    return this._sdk.horizon.account.getSigners(accountId).then(response => response.data.signers).catch(err => {
      if (err instanceof _horizon.errors.NotFoundError) {
        return [];
      }

      return Promise.reject(err);
    });
  }

  async _getAccountIdByRecoveryId(recoveryWalletId) {
    let wallet = await this._makeWalletsCallBuilder().appendUrlSegment(recoveryWalletId).get({});

    return wallet.data.accountId;
  }
}
exports.Wallets = Wallets;