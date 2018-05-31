"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _extendableBuiltin3(cls) {
  function ExtendableBuiltin() {
    var instance = Reflect.construct(cls, Array.from(arguments));
    Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
    return instance;
  }

  ExtendableBuiltin.prototype = Object.create(cls.prototype, {
    constructor: {
      value: cls,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });

  if (Object.setPrototypeOf) {
    Object.setPrototypeOf(ExtendableBuiltin, cls);
  } else {
    ExtendableBuiltin.__proto__ = cls;
  }

  return ExtendableBuiltin;
}

function _extendableBuiltin2(cls) {
  function ExtendableBuiltin() {
    var instance = Reflect.construct(cls, Array.from(arguments));
    Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
    return instance;
  }

  ExtendableBuiltin.prototype = Object.create(cls.prototype, {
    constructor: {
      value: cls,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });

  if (Object.setPrototypeOf) {
    Object.setPrototypeOf(ExtendableBuiltin, cls);
  } else {
    ExtendableBuiltin.__proto__ = cls;
  }

  return ExtendableBuiltin;
}

function _extendableBuiltin(cls) {
  function ExtendableBuiltin() {
    var instance = Reflect.construct(cls, Array.from(arguments));
    Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
    return instance;
  }

  ExtendableBuiltin.prototype = Object.create(cls.prototype, {
    constructor: {
      value: cls,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });

  if (Object.setPrototypeOf) {
    Object.setPrototypeOf(ExtendableBuiltin, cls);
  } else {
    ExtendableBuiltin.__proto__ = cls;
  }

  return ExtendableBuiltin;
}

/**
 * Network error.
 *
 * @export
 * @class
 */
class NetworkError extends _extendableBuiltin(Error) {
  constructor(message, data) {
    super(message);
    this.data = data;
  }
}exports.NetworkError = NetworkError;
;

/**
 * Request timeout error.
 *
 * @export
 * @class
 */
class TimeoutError extends _extendableBuiltin2(Error) {
  constructor(message, data) {
    super(message);
    this.data = data;
  }
}

exports.TimeoutError = TimeoutError; /**
                                      * Base class for server errors.
                                      */

class ServerErrorBase extends _extendableBuiltin3(Error) {
  /**
   * Wrap a raw axios error.
   *
   * @param {object} originalError Raw axios response.
   * @param {axios} axios Axios instance used for request.
   */
  constructor(originalError, axios) {
    super(originalError.message);
    this.originalError = originalError;
    this._axios = axios;
  }

  /**
   * Response HTTP status.
   */
  get httpStatus() {
    return this.originalError.response.status;
  }

  /**
   * Error meta.
   */
  get meta() {
    return this._meta;
  }

  /**
   * A short, human-readable summary of the problem.
   */
  get title() {
    return this._title;
  }

  /**
   * A human-readable explanation specific to this occurrence of the problem.
   */
  get detail() {
    return this._detail;
  }

  /**
   * Retry the failed request.
   * Use it to retry requests after 2FA.
   */
  retryRequest() {
    let config = this.originalError.config;
    return this._axios(config);
  }
}
exports.ServerErrorBase = ServerErrorBase;