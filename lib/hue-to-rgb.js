'use strict';

module.exports = class HueToRgb {
  constructor(/*config*/) {
    this.white = 'off';
    this.hue = 0;
    this.brightness = 0;

    this._compute();
  }

  setWhite(arg) {
    this.white = arg;
    this._compute();
  }

  setHue(arg) {
    this.hue = arg;
    this._compute();
  }

  setBrightness(arg) {
    this.brightness = arg;
    this._compute();
  }

  _compute() {
    if(this.white === 'on') {
      this.r = this.g = this.b = this.brightness;
      return;
    }

    // blue = 240deg => 0
    const hue = ((this.hue * 360 / 255) + 240) % 360;
    const { r, g, b } = hsv2rgb(hue, 1, this.brightness / 100);
    this.r = Math.round(r * 100);
    this.g = Math.round(g * 100);
    this.b = Math.round(b * 100);
  }

  // close(done) { }

  static metadata(builder) {
    const binary  = builder.enum('off', 'on');
    const percent = builder.range(0, 100);
    const hue     = builder.range(0, 255);

    builder.usage.vpanel();

    builder.attribute('r', percent);
    builder.attribute('g', percent);
    builder.attribute('b', percent);
    builder.attribute('white', binary);
    builder.attribute('hue', hue);
    builder.attribute('brightness', percent);

    builder.action('setWhite', binary);
    builder.action('setHue', hue);
    builder.action('setBrightness', percent);
  }
};

// http://en.wikipedia.org/wiki/HSL_color_space
function hsv2rgb(h, s, v) {
  h /= 60;
  const c = v * s;
  const x = c * (1 - Math.abs(h % 2 - 1));
  if(h < 1) { return { r: c, g: x, b: 0 }; }
  if(h < 2) { return { r: x, g: c, b: 0 }; }
  if(h < 3) { return { r: 0, g: c, b: x }; }
  if(h < 4) { return { r: 0, g: x, b: c }; }
  if(h < 5) { return { r: x, g: 0, b: c }; }
  if(h < 6) { return { r: c, g: 0, b: x }; }
}
