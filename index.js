var through = require('through2')
var ansi = require('ansi')
var Color = require('color')

module.exports = pixelsToTerminal

function pixelsToTerminal (opts) {
  var stdout = process.stdout
  var cursor = ansi(stdout)

  var toTerminal = function toTerminal (pixels) {
    for (var x = 0; x < pixels.shape[0]; x++) {
      for (var y = 0; y < pixels.shape[1]; y++) {
        writePixel(x, y, pixels.pick(x, y, null))
      }
    }
  }

  return through.obj(function (pixels, enc, cb) {
    cb(null, toTerminal(pixels))
  })

  function writePixel (x, y, rgb) {
    cursor
    .goto(opts.shape[0] - x - 1, opts.shape[1] - y - 1)
    .rgb(rgb.get(0), rgb.get(1), rgb.get(2))
    .write('\u2588')
  }
}
