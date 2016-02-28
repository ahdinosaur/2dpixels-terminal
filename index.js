const through = require('through2')
const ansi = require('ansi')
const Color = require('color')
const asyncMap = require('pull-stream/throughs').asyncMap

module.exports = pixelsToTerminal

function pixelsToTerminal (opts) {
  var stdout = process.stdout
  var cursor = ansi(stdout)

  var toTerminal = function toTerminal (pixels) {
    for (var x = 0; x < pixels.shape[0]; x++) {
      for (var y = 0; y < pixels.shape[1]; y++) {
        //console.log("pixel", x, y, pixels.pick(x, y, null).size)
        writePixel(x, y, pixels.pick(x, y, null))
      }
    }
  }

  return asyncMap(function (pixels, cb) {
    cb(null, toTerminal(pixels))
  })

  function writePixel (x, y, rgb) {
    cursor
    .goto(opts.shape[0] - x - 1, opts.shape[1] - y - 1)
    .rgb(rgb.get(0), rgb.get(1), rgb.get(2))
    .write('\u2588')
  }
}
