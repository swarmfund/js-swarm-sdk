'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveTemplate = resolveTemplate;
exports.parseQueryParams = parseQueryParams;

var _urijs = require('urijs');

var _urijs2 = _interopRequireDefault(_urijs);

var _URITemplate = require('urijs/src/URITemplate');

var _URITemplate2 = _interopRequireDefault(_URITemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function resolveTemplate(urlTemplate, bindings) {
  return new _URITemplate2.default(urlTemplate).expand(bindings);
}

function parseQueryParams(url) {
  return (0, _urijs2.default)(url).query(true);
}