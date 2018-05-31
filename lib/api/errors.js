'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InternalServerError = exports.ConflictError = exports.NotFoundError = exports.VerificationRequiredError = exports.TFARequiredError = exports.ForbiddenRequestError = exports.NotAllowedError = exports.BadRequestError = exports.ApiError = undefined;

var _errors = require('../errors');

var _case_converter = require('../utils/case_converter');

/**
 * Generic API error response.
 */
class ApiError extends _errors.ServerErrorBase {
  /**
   * Wrap a raw API error response.
   *
   * @constructor
   *
   * @param {Error} originalError Original error response.
   * @param {axios} axios Axios instance used for the request.
   */
  constructor(originalError, axios) {
    super(originalError, axios);
    let unwrappedError = originalError.response.data.errors[0];
    this._title = unwrappedError.title;
    this._detail = unwrappedError.detail;
    this._meta = (0, _case_converter.toCamelCaseDeep)(unwrappedError.meta || {});
  }
}

exports.ApiError = ApiError; /**
                              * "Bad Request" error.
                              * `error.nestedErrors` may contain per-field errors.
                              *
                              * @export
                              * @class
                              */

class BadRequestError extends ApiError {
  /**
   * Wrap a raw API error response.
   *
   * @constructor
   *
   * @param {Error} originalError Original error response.
   * @param {axios} axios Axios instance used for the request.
   */
  constructor(originalError, axios) {
    super(originalError, axios);
    let errors = originalError.response.data.errors;
    if (errors.length > 1) {
      this._title = 'Request contains some errors.';
      this._detail = 'Request contains some errors. Check "nestedErrors"';
      this._nestedErrors = errors.map(err => ({
        title: err.title,
        detail: err.detail,
        meta: (0, _case_converter.toCamelCaseDeep)(err.meta)
      }));
    }
  }

  /**
   * Errors for every invalid field.
   */
  get nestedErrors() {
    return this._nestedErrors;
  }
}

exports.BadRequestError = BadRequestError; /**
                                            * User is not allowed to perform this action.
                                            *
                                            * @export
                                            * @class
                                            */

class NotAllowedError extends ApiError {}

exports.NotAllowedError = NotAllowedError; /**
                                            * Forbidden.
                                            *
                                            * @export
                                            * @class
                                            */

class ForbiddenRequestError extends ApiError {}

exports.ForbiddenRequestError = ForbiddenRequestError; /**
                                                        * Two Factor auth required.
                                                        *
                                                        * @export
                                                        * @class
                                                        */

class TFARequiredError extends ApiError {}

exports.TFARequiredError = TFARequiredError; /**
                                              * Account verification required.
                                              *
                                              * @export
                                              * @class
                                              */

class VerificationRequiredError extends ApiError {}

exports.VerificationRequiredError = VerificationRequiredError; /**
                                                                * The requested resource was not found.
                                                                *
                                                                * @export
                                                                * @class
                                                                */

class NotFoundError extends ApiError {}

exports.NotFoundError = NotFoundError; /**
                                        * The request could not be completed due to a conflict with the current state of the target resource.
                                        *
                                        * @export
                                        * @class
                                        */

class ConflictError extends ApiError {}

exports.ConflictError = ConflictError; /**
                                        * Internal server error.
                                        *
                                        * @export
                                        * @class
                                        */

class InternalServerError extends ApiError {}
exports.InternalServerError = InternalServerError;