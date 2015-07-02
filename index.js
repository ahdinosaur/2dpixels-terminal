var through = require('through2')
var ansi = require('ansi')
var Color = require('tinycolor2')

module.exports = pixelsToTerminal

function pixelsToTerminal (opts) {
  var stdout = process.stdout
  var cursor = ansi(stdout)

  var toTerminal = function toTerminal (pixels) {
    for (var i = 0; i < pixels.shape[0]; i++) {
      for (var j = 0; j < pixels.shape[1]; j++) {
        writePixel(pixels.get(i, j))
      }
      cursor.write('\n')
    }
  }

  return through.obj(function (pixels, enc, cb) {
    cb(null, toTerminal(pixels))
  })

  function writePixel (pixel) {
    var color = Color(pixel).toHexString()

    cursor
    .hex(color)
    .write('\u2588')
  }
}
