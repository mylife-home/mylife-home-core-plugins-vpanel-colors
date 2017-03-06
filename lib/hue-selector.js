'use strict';

module.exports = class HueSelector {
  constructor(config) {

    this._hue0 = config.hue0;
    this._hue1 = config.hue1;
    this._hue2 = config.hue2;
    this._hue3 = config.hue3;
    this._hue4 = config.hue4;
    this._hue5 = config.hue5;
    this._hue6 = config.hue6;
    this._hue7 = config.hue7;
    this._hue8 = config.hue8;
    this._hue9 = config.hue9;

    this.hue = this._hue0;
    this.white = 'off';
  }

  _setHue(x, arg) {
    if(arg === 'off') { return; }
    this.white = 'off';
    this.hue = this['_hue' + x];
  }

  setWhite(arg) {
    if(arg === 'off') { return; }
    this.white = 'on';
  }

  set0(arg) { this._setHue(0, arg); }
  set1(arg) { this._setHue(1, arg); }
  set2(arg) { this._setHue(2, arg); }
  set3(arg) { this._setHue(3, arg); }
  set4(arg) { this._setHue(4, arg); }
  set5(arg) { this._setHue(5, arg); }
  set6(arg) { this._setHue(6, arg); }
  set7(arg) { this._setHue(7, arg); }
  set8(arg) { this._setHue(8, arg); }
  set9(arg) { this._setHue(9, arg); }

  // close(done) { }

  static metadata(builder) {
    const binary  = builder.enum('off', 'on');
    const percent = builder.range(0, 100);
    const hue     = builder.range(0, 255);

    builder.usage.vpanel();

    builder.attribute('hue', hue);
    builder.attribute('white', binary);

    builder.action('setWhite', binary);

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

    builder.config('hue0', 'integer');
    builder.config('hue1', 'integer');
    builder.config('hue2', 'integer');
    builder.config('hue3', 'integer');
    builder.config('hue4', 'integer');
    builder.config('hue5', 'integer');
    builder.config('hue6', 'integer');
    builder.config('hue7', 'integer');
    builder.config('hue8', 'integer');
    builder.config('hue9', 'integer');
  }
};
