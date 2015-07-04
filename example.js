var rainbowPixels = require('rainbow-pixels')
var throttle = require('floodgate')
var convert = require('ndpixels-convert')
var through = require('through2')

var toTerminal = require('./')

var opts = {
  shape: [
    process.stdout.columns,
    process.stdout.rows,
    3
  ],
  fps: 60
}

rainbowPixels(opts)
.pipe(throttle({
  objectMode: true,
  interval: 1000 / opts.fps
}))
.pipe(convertStream('hsv', 'rgb'))
.pipe(toTerminal(opts))

function convertStream (from, to) {
  var converter = convert(from, to)
  return through.obj(function (pixels, enc, cb) {
    cb(null, converter(pixels))
  })
}
