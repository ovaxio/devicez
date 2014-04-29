'use strict'

# Required
# --------------------------------------------
events = require 'event'

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
  constructor :()->
    # Properties
    # --------------------------------------------
    @what = @isWhat() #
    @currentOrientation =
      name : @orientation()
      value : @orientationValue()

    # return the default orientation of a device
    @defaultOrientation = ((_this)->
      if !window.orientation?
        return false
      else
        wO = parseInt window.orientation, 10
        o = _this.orientation()
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
    @currentOrientation =
      name : @orientation()
      value : @orientationValue()
    @what = @isWhat()
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

  # Method orientation
  #
  #  Return landscape/portrait as the orientation of the device
  #  --------------------------------------------------------------------
  orientation :()=>
    return if @width() > @height() then 'landscape' else 'portrait'

  # Method isWhat
  #
  #  Return desktop/tablet/mobile as the type of device
  #  --------------------------------------------------------------------
  isWhat :()->
    if @width() < 768
      return 'mobile'
    else if @width() < 961
      return 'tablet'
    else
      return 'desktop'

  # Method orientationValue
  #
  #  Return the value of the property orientation of object window if present
  #  --------------------------------------------------------------------
  orientationValue : ()->
    return if window.orientation? then window.orientation else false

module.exports = Devicez

