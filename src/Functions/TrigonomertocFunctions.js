import Real from "../NumberSets/Real.js";
import Constants from "../Utils/Constants.js";
import FixErrors from "../Utils/FixErrors.js";

let fixAproxError = FixErrors.fixAproxError

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
    let ang = x
    ang.toRadian()
    let r = ang.value;
    result = new Real(fixAproxError(Math.cos(r)));
    return result;
  }
  static tan(x) {
    let result = undefined;
    let ang = x
    ang.toRadian()
    let r = ang.value;
    if (r % (2 * Constants.pi) !== Constants.pi / 2 && r % ((2 * Constants.pi)) !== 3 * Constants.pi / 2) {
      result = new Real(fixAproxError(Math.tan(r)));
    } else {
      result = undefined;
    }
    return result;
  }
}
