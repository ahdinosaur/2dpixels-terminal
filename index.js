var through = require('through2')
var ansi = require('ansi')
var cwise = require('cwise')
var Color = require('tinycolor2')
var Ndarray = require('ndarray')

module.exports = pixelsToTerminal

function pixelsToTerminal (opts) {
  var stdout = process.stdout
  var cursor = ansi(stdout)

  var printColor = function printColor (color) {
    color = Color(color).toHexString()
    cursor
    .hex(color)
    //.write('O')
    .write('\u2588')
    //.write('\u2022')
  }

  /*
  var toTerminal = cwise({
    args: ['array'],
    body: function (p) {
      printColor(p)
    }
  })
  */

  var toTerminal = function toTerminal (pixels) {
    for (var i = 0; i < pixels.shape[0]; i++) {
      for (var j = 0; j < pixels.shape[1]; j++) {
        printColor(pixels.get(i, j))
      }
      cursor.write('\n')
    }
  }

  return through.obj(function (pixels, enc, cb) {
    cb(null, toTerminal(pixels))
  })
  
  /*
  return through.obj(function (2dpixels, enc, cb) {
    for (var i = 2dpixels.shape[0]; i < 2dpixe.shape[0]; i++) {
      for (var j = 2dpixels)
    }
  })
  */
}
