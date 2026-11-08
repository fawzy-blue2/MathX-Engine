import Symbols from "./Symbols.js";

export default {
  analyzeSqrt: function (x) {
    function getFactor() {
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
    return getFactor();
  },
  analyzePi: function (x) {
    let value = x;
    let pi = false;
    let numer;
    let denom;
    let factor;
    if (value.includes(Symbols.pi)) {
      pi = true;
      numer = +value.slice(0, value.indexOf(Symbols.pi))
      if (!numer) {
        numer = 1;
      }
      if (value.includes("/")) {
        denom = +value.slice(value.indexOf("/") + 1)
      } else {
        denom = 1
      }
    } else {
      if (value.includes("/")) {
        numer = +value.slice(0, value.indexOf("/"))
        denom = +value.slice(value.indexOf("/") + 1)
      } else {
        numer = +value
        denom = 1
      }
    };
    if (denom == 1) {
      factor = `${numer}`
    } else {
      factor = `${numer}/${denom}`
    }
    return {
      factor: factor,
      numerator: numer,
      denominator: denom,
      pi: pi
    }
  },
};
