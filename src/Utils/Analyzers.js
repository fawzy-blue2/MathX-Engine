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