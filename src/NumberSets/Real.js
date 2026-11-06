import Rational from "./Rational";
import Integer from "./Integer";
import { fixAproxError } from "../Utils/FixErrors";
import Constants from "../Utils/Constants";
import Symbols from "../Utils/Symbols";

export default class Real extends Rational {
  constructor(real) {
    super(real);
    this.value.real = fixAproxError(real);
    this.term = Real.checkTerm(this.value.real);
  }
  static #term(number, constant, symbol) {
    if (Rational.isRational(number)) {
    } else {
      let no = number;
      let i = 0;
      while (
        (!no.toString().startsWith("0.00") &&
          !no.toString().startsWith("-0.00")) ||
        !Rational.isRational(no)
      ) {
        if (
          no.toString().startsWith("0.00") ||
          no.toString().startsWith("-0.00") ||
          Rational.isRational(no)
        ) {
          break;
        }
        i++;
        no /= constant;
        no = +no.toFixed(12);
      }
      if (!Rational.isRational(no)) {
        return undefined;
      } else if (Real.isInteger(no)) {
        if (i === 1) {
          return no === 1 ? `${symbol}` : `${no}${symbol}`;
        } else {
          return no === 1 ? `${symbol}^${i}` : `${no}(${symbol}^${i})`;
        }
      } else {
        let frac = new Rational(no);
        if (i === 1) {
          return frac.fraction.numerator === 1
            ? `${symbol}/${frac.fraction.denominator}`
            : `${frac.fraction.numerator}${symbol}/${frac.fraction.denominator}`;
        } else {
          return frac.fraction.numerator === 1
            ? `(${symbol}^${i})/${frac.fraction.denominator}`
            : `${frac.fraction.numerator}(${symbol}^${i})/${frac.fraction.denominator}`;
        }
      }
    }
  }
  static checkTerm(number) {
    if (Rational.isRational(number)) {
      return Real.toFraction(number);
    } else {
      let keys = ["e", "pi"];
      let term;

      for (let i = 0; i < keys.length; i++) {
        term = Real.#term(number, Constants[keys[i]], Symbols[keys[i]]);
        if (term !== undefined) {
          break;
        }
      }
      if (term !== undefined) {
        return term;
      } else {
        if (Real.#termRoot(number) !== undefined) {
          return Real.#termRoot(number);
        } else {
          return `${number.toFixed(5)}`;
        }
      }
    }
  }
  static #termRoot(number) {
    let value;
    let outN;
    let outD;
    let numer;
    let denom;
    if (Rational.isRational(number)) {
      value = number;
    } else {
      let no = number;
      let i = 0;
      while (!Rational.isRational(no)) {
        if ((no > -0.001 && no < 0.001) || i === 11) {
          break;
        }
        no = number;
        // if (i === 11) {
        //   break;
        // }
        i++;
        no = fixAproxError(no ** i);
      }
      if (Rational.isRational(no)) {
        let num = new Rational(no);
        let j = num.fraction.numerator;
        let k = num.fraction.denominator;
        if (num.fraction.value.includes("/")) {
          for (
            ;
            !Integer.isInteger(
              fixAproxError(num.fraction.denominator / k ** i),
            ) && k > 0;
          ) {
            k--;
            outD = k;
            if (
              Integer.isInteger(
                fixAproxError(num.fraction.denominator / k ** i),
              )
            ) {
              denom = fixAproxError(num.fraction.denominator / k ** i);
              break;
            }
          }
        } else {
          denom = 1;
          k = 1;
          outD = 1;
        }
        if (
          Integer.isInteger(fixAproxError(Math.sqrt(num.fraction.denominator)))
        ) {
          for (
            ;
            !Integer.isInteger(
              fixAproxError(num.fraction.numerator / j ** i),
            ) && j > 0;
          ) {
            j--;
            outN = j;
            if (
              Integer.isInteger(fixAproxError(num.fraction.numerator / j ** i))
            ) {
              numer = fixAproxError(num.fraction.numerator / j ** i);
              break;
            }
          }
        } else {
          outN = Math.sqrt(num.fraction.numerator);
          numer = 1;
        }
        no = Rational.toFraction(no);
        outD *= denom;
        numer *= denom;
        denom = 1;
        function outNum() {
          if (outD === 1 && outN === 1) {
            return "";
          } else if (outD === 1) {
            return `${outN}`;
          } else {
            return `${outN}/${outD}`;
          }
        }
        if (i === 1) {
          return `${no}`;
        } else if (i === 2) {
          value = `${outNum()}√${numer}`;
        } else if (i === 3) {
          value = `${outNum()}∛${numer}`;
        } else if (i === 4) {
          value = `${outNum()}∜${numer}`;
        } else {
          value = outNum() ? `${outNum()}(${i}^√${numer})` : `${i}^√${numer}`;
        }
      } else {
        return undefined;
      }
    }
    return value;
  }
}
