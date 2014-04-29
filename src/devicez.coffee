'use strict'

# Required
# --------------------------------------------
events = require 'event'
extend = require 'extend'

# Private
# --------------------------------------------
inverse = (orientation)->
  return if orientation is 'portrait' then 'landscape' else 'portrait'


#***********************************************************#
#                                                           #
#                      Class Devicez                        #
#                                                           #
#***********************************************************#
class Devicez

  # constructor
  #
  # --------------------------------------------------------------------
  constructor :(@options)->
    # Properties
    # --------------------------------------------
    defaults =
      breakpoints :
        mobile : 767
        tablet : 960

    @options = extend {}, defaults, @options

    @device = @getDevice()
    @orientation =
      name : @getOrientation()
      value : @getOrientationValue()

    # return the default orientation of a device
    @defaultOrientation = ((_this)->
      if !window.orientation?
        return false
      else
        wO = parseInt window.orientation, 10
        o = _this.getOrientation()
        return if (wO is 0 or wO is 180) then o else inverse(o)
      )(@)


    # events
    # --------------------------------------------
    events.bind window, 'resize', @onResize

  # Method onResize
  #
  #  on resize window, trigger the changeOrientation
  #  --------------------------------------------------------------------
  onResize :()=>
    # emitter.emit 'changeOrientation'
    @orientation =
      name : @getOrientation()
      value : @getOrientationValue()
    @device = @getDevice()
    return

  # Method width
  #
  #  Calculate the width of the viewport
  #  --------------------------------------------------------------------
  width :()->
    return Math.max(
      document.body.scrollWidth, document.documentElement.scrollWidth,
      document.body.offsetWidth, document.documentElement.offsetWidth,
      document.body.clientWidth, document.documentElement.clientWidth
    )

  # Method height
  #
  #  Calculate the height of the viewport
  #  --------------------------------------------------------------------
  height :()->
    return Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    )

  # Method isWhat
  #
  #  Return desktop/tablet/mobile as the type of device
  #  --------------------------------------------------------------------
  getDevice :()->
    if @width() <= @options.breakpoints.mobile
      return 'mobile'
    else if @width() <= @options.breakpoints.tablet
      return 'tablet'
    else
      return 'desktop'

  is_mobile :()->
    return @device is 'mobile'

  is_tablet :()->
    return @device is 'tablet'

  is_desktop :()->
    return @device is 'desktop'

  # Method orientation
  #
  #  Return landscape/portrait as the orientation of the device
  #  --------------------------------------------------------------------
  getOrientation :()=>
    return if @width() > @height() then 'landscape' else 'portrait'

  # Method orientationValue
  #
  #  Return the value of the property orientation of object window if present
  #  --------------------------------------------------------------------
  getOrientationValue :()->
    return if window.orientation? then window.orientation else false

module.exports = Devicez

