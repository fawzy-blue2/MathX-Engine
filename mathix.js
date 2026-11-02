// import { render } from "express/lib/response"

// ثوابت رياضية و رموز ممكن تعدل عليها او تضيف ليها | Mathematical constants you can modify or edit
export const symbol = {
  alpha: "α",
  Alpha: "Α",
  beta: "ᵦ",
  Beta: "Β",
  gamma: "γ",
  Gamma: "Γ",
  delta: "δ",
  Delta: "Δ",
  omega: "ω",
  Omega: "Ω",
  pi: "π",
  Pi: "Π",
  e: "e",
};

export const constant = {
  pi: Math.PI,
  e: Math.E,
};

// مجموعات الاعداد | Number groups
// - الاعداد الصحيحة | Integers
export class Integer {
  constructor(integer) {
    // لكل قيمة جزئين تخيلي و حقيقي بالنسبة للاعداد الحقيقية الجزء التخيلي دائما يساوي الصفر
    // Each value consists of two parts (real and imaginary), for real numbers the imaginary parts always equals 0
    this.value = {
      real: Integer.isInteger(integer) ? integer : undefined,
      imaginary: 0,
    };
  }
  // دالة تتحقق من العدد ما ان كان صحيحا ام لا
  // this function checks that the input is integer or not
  static isInteger(number) {
    return Number.isInteger(number);
  }
  isInteger() {
    return this.value.imaginary === 0
      ? Number.isInteger(this.value.real)
      : false;
  }
  // دوال العمليات الحسابية تقبل الكائناتت كمدخل بجزئيه الحقيقي و التخيلي
  // Arethmetic operations function accept object as value includes real and imaginary parts
  static add(...objects) {
    let real = 0;
    let imag = 0;
    for (let i = 0; i < objects.length; i++) {
      real += objects[i].real;
      imag += objects[i].imaginary;
    }
    return {
      real: real,
      imaginary: imag,
    };
  }
  static subtract(...objects) {
    let real = objects[0].real;
    let imag = objects[0].imaginary;
    for (let i = 1; i < objects.length; i++) {
      real -= objects[i].real;
      imag -= objects[i].imaginary;
    }
    return {
      real: real,
      imaginary: imag,
    };
  }
  static multiply(...objects) {
    let real;
    let imag;
    objects.reduce(function (q, r, i) {
      let a = q.real;
      let b = q.imaginary;
      let c = r.real;
      let d = r.imaginary;
      real = a * c - b * d;
      imag = a * d + b * c;
    });
    return {
      real: real,
      imaginary: imag,
    };
  }
  // static divide(...objects) {
  //   let start = objects[0].value
  //   return objects.reduce(function (q, r, i) {
  //   })
  // }

  // دالة لايجاد العامل المشترك الاكبر بين مجموعة من القيم
  static gcf(...numbers) {
    if (numbers.every((e) => Integer.isInteger(e))) {
      let greatest = numbers.reduce(function (a, b) {
        return a > b ? a : b;
      });
      greatest = greatest % 2 === 0 ? greatest : greatest + 1;
      let gcf;
      for (let i = greatest / 2; i >= 1; i--) {
        if (numbers.every((e) => e % i === 0)) {
          gcf = i;
          break;
        }
      }
      return gcf;
    }
  }
  static lcf(...numbers) {
    let greatest = numbers.reduce(function (a, b) {
      return a > b ? a : b;
    });
    let lcf;
    for (let i = 2; i <= greatest / 2; i++) {
      if (numbers.every((e) => e % i === 0)) {
        lcf = i;
        break;
      }
    }
    return lcf;
  }
}

export class Rational extends Integer {
  constructor(rational) {
    super(rational);
    this.value.real = Rational.isRational(rational) ? rational : undefined;
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
        let start;
        main: for (let i = 0; i < decimals.length / 2; i++) {
          start = i;
          for (let j = i + 1; j < decimals.length; j++) {
            rep = decimals.slice(i, j);
            rep2 = decimals.slice(j, 2 * j - i);
            rep3 = decimals.slice(2 * j - i, 3 * j - 2 * i);
            rep4 = decimals.slice(3 * j - 2 * i, 4 * j - 3 * i);
            if (rep3.length === 0) {
              break;
            } else if (rep.length > rep3.length) {
              rep3 = rep;
            } else if (rep.length > rep4.length) {
              rep4 = rep;
            }
            if (rep === rep2 && rep === rep3 && rep === rep4) {
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

export class Real extends Rational {
  static PI = Math.PI;
  static E = Math.E;
  constructor(real) {
    super(real);
    this.value.real = real;
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
        term = Real.#term(number, constant[keys[i]], symbol[keys[i]]);
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
        if (no > -0.0001 && no < 0.0001) {
          break;
        }
        no = number;
        i++;
        no = no ** i;
        no = +no.toFixed(12);
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

export class Complex extends Real {
  constructor(real, imaginary) {
    super(real);
    this.value = {
      real: real,
      imaginary: imaginary,
    };
    this.term =
      this.value.imaginary < 0
        ? `${Complex.checkTerm(this.value.real)}${Complex.checkTerm(this.value.imaginary)}i`
        : this.value.imaginary === 0
          ? `${Complex.checkTerm(this.value.real)}`
          : this.value.imaginary > 0
            ? +this.value.real.toFixed(13) === 0
              ? `${Complex.checkTerm(this.value.imaginary)}i`
              : `${Complex.checkTerm(this.value.real)}+${Complex.checkTerm(this.value.imaginary)}i`
            : `${Complex.checkTerm(this.value.real)}+${Complex.checkTerm(this.value.imaginary)}i`;
    this.eulerForm = undefined;
    this.type = "rectangular";
    this.fraction = undefined;
  }
  toPolar() {
    if (this.type === "rectangular") {
      let r = +Math.sqrt(
        this.value.real ** 2 + this.value.imaginary ** 2,
      ).toFixed(13);
      let t = Math.atan(this.value.imaginary / this.value.real);
      this.value = {
        radius: r,
        theta: t,
      };
      this.term = `${Complex.checkTerm(r)}∠${Complex.checkTerm(t)}`;
      this.eulerForm = `${Complex.checkTerm(r)}(e^${Complex.checkTerm(t)}i)`;
      this.type = "polar";
    }
  }
  toRect() {
    if (this.type === "polar") {
      let x = +(this.value.radius * Math.cos(this.value.theta)).toFixed(13);
      let y = +(this.value.radius * Math.sin(this.value.theta)).toFixed(13);

      ((this.value = {
        real: x,
        imaginary: y,
      }),
        (this.term =
          this.value.imaginary < 0
            ? +this.value.real.toFixed(13) !== 0
              ? `${Complex.checkTerm(this.value.real)}${Complex.checkTerm(this.value.imaginary)}i`
              : `${Complex.checkTerm(this.value.imaginary)}i`
            : this.value.imaginary === 0
              ? `${Complex.checkTerm(this.value.real)}`
              : this.value.imaginary > 0
                ? +this.value.real.toFixed(13) === 0
                  ? `${Complex.checkTerm(this.value.imaginary)}i`
                  : `${Complex.checkTerm(this.value.real)}+${Complex.checkTerm(this.value.imaginary)}i`
                : `${Complex.checkTerm(this.value.real)}+${Complex.checkTerm(this.value.imaginary)}i`));
      this.fraction = undefined;
      this.eulerForm = undefined;
      this.type = "rectangular";
    }
  }
}

function fixAproxError(value) {
  let diff = Math.round(value) - value;
  if ((diff > -10e-10 && diff < 0) || (diff < 10e-10 && diff > 0)) {
    return Math.round(value);
  } else {
    return value;
  }
}

export function analyzeSqrt(x) {
  function getFactor() {
    if (x.value.imaginary == 0) {
      let factor = x.term;
      let root = 1;
      if (x.term.includes("√")) {
        factor = x.term.slice(0, x.term.indexOf("√"));
        root = +x.term.slice(x.term.indexOf("√") + 1);
      }
      let numer = 0;
      let denom = 1;
      if (factor) {
        if (factor.includes("/")) {
          numer = +factor.slice(0, factor.indexOf("/"));
          denom = +factor.slice(factor.indexOf("/") + 1);
        } else {
          numer = +factor;
          denom = 1;
        }
      } else {
        denom = 1;
        numer = 1;
        factor = 1;
      }
      return {
        factor: factor,
        numerator: numer,
        denominator: denom,
        underRoot: root,
      };
    }
  }
  return getFactor();
}

export class Angle {
  constructor(value) {
    this.value = value;
    this.unit = "radian";
  }
  toDegree() {
    if (this.unit == "radian") {
      let deg = (this.value * 180) / Real.PI;
      this.value = fixAproxError(deg);
      this.unit = "degree";
    } else {
      this.value = this.value;
      this.unit = this.unit;
    }
  }
  toRadian() {
    if (this.unit == "degree") {
      let rad = (Real.PI * this.value) / 180;
      this.value = rad;
      this.unit = "radian";
    } else {
      this.value = this.value;
      this.unit = this.unit;
    }
  }
}

export class Functions {
  static sin(x) {
    let result = undefined;
    if (x.unit == "radian") {
      result = new Real(Math.sin(x.value));
    } else {
      let val = x.toRadian();
      result = new Real(Math.sin(val.value));
    }
    return result;
  }
  static cos(x) {
    let result = undefined;
    if (x.unit == "radian") {
      result = new Real(Math.cos(x.value));
    } else {
      let val = x.toRadian();
      result = new Real(Math.cos(val.value));
    }
    return result;
  }
  static tan(x) {
    let result = undefined;
    if (x.unit == "radian") {
      result = new Real(Math.tan(x.value));
    } else {
      let val = x.toRadian();
      result = new Real(Math.tan(val.value));
    }
    return result;
  }
  static sec(x) {
    let result = undefined;
    if (x.unit == "radian") {
      result = new Real(Math.cos(x.value) ** -1);
    } else {
      let val = x.toRadian();
      result = new Real(Math.cos(val.value) ** -1);
    }
    return result;
  }
  static csc(x) {
    let result = undefined;
    if (x.unit == "radian") {
      result = new Real(Math.sin(x.value) ** -1);
    } else {
      let val = x.toRadian();
      result = new Real(Math.sin(val.value) ** -1);
    }
    return result;
  }
  static cot(x) {
    let result = undefined;
    if (x.unit == "radian") {
      result = new Real(Math.tan(x.value) ** -1);
    } else {
      let val = x.toRadian();
      result = new Real(Math.tan(val.value) ** -1);
    }
    return result;
  }
}

let angle = new Angle(Real.PI / 7);

console.log(Functions.sin(angle))
// console.log(Functions.cos(angle))
// console.log(Functions.tan(angle))
// console.log(Functions.sec(angle))
// console.log(Functions.csc(angle))
// console.log(Functions.cot(angle))

let num = Real.checkTerm(Math.cos(Math.PI / 7));
console.log(num);
