'use strict';

module.exports = class HueToRgb {
  constructor(/*config*/) {
    this.white = 'off';
    this.hue = 0;
    this.brightness = 0;
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

    // blue = 250deg => 0
    const hue = (((this.hue * 360 / 255) + 250) % 360) / 360;
    const { r, g, b } = hsl2rgb(hue, 1, this.brightness / 100);
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
// http://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
function hsl2rgb(h, s, l) {
  var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  var p = 2 * l - q;
  return {
    r: hue2rgb(p, q, h + 1/3);
    g: hue2rgb(p, q, h);
    b: hue2rgb(p, q, h - 1/3);
  };
}

function hue2rgb(p, q, t) {
  if(t < 0) t += 1;
  if(t > 1) t -= 1;
  if(t < 1/6) return p + (q - p) * 6 * t;
  if(t < 1/2) return q;
  if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
  return p;
}

