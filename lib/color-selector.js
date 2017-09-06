'use strict';

module.exports = class ColorSelector {
  constructor(config) {

    this._color0 = config.color0;
    this._color1 = config.color1;
    this._color2 = config.color2;
    this._color3 = config.color3;
    this._color4 = config.color4;
    this._color5 = config.color5;
    this._color6 = config.color6;
    this._color7 = config.color7;
    this._color8 = config.color8;
    this._color9 = config.color9;

    this.color = this._color0;
  }

  _setColor(x, arg) {
    if(arg === 'off') { return; }
    this.color = this['_color' + x];
  }

  set0(arg) { this._setColor(0, arg); }
  set1(arg) { this._setColor(1, arg); }
  set2(arg) { this._setColor(2, arg); }
  set3(arg) { this._setColor(3, arg); }
  set4(arg) { this._setColor(4, arg); }
  set5(arg) { this._setColor(5, arg); }
  set6(arg) { this._setColor(6, arg); }
  set7(arg) { this._setColor(7, arg); }
  set8(arg) { this._setColor(8, arg); }
  set9(arg) { this._setColor(9, arg); }

  // close(done) { }

  static metadata(builder) {
    const binary = builder.enum('off', 'on');
    const color  = builder.range(0, 16777215);

    builder.usage.vpanel();

    builder.attribute('color', color);

    builder.action('set0', binary);
    builder.action('set1', binary);
    builder.action('set2', binary);
    builder.action('set3', binary);
    builder.action('set4', binary);
    builder.action('set5', binary);
    builder.action('set6', binary);
    builder.action('set7', binary);
    builder.action('set8', binary);
    builder.action('set9', binary);

    builder.config('color0', 'integer');
    builder.config('color1', 'integer');
    builder.config('color2', 'integer');
    builder.config('color3', 'integer');
    builder.config('color4', 'integer');
    builder.config('color5', 'integer');
    builder.config('color6', 'integer');
    builder.config('color7', 'integer');
    builder.config('color8', 'integer');
    builder.config('color9', 'integer');
  }
};
