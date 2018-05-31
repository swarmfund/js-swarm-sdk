'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decodeCheck = decodeCheck;
exports.encodeCheck = encodeCheck;

var _base = require('base32.js');

var _base2 = _interopRequireDefault(_base);

var _crc = require('crc');

var _crc2 = _interopRequireDefault(_crc);

var _isUndefined = require('lodash/isUndefined');

var _isUndefined2 = _interopRequireDefault(_isUndefined);

var _isNull = require('lodash/isNull');

var _isNull2 = _interopRequireDefault(_isNull);

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const versionBytes = {
  accountId: 0x30,
  balanceId: 0x08,
  seed: 0x90
};

function decodeCheck(versionByteName, encoded) {
  if (!(0, _isString2.default)(encoded)) {
    throw new TypeError('encoded argument must be of type String');
  }

  let decoded = _base2.default.decode(encoded);
  let versionByte = decoded[0];
  let payload = decoded.slice(0, -2);
  let data = payload.slice(1);
  let checksum = decoded.slice(-2);

  if (encoded !== _base2.default.encode(decoded)) {
    throw new Error('invalid encoded string');
  }

  let expectedVersion = versionBytes[versionByteName];

  if ((0, _isUndefined2.default)(expectedVersion)) {
    throw new Error(`${versionByteName} is not a valid version byte name.  expected one of "accountId" or "seed"`);
  }

  if (versionByte !== expectedVersion) {
    throw new Error(`invalid version byte. expected ${expectedVersion}, got ${versionByte}`);
  }

  let expectedChecksum = calculateChecksum(payload);

  if (!verifyChecksum(expectedChecksum, checksum)) {
    throw new Error(`invalid checksum`);
  }

  return Buffer.from(data);
}

function encodeCheck(versionByteName, data) {
  if ((0, _isNull2.default)(data) || (0, _isUndefined2.default)(data)) {
    throw new Error('cannot encode null data');
  }

  let versionByte = versionBytes[versionByteName];

  if ((0, _isUndefined2.default)(versionByte)) {
    throw new Error(`${versionByteName} is not a valid version byte name.  expected one of "accountId" or "seed"`);
  }

  data = Buffer.from(data);
  let versionBuffer = Buffer.from([versionByte]);
  let payload = Buffer.concat([versionBuffer, data]);
  let checksum = calculateChecksum(payload);
  let unencoded = Buffer.concat([payload, checksum]);

  return _base2.default.encode(unencoded);
}

function calculateChecksum(payload) {
  // This code calculates CRC16-XModem checksum of payload
  // and returns it as Buffer in little-endian order.
  let checksum = Buffer.alloc(2);
  checksum.writeUInt16LE(_crc2.default.crc16xmodem(payload), 0);
  return checksum;
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