import Rational from "./NumberSets/Rational.js";
import Real from "./NumberSets/Real.js";
import Constants from "./Utils/Constants.js";

// Number Sets
export { default as Integer } from "./NumberSets/Integer.js";
export { default as Rational } from "./NumberSets/Rational.js";
export { default as Real } from "./NumberSets/Real.js";
export { default as Complex } from "./NumberSets/Complex.js";
export { default as Angle } from "./NumberSets/Angle.js";

// Functions
export { default as TrigonometricFunctions } from "./Functions/TrigonomertocFunctions.js";

// utils
export { default as Constants } from "./Utils/Constants.js";
export { default as Symbols } from "./Utils/Symbols.js";
export { default as Analyzers} from "./Utils/Analyzers.js";
export { default as Fixers } from "./Utils/FixErrors.js";
export { default as Validators } from "./Utils/Validators.js";

let value = Constants.pi/3
let sin = Math.sin(value)
let cos = Math.cos(value)
let tan = Math.tan(value)
console.log(Real.checkTerm(sin))
console.log(Real.checkTerm(cos))
console.log(Real.checkTerm(tan))
console.log(Real.checkTerm(value))