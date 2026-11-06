import Real from "../NumberSets/Real";

export default class TrigonometricFunctions {
  static sin(x) {
    let result = undefined;
    if (x.unit == "radian") {
      result = new Real(fixAproxError(Math.sin(x.value)));
    } else {
      let val = x.toRadian();
      result = new Real(fixAproxError(Math.sin(val.value)));
    }
    return result;
  }
  static cos(x) {
    let result = undefined;
    if (x.unit == "radian") {
      result = new Real(fixAproxError(Math.cos(x.value)));
    } else {
      let val = x.toRadian();
      result = new Real(fixAproxError(Math.cos(val.value)));
    }
    return result;
  }
  static tan(x) {
    let result = undefined;
    if (x.value % (Real.PI / 2) !== 0 && x.value % ((3 * Real.PI) / 2) !== 0) {
      if (x.unit == "radian") {
        result = new Real(fixAproxError(Math.tan(x.value)));
      } else {
        let val = x.toRadian();
        result = new Real(fixAproxError(Math.tan(val.value)));
      }
    } else {
      result = undefined;
    }
    return result;
  }
}