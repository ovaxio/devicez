# DeviceZ

[![Greenkeeper badge](https://badges.greenkeeper.io/ovaxio/devicez.svg)](https://greenkeeper.io/)

  Some test about your device

## Installation

  Install with [component(1)](http://component.io):

    $ component install ovaxio/devicez

## API

```
DeviceZ = require('devicez');
device = new DeviceZ();
```
### options
Default options. To change the breakpoints, just pass the new options object as param to the constructor
```
{
  "breakpoints": {
   "mobile": 767,
   "tablet": 960
}
```

### device
The device property can take 3 different values `desktop`, `tablet`, `mobile`. Calculate with the breakpoints

### orientation
The orientation property is an object that contain the orientation of the device and the integer value of it (this value is not available on desktop)
The name property of this object can be `portrait` or `landscape`
```
{
  "name": "landscape",
  "value": false
}
```

### defaultOrientation
The defaultOrientation property is not available on desktop. It can take the `portrait` or `landscape` value

### width()
Return the actual width of the viewport

### height()
Return the actual height of the viewport

### is_mobile()
Return true if the device is a mobile

### is_tablet()
Return true if the device is a tablet

### is_desktop()
Return true if the device is a desktop

## Demo
http://ovaxio.github.io/devicez/test/

## License

  The MIT License (MIT)

  Copyright (c) 2014 <copyright holders>

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
