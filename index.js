var through = require('through2')
var ansi = require('ansi')
var Color = require('tinycolor2')

module.exports = pixelsToTerminal

function pixelsToTerminal (opts) {
  var stdout = process.stdout
  var cursor = ansi(stdout)

  var toTerminal = function toTerminal (pixels) {
    for (var x = 0; x < pixels.shape[0]; x++) {
      for (var y = 0; y < pixels.shape[1]; y++) {
        writePixel(x, y, pixels.get(x, y))
      }
    }
  }

  return through.obj(function (pixels, enc, cb) {
    cb(null, toTerminal(pixels))
  })

  function writePixel (x, y, color) {
    color = Color(color).toHexString()

    cursor
    .goto(opts.shape[0] - x - 1, opts.shape[1] - y - 1)
    .hex(color)
    .write('\u2588')
  }
}
