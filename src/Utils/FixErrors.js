export default {
  fixAproxError: function(value) {
    let diff = value.toFixed(13) - value;
    if ((diff > -10e-10 && diff < 0) || (diff < 10e-10 && diff > 0)) {
      return value.toFixed(13);
    } else {
      return value;
    }
  }
}