export function fixAproxError(value) {
  let diff = Math.round(value) - value;
  if ((diff > -10e-10 && diff < 0) || (diff < 10e-10 && diff > 0)) {
    return Math.round(value);
  } else {
    return value;
  }
}