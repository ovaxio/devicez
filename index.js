(function() {
  'use strict';
  var Devicez, events, extend, inverse,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  events = require('event');

  extend = require('extend');

  inverse = function(orientation) {
    if (orientation === 'portrait') {
      return 'landscape';
    } else {
      return 'portrait';
    }
  };

  Devicez = (function() {
    function Devicez(options) {
      var defaults;
      this.options = options;
      this.getOrientation = __bind(this.getOrientation, this);
      this.onResize = __bind(this.onResize, this);
      defaults = {
        breakpoints: {
          mobile: 767,
          tablet: 960
        }
      };
      this.options = extend({}, defaults, this.options);
      this.device = this.getDevice();
      this.orientation = {
        name: this.getOrientation(),
        value: this.getOrientationValue()
      };
      this.defaultOrientation = (function(_this) {
        var o, wO;
        if (window.orientation == null) {
          return false;
        } else {
          wO = parseInt(window.orientation, 10);
          o = _this.getOrientation();
          if (wO === 0 || wO === 180) {
            return o;
          } else {
            return inverse(o);
          }
        }
      })(this);
      events.bind(window, 'resize', this.onResize);
    }

    Devicez.prototype.onResize = function() {
      this.orientation = {
        name: this.getOrientation(),
        value: this.getOrientationValue()
      };
      this.device = this.getDevice();
    };

    Devicez.prototype.width = function() {
      return Math.max(document.body.scrollWidth, document.documentElement.scrollWidth, document.body.offsetWidth, document.documentElement.offsetWidth, document.body.clientWidth, document.documentElement.clientWidth);
    };

    Devicez.prototype.height = function() {
      return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
    };

    Devicez.prototype.getDevice = function() {
      if (this.width() <= this.options.breakpoints.mobile) {
        return 'mobile';
      } else if (this.width() <= this.options.breakpoints.tablet) {
        return 'tablet';
      } else {
        return 'desktop';
      }
    };

    Devicez.prototype.is_mobile = function() {
      return this.device === 'mobile';
    };

    Devicez.prototype.is_tablet = function() {
      return this.device === 'tablet';
    };

    Devicez.prototype.is_desktop = function() {
      return this.device === 'desktop';
    };

    Devicez.prototype.getOrientation = function() {
      if (this.width() > this.height()) {
        return 'landscape';
      } else {
        return 'portrait';
      }
    };

    Devicez.prototype.getOrientationValue = function() {
      if (window.orientation != null) {
        return window.orientation;
      } else {
        return false;
      }
    };

    return Devicez;

  })();

  module.exports = Devicez;

}).call(this);
