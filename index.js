(function() {
  'use strict';
  var Devicez, events, inverse,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  events = require('event');

  inverse = function(orientation) {
    if (orientation === 'portrait') {
      return 'landscape';
    } else {
      return 'portrait';
    }
  };

  Devicez = (function() {
    function Devicez() {
      this.orientation = __bind(this.orientation, this);
      this.onResize = __bind(this.onResize, this);
      this.currentOrientation = this.orientation();
      this.what = this.isWhat();
      events.bind(window, 'resize', this.onResize);
      this.defaultOrientation = (function() {
        var o, wO;
        if (window.orientation == null) {
          return null;
        }
        wO = window.orientation;
        o = this.orientation();
        if (wO === 0 || wO === 180) {
          return o;
        } else {
          return this.inverse(o);
        }
      })();
    }

    Devicez.prototype.onResize = function() {
      this.currentOrientation = this.orientation();
      return this.what = this.isWhat();
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
      if (this.width() < 768) {
        return 'mobile';
      } else if (this.width() < 961) {
        return 'tablet';
      } else {
        return 'desktop';
      }
    };

    return Devicez;

  })();

  module.exports = Devicez;

}).call(this);
