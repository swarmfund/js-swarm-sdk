'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InternalServerError = exports.NotFoundError = exports.UnauthorizedError = exports.BadRequestError = exports.HorizonError = undefined;

var _errors = require('../errors');

var _case_converter = require('../utils/case_converter');

/**
 * Generic Horizon error response.
 *
 * @export
 * @class
 */
class HorizonError extends _errors.ServerErrorBase {
  /**
   * Wrap a raw axios error.
   *
   * @param {object} originalError Raw axios response.
   * @param {axios} axios Axios instance used for request.
   */
  constructor(originalError, axios) {
    super(originalError, axios);
    let response = originalError.response.data;
    this._detail = response.details;
    this._title = response.title;
    if (response.extras) {
      this._meta = (0, _case_converter.toCamelCaseDeep)(response.extras);
    }
  }
}

exports.HorizonError = HorizonError; /**
                                      * Horizon 400(BadRequest) error.
                                      *
                                      * @export
                                      * @class
                                      */

class BadRequestError extends HorizonError {}

exports.BadRequestError = BadRequestError; /**
                                            * Horizon 401(Unauthorized) error.
                                            *
                                            * @export
                                            * @class
                                            */

class UnauthorizedError extends HorizonError {}

exports.UnauthorizedError = UnauthorizedError; /**
                                                * Horizon 404(Not Found) error.
                                                *
                                                * @export
                                                * @class
                                                */

class NotFoundError extends HorizonError {}

exports.NotFoundError = NotFoundError; /**
                                        * Horizon 500(Internal Server Error) error.
                                        *
                                        * @export
                                        * @class
                                        */

class InternalServerError extends HorizonError {}
exports.InternalServerError = InternalServerError;