import Integer from "./Integer.js";
import FixErrors from "../Utils/FixErrors.js";

let fixAproxError = FixErrors.fixAproxError

export default class Rational extends Integer {
  constructor(rational) {
    super(rational);
    this.value.real = Rational.isRational(+fixAproxError(+rational.toFixed(12)))
      ? fixAproxError(+rational.toFixed(12))
      : undefined;
    this.fraction = Rational.isRational(rational)
      ? {
          value: Rational.toFraction(this.value.real),
          numerator: +Rational.toFraction(this.value.real).includes("/")
            ? +Rational.toFraction(this.value.real).slice(
                0,
                Rational.toFraction(this.value.real).indexOf("/"),
              )
            : rational,
          denominator: +Rational.toFraction(this.value.real).includes("/")
            ? +Rational.toFraction(this.value.real).slice(
                Rational.toFraction(this.value.real).indexOf("/") + 1,
              )
            : 1,
        }
      : undefined;
  }

  static isRational(number) {
    let val = Rational.toFraction(number);
    if (val === undefined) {
      return false;
    } else {
      return true;
    }
  }

  static toFraction(val) {
    if (Number.isInteger(val)) {
      return `${val}`;
    } else {
      let num = val.toString();
      let decimals = num.slice(num.indexOf(".") + 1);
      if (decimals.length > 10) {
        let rep;
        let rep2;
        let rep3;
        let rep4;
        let rep5;
        let rep6;
        let rep7;
        let start;
        main: for (let i = 0; i < decimals.length / 2; i++) {
          start = i;
          for (let j = i + 1; j < decimals.length; j++) {
            rep = decimals.slice(i, j);
            rep2 = decimals.slice(j, 2 * j - i);
            rep3 = decimals.slice(2 * j - i, 3 * j - 2 * i);
            rep4 = decimals.slice(3 * j - 2 * i, 4 * j - 3 * i);
            rep5 = decimals.slice(4 * j - 3 * i, 5 * j - 4 * i);
            rep6 = decimals.slice(5 * j - 4 * i, 6 * j - 5 * i);
            rep7 = decimals.slice(6 * j - 5 * i, 7 * j - 6 * i);
            if (rep3.length === 0 && rep.length > rep2.length) {
              break;
            }
            if (rep.length > rep3.length) {
              rep3 = rep;
            }
            if (rep.length > rep4.length) {
              rep4 = rep;
            }
            if (rep.length > rep5.length) {
              rep5 = rep;
            }
            if (rep.length > rep6.length) {
              rep6 = rep;
            }
            if (rep.length > rep7.length) {
              rep7 = rep;
            }
            if (
              rep === rep2 &&
              rep === rep3 &&
              rep === rep4 &&
              rep === rep5 &&
              rep === rep6 &&
              rep === rep7
            ) {
              break main;
            }
          }
        }
        if (rep3.length === 0) {
          return undefined;
        } else {
          let pow1 = Math.pow(10, rep.length + start);
          let pow2 = Math.pow(10, start);
          let denom = pow1 - pow2;
          let n1 = Number.parseInt(val * pow1);
          let n2 = Number.parseInt(val * pow2);
          let numer = n1 - n2;
          let cf = Integer.gcf(denom, numer);
          if (denom / cf === 1) {
            return `${numer / cf}`;
          } else {
            return `${numer / cf}/${denom / cf}`;
          }
        }
      } else {
        let pow = decimals.length;
        let numer = +decimals;
        let denom = 10 ** pow;
        let gcf = Rational.gcf(numer, denom);
        return `${numer / gcf}/${denom / gcf}`;
      }
    }
  }
}
