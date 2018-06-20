'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deriveWalletId = deriveWalletId;
exports.deriveWalletKey = deriveWalletKey;
exports.randomBytes = randomBytes;
exports.encryptData = encryptData;
exports.decryptData = decryptData;
exports.calculateMasterKey = calculateMasterKey;

var _lodash = require('lodash');

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _sjclTokend = require('sjcl-tokend');

var _sjclTokend2 = _interopRequireDefault(_sjclTokend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ivLength = 96 / 8; // bytes

function deriveWalletId(masterKey) {
  return deriveFromKeyFunction('WALLET_ID', masterKey);
}

function deriveWalletKey(masterKey) {
  return deriveFromKeyFunction('WALLET_KEY', masterKey);
}

function deriveFromKeyFunction(token, masterKey) {
  // eslint-disable-next-line new-cap
  let hmac = new _sjclTokend2.default.misc.hmac(masterKey, _sjclTokend2.default.hash.sha256);
  return hmac.encrypt(token);
}

function randomBytes(length) {
  let buffer = Buffer.alloc(length);
  _crypto2.default.randomFillSync(buffer);

  return buffer;
}

function encryptData(data, key) {
  if (!(0, _lodash.isString)(data)) {
    throw new TypeError('data must be a String.');
  }

  let cipherName = 'aes';
  let modeName = 'gcm';

  let cipher = new _sjclTokend2.default.cipher[cipherName](key);
  let rawIV = randomBytes(ivLength).toString('hex');
  let encryptedData = _sjclTokend2.default.mode[modeName].encrypt(cipher, _sjclTokend2.default.codec.utf8String.toBits(data), rawIV);

  data = JSON.stringify({
    IV: _sjclTokend2.default.codec.base64.fromBits(rawIV),
    cipherText: _sjclTokend2.default.codec.base64.fromBits(encryptedData),
    cipherName: cipherName,
    modeName: modeName
  });

  return base64Encode(data);
}

function decryptData(encryptedData, key) {
  let rawCipherText;
  let rawIV;
  let cipherName;
  let modeName;
  try {
    let resultObject = JSON.parse(base64Decode(encryptedData));
    rawIV = _sjclTokend2.default.codec.base64.toBits(resultObject.IV);
    rawCipherText = _sjclTokend2.default.codec.base64.toBits(resultObject.cipherText);
    cipherName = resultObject.cipherName;
    modeName = resultObject.modeName;
  } catch (e) {
    throw new Error('Corrupt data.');
  }
  let cipher = new _sjclTokend2.default.cipher[cipherName](key);
  let rawData = _sjclTokend2.default.mode[modeName].decrypt(cipher, rawCipherText, rawIV);
  return _sjclTokend2.default.codec.utf8String.fromBits(rawData);
}

function calculateMasterKey(s0, email, password, kdfParams) {
  if (kdfParams.id === 2) {
    email = email.toLowerCase();
  }
  let versionBits = _sjclTokend2.default.codec.hex.toBits('0x01');
  let s0Bits = _sjclTokend2.default.codec.base64.toBits(s0);
  let emailBits = _sjclTokend2.default.codec.utf8String.toBits(email);
  let unhashedSaltBits = (0, _lodash.reduce)([versionBits, s0Bits, emailBits], _sjclTokend2.default.bitArray.concat);
  let salt = _sjclTokend2.default.hash.sha256.hash(unhashedSaltBits);

  return _sjclTokend2.default.misc.scrypt(password, salt, kdfParams.n, kdfParams.r, kdfParams.p, kdfParams.bits);
}

function base64Encode(str) {
  return Buffer.from(str).toString('base64');
}

function base64Decode(str) {
  return Buffer.from(str, 'base64').toString();
}