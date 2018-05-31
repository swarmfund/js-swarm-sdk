'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decodeBase58 = decodeBase58;
exports.decodeBase58Check = decodeBase58Check;
exports.encodeBase58 = encodeBase58;
exports.encodeBase58Check = encodeBase58Check;

var _bs = require('./vendor/bs58');

var _bs2 = _interopRequireDefault(_bs);

var _isUndefined = require('lodash/isUndefined');

var _isUndefined2 = _interopRequireDefault(_isUndefined);

var _isNull = require('lodash/isNull');

var _isNull2 = _interopRequireDefault(_isNull);

var _hashing = require('./hashing');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const versionBytes = {
  'accountId': 0x00, // decimal 0
  'none': 0x01, // decimal 1
  'seed': 0x21 // decimal 33
};

function decodeBase58(encoded) {
  return Buffer.from(_bs2.default.decode(encoded));
}

function decodeBase58Check(versionByteName, encoded) {
  let decoded = _bs2.default.decode(encoded);
  let versionByte = decoded[0];
  let payload = decoded.slice(0, decoded.length - 4);
  let data = payload.slice(1);
  let checksum = decoded.slice(decoded.length - 4);

  let expectedVersion = versionBytes[versionByteName];

  if ((0, _isUndefined2.default)(expectedVersion)) {
    throw new Error(`${versionByteName} is not a valid version byte name.  expected one of "accountId", "seed", or "none"`);
  }

  if (versionByte !== expectedVersion) {
    throw new Error(`invalid version byte.  expected ${expectedVersion}, got ${versionByte}`);
  }

  let expectedChecksum = calculateChecksum(payload);

  if (!verifyChecksum(expectedChecksum, checksum)) {
    throw new Error(`invalid checksum`);
  }

  if (versionByteName === 'accountId' && decoded.length !== 37) {
    throw new Error(`Decoded address length is invalid. Expected 37, got ${decoded.length}`);
  }

  return Buffer.from(data);
}

function encodeBase58(data) {
  if ((0, _isNull2.default)(data) || (0, _isUndefined2.default)(data)) {
    throw new Error('cannot encode null data');
  }

  return _bs2.default.encode(data);
}

function encodeBase58Check(versionByteName, data) {
  if ((0, _isNull2.default)(data) || (0, _isUndefined2.default)(data)) {
    throw new Error('cannot encode null data');
  }

  let versionByte = versionBytes[versionByteName];

  if ((0, _isUndefined2.default)(versionByte)) {
    throw new Error(`${versionByteName} is not a valid version byte name.  expected one of "accountId", "seed", or "none"`);
  }

  data = Buffer.from(data);
  let versionBuffer = Buffer.from([versionByte]);
  let payload = Buffer.concat([versionBuffer, data]);
  let checksum = calculateChecksum(payload);
  let unencoded = Buffer.concat([payload, checksum]);

  return encodeBase58(unencoded);
}

function calculateChecksum(payload) {
  let inner = (0, _hashing.hash)(payload);
  let outer = (0, _hashing.hash)(inner);
  return outer.slice(0, 4);
}

function verifyChecksum(expected, actual) {
  if (expected.length !== actual.length) {
    return false;
  }

  if (expected.length === 0) {
    return true;
  }

  for (let i = 0; i < expected.length; i++) {
    if (expected[i] !== actual[i]) {
      return false;
    }
  }

  return true;
}