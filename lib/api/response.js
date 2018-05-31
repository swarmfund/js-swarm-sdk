'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ApiResponse = undefined;

var _url_helper = require('../utils/url_helper');

var _lodash = require('lodash');

var _case_converter = require('../utils/case_converter');

var _response_base = require('../response_base');

/**
 * API response wrapper.
 *
 * @class
 */
class ApiResponse extends _response_base.ResponseBase {
  /**
   * Wrap a raw axios.js response object.
   *
   * @constructor
   * @param {object} rawResponse Raw axios.js response object.
   * @param {Swarm} sdk Swarm instance.
   */
  constructor(rawResponse, sdk) {
    super(rawResponse);
    this._sdk = sdk;
    this._parseResponse(rawResponse);
  }

  /**
   * Get response data.
   *
   * @override
   */
  get data() {
    return this._data;
  }

  _parseResponse(response) {
    // NOTE: API follows the JSON API spec
    if (response.status === 204) {
      return;
    }

    let body = response.data;

    if ((0, _lodash.isArray)(body.data)) {
      this._data = body.data.map(item => {
        let parsed = this._parseResourceObjectData(item);
        this._resolveRelationships(item, parsed);
        this._resolveLinks(item, parsed);

        return parsed;
      });
    } else if (body.url) {
      // Legacy response on doc retrieval
      this._data = body;
    } else {
      this._data = this._parseResourceObjectData(body.data);
      this._resolveRelationships(body.data, this);
    }

    this._resolveLinks(body, this);
    this._data = (0, _case_converter.toCamelCaseDeep)(this._data);
  }

  _parseResourceObjectData(resourceObject) {
    let data = {
      id: resourceObject.id,
      resourceType: resourceObject.type
    };

    return Object.assign(data, resourceObject.attributes);
  }

  _resolveLinks(source, target) {
    if (!source.links) {
      return;
    }

    (0, _lodash.toPairs)(source.links).forEach(pair => {
      let key = pair[0];
      let value = pair[1];
      let methodName = (0, _lodash.camelCase)('fetch_' + key);
      let link = (0, _lodash.isString)(value) ? value : value.href;
      target[methodName] = this._makeLinkCaller(link);
    });

    delete source.links;
  }

  _makeLinkCaller(link) {
    return () => {
      let query = (0, _url_helper.parseQueryParams)(link);

      let callBuilder = this._sdk.api._makeCallBuilder().appendUrlSegment(link);

      if (this._sdk.wallet) {
        callBuilder = callBuilder.withSignature();
      }

      return callBuilder.get(query);
    };
  }

  _resolveRelationships(source, target) {
    if (!source.relationships) {
      return;
    }

    let relationships = {};
    Object.keys(source.relationships).forEach(key => {
      let value = source.relationships[key];
      relationships[key] = {
        id: value.data.id,
        resourceType: value.data.type
      };
      this._resolveLinks(value, relationships[key]);
    });

    delete source.relationships;
    target.relationships = relationships;
  }
}
exports.ApiResponse = ApiResponse;