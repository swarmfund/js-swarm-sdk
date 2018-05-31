'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toCamelCaseDeep = toCamelCaseDeep;
exports.toSnakeCaseDeep = toSnakeCaseDeep;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function toCamelCaseDeep(object) {
  return convertCaseDeep(object, _lodash2.default.camelCase);
}

function toSnakeCaseDeep(object) {
  return convertCaseDeep(object, _lodash2.default.snakeCase);
}

function convertCaseDeep(object, transformPropertyName) {
  if (_lodash2.default.isString(object)) {
    return object;
  }
  if (_lodash2.default.isArray(object)) {
    return _lodash2.default.map(object, obj => convertCaseDeep(obj, transformPropertyName));
  }

  let convertedObject = _lodash2.default.cloneDeep(object);

  // Convert keys to camel case
  convertedObject = _lodash2.default.mapKeys(convertedObject, (value, key) => transformPropertyName(key));

  // Recursively apply throughout object
  return _lodash2.default.mapValues(convertedObject, value => {
    if (_lodash2.default.isPlainObject(value)) {
      return convertCaseDeep(value, transformPropertyName);
    } else if (_lodash2.default.isArray(value)) {
      return _lodash2.default.map(value, obj => convertCaseDeep(obj, transformPropertyName));
    }
    return value;
  });
}