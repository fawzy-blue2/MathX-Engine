export default class Integer {
  constructor(integer) {
    // لكل قيمة جزئين تخيلي و حقيقي بالنسبة للاعداد الحقيقية الجزء التخيلي دائما يساوي الصفر
    // Each value consists of two parts (real and imaginary), for real numbers the imaginary parts always equals 0
    this.value = {
      real: Integer.isInteger(fixAproxError(integer))
        ? fixAproxError(integer)
        : undefined,
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