"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bestR = bestR;

var _bignumber = require("bignumber.js");

var _bignumber2 = _interopRequireDefault(_bignumber);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const MAX_INT = (1 << 31 >>> 0) - 1;

/**
 * Calculates and returns the best rational approximation of the given real number.
 * @private
 * @param {string|number|BigNumber} number
 * @throws Error Throws `Error` when the best rational approximation cannot be found.
 * @returns {array} first element is n (numerator), second element is d (denominator)
 */
function bestR(number) {
  number = new _bignumber2.default(number);
  let a;
  let f;
  let fractions = [[new _bignumber2.default(0), new _bignumber2.default(1)], [new _bignumber2.default(1), new _bignumber2.default(0)]];
  let i = 2;
  while (true) {
    if (number.gt(MAX_INT)) {
      break;
    }
    a = number.floor();
    f = number.sub(a);
    let h = a.mul(fractions[i - 1][0]).add(fractions[i - 2][0]);
    let k = a.mul(fractions[i - 1][1]).add(fractions[i - 2][1]);
    if (h.gt(MAX_INT) || k.gt(MAX_INT)) {
      break;
    }
    fractions.push([h, k]);
    if (f.eq(0)) {
      break;
    }
    number = new _bignumber2.default(1).div(f);
    i++;
  }
  let [n, d] = fractions[fractions.length - 1];

  if (n.isZero() || d.isZero()) {
    throw new Error("Couldn't find approximation");
  }

  return [n.toNumber(), d.toNumber()];
}