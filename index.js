(function() {
  'use strict';
  var Devicez, Emitter, emitter, events,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Emitter = require('emitter');

  events = require('event');

  emitter = new Emitter();

  Devicez = (function() {
    function Devicez() {
      this.orientation = __bind(this.orientation, this);
      this.changeOrientation = __bind(this.changeOrientation, this);
      this.currentOrientation = this.orientation();
      emitter.on('changeOrientation', this.changeOrientation);
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
      return emitter.emit('changeOrientation');
    };

    Devicez.prototype.changeOrientation = function() {
      return this.currentOrientation = this.orientation();
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

    Devicez.prototype.inverse = function(orientation) {
      if (orientation === 'portrait') {
        return 'landscape';
      } else {
        return 'portrait';
      }
    };

    return Devicez;

  })();

  module.exports = Devicez;

}).call(this);
