'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HorizonResponse = undefined;

var _lodash = require('lodash');

var _url_helper = require('../utils/url_helper');

var urlHelper = _interopRequireWildcard(_url_helper);

var _case_converter = require('../utils/case_converter');

var _response_base = require('../response_base');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Horizon response wrapper.
 *
 * @class
 */
class HorizonResponse extends _response_base.ResponseBase {
  /**
   * Wrap a raw axios response.
   *
   * @param {object} rawResponse Raw axios.js response object.
   * @param {Swarm} sdk Swarm SDK instance.
   */
  constructor(rawResponse, sdk) {
    super(rawResponse);

    this._sdk = sdk;

    this._data = rawResponse.data;
    this._data = this._resolveLinks(this._data);
    this._data = this._unwrapCollection(this._data);
    this._data = (0, _case_converter.toCamelCaseDeep)(this._data);
  }

  /**
   * Get response data.
   *
   * @override
   */
  get data() {
    return this._data;
  }

  _resolveLinks(data) {
    if (data._links) {
      (0, _lodash.toPairs)(data._links).forEach(pair => {
        let key = pair[0];
        let value = pair[1];
        let methodName = (0, _lodash.camelCase)('fetch_' + key);
        this[methodName] = this._makeLinkCaller(value.href, value.templated);
      });

      delete data._links;
    }

    for (let key in data) {
      this._resolveNestedLinks(data[key]);
    }

    return data;
  }

  _resolveNestedLinks(obj) {
    if (!((0, _lodash.isObject)(obj) || (0, _lodash.isArray)(obj))) {
      return;
    }
    if (obj._links) {
      (0, _lodash.toPairs)(obj._links).forEach(pair => {
        let key = pair[0];
        let value = pair[1];
        let methodName = (0, _lodash.camelCase)('fetch_' + key);
        obj[methodName] = this._makeLinkCaller(value.href, value.templated);
      });

      delete obj._links;
    }

    for (let key in obj) {
      this._resolveNestedLinks(obj[key]);
    }
  }

  _unwrapCollection(data) {
    return data._embedded ? data._embedded.records : data;
  }

  _makeLinkCaller(link, templated) {
    return params => {
      if (templated) {
        link = urlHelper.resolveTemplate(link, params);
      }

      let query = urlHelper.parseQueryParams(link);

      let callBuilder = this._sdk.horizon._makeCallBuilder().appendUrlSegment(link);

      if (this._sdk.wallet) {
        callBuilder = callBuilder.withSignature();
      }

      return callBuilder.get(query);
    };
  }
}
exports.HorizonResponse = HorizonResponse;