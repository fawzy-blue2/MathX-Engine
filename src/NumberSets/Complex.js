import Real from "./Real";

export default class Complex extends Real {
  constructor(real, imaginary) {
    super(real);
    this.value = {
      real: real,
      imaginary: imaginary,
    };
    this.term =
      this.value.imaginary < 0
        ? `${Complex.checkTerm(this.value.real)}${Complex.checkTerm(this.value.imaginary)}i`
        : this.value.imaginary === 0
          ? `${Complex.checkTerm(this.value.real)}`
          : this.value.imaginary > 0
            ? +this.value.real.toFixed(13) === 0
              ? `${Complex.checkTerm(this.value.imaginary)}i`
              : `${Complex.checkTerm(this.value.real)}+${Complex.checkTerm(this.value.imaginary)}i`
            : `${Complex.checkTerm(this.value.real)}+${Complex.checkTerm(this.value.imaginary)}i`;
    this.eulerForm = undefined;
    this.type = "rectangular";
    this.fraction = undefined;
  }
  toPolar() {
    if (this.type === "rectangular") {
      let r = +Math.sqrt(
        this.value.real ** 2 + this.value.imaginary ** 2,
      ).toFixed(13);
      let t = Math.atan(this.value.imaginary / this.value.real);
      this.value = {
        radius: r,
        theta: t,
      };
      this.term = `${Complex.checkTerm(r)}∠${Complex.checkTerm(t)}`;
      this.eulerForm = `${Complex.checkTerm(r)}(e^${Complex.checkTerm(t)}i)`;
      this.type = "polar";
    }
  }
  toRect() {
    if (this.type === "polar") {
      let x = +(this.value.radius * Math.cos(this.value.theta)).toFixed(13);
      let y = +(this.value.radius * Math.sin(this.value.theta)).toFixed(13);

      ((this.value = {
        real: x,
        imaginary: y,
      }),
        (this.term =
          this.value.imaginary < 0
            ? +this.value.real.toFixed(13) !== 0
              ? `${Complex.checkTerm(this.value.real)}${Complex.checkTerm(this.value.imaginary)}i`
              : `${Complex.checkTerm(this.value.imaginary)}i`
            : this.value.imaginary === 0
              ? `${Complex.checkTerm(this.value.real)}`
              : this.value.imaginary > 0
                ? +this.value.real.toFixed(13) === 0
                  ? `${Complex.checkTerm(this.value.imaginary)}i`
                  : `${Complex.checkTerm(this.value.real)}+${Complex.checkTerm(this.value.imaginary)}i`
                : `${Complex.checkTerm(this.value.real)}+${Complex.checkTerm(this.value.imaginary)}i`));
      this.fraction = undefined;
      this.eulerForm = undefined;
      this.type = "rectangular";
    }
  }
}
