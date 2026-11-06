import { fixAproxError } from "../Utils/FixErrors.js";
import Constants from "../Utils/Constants.js";

export default class Angle {
  constructor(value) {
    this.value = value;
    this.unit = "radian";
  }
  toDegree() {
    if (this.unit == "radian") {
      let deg = (this.value * 180) / Constants.pi;
      this.value = fixAproxError(deg);
      this.unit = "degree";
    } else {
      this.value = this.value;
      this.unit = this.unit;
    }
  }
  toRadian() {
    if (this.unit == "degree") {
      let rad = (Constants.pi * this.value) / 180;
      this.value = rad;
      this.unit = "radian";
    } else {
      this.value = this.value;
      this.unit = this.unit;
    }
  }
}
