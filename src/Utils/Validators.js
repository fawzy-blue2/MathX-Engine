import Rational from "../NumberSets/Rational";

function isInteger(number) {
  return Number.isInteger(number);
}

function isRational(number) {
  let val = Rational.toFraction(number);
  if (val === undefined) {
    return false;
  } else {
    return true;
  }
}
