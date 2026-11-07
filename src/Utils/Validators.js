import Rational from "../NumberSets/Rational.js";


export default {
  isInteger: function(number) {
    return Number.isInteger(number);
  },
  isRational: function(number) {
    let val = Rational.toFraction(number);
    if (val === undefined) {
      return false;
    } else {
      return true;
    }
  }
}
