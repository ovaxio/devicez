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
      this.orientation = __bind(this.orientation, this);
      this.onResize = __bind(this.onResize, this);
      defaults = {
        breakpoints: {
          mobile: 767,
          tablet: 960
        }
      };
      this.options = extend({}, defaults, this.options);
      this.what = this.isWhat();
      this.currentOrientation = {
        name: this.orientation(),
        value: this.orientationValue()
      };
      this.defaultOrientation = (function(_this) {
        var o, wO;
        if (window.orientation == null) {
          return false;
        } else {
          wO = parseInt(window.orientation, 10);
          o = _this.orientation();
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
      this.currentOrientation = {
        name: this.orientation(),
        value: this.orientationValue()
      };
      this.what = this.isWhat();
    };

    Devicez.prototype.width = function() {
      return Math.max(document.body.scrollWidth, document.documentElement.scrollWidth, document.body.offsetWidth, document.documentElement.offsetWidth, document.body.clientWidth, document.documentElement.clientWidth);
    };

    Devicez.prototype.height = function() {
      return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
    };

    Devicez.prototype.orientation = function() {
      if (this.width() > this.height()) {
        return 'landscape';
      } else {
        return 'portrait';
      }
    };

    Devicez.prototype.isWhat = function() {
      if (this.width() <= this.options.breakpoints.mobile) {
        return 'mobile';
      } else if (this.width() <= this.options.breakpoints.tablet) {
        return 'tablet';
      } else {
        return 'desktop';
      }
    };

    Devicez.prototype.orientationValue = function() {
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
