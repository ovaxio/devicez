'use strict'
# Emitter = require 'emitter'
events = require 'event'
# emitter = new Emitter()

inverse = (orientation)->
  return if orientation is 'portrait' then 'landscape' else 'portrait'

class Devicez
  constructor :()->
    @currentOrientation = @orientation()
    @what = @isWhat()
    # emitter.on 'changeOrientation', @changeOrientation
    events.bind window, 'resize', @onResize

    # return the default orientation of a device
    # need the window.orientation variable
    @defaultOrientation = (()->
      if !window.orientation?
        return null
      wO = window.orientation
      o = @orientation()

      return if (wO is 0 or wO is 180) then o else @inverse(o)
      )()

  #  on resize window, trigger the changeOrientation
  onResize :()=>
    # emitter.emit 'changeOrientation'
    @currentOrientation = @orientation()
    @what = @isWhat()
  # changeOrientation :()=>
    # @currentOrientation = @orientation()

  width :()->
    return Math.max(
      document.body.scrollWidth, document.documentElement.scrollWidth,
      document.body.offsetWidth, document.documentElement.offsetWidth,
      document.body.clientWidth, document.documentElement.clientWidth
    )

  height :()->
    return Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    )

  orientation :()=>
    return if @width() > @height() then 'landscape' else 'portrait'

  isWhat :()->
    if @width() < 768
      return 'mobile'
    else if @width() < 961
      return 'tablet'
    else
      return 'desktop'


module.exports = Devicez

