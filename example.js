const rainbowPixels = require('rainbow-pixels')
const pull = require('pull-stream')
const convert = require('ndpixels-convert')
const map = require('pull-stream/throughs').map
const asyncMap = require('pull-stream/throughs').asyncMap
const drain = require('pull-stream/sinks').drain
const raf = require('raf')

var toTerminal = require('./')

var opts = {
  shape: [
    process.stdout.columns,
    process.stdout.rows
  ]
}

pull(
  rainbowPixels(opts),
  converter('hsv', 'rgb'),
  animator(),
  toTerminal(opts),
  drain()
)

function animator () {
  var clean = true
  return asyncMap(function (pixels, cb) {
    if (clean) {
      raf(function () {
        cb(null, pixels)
      })
    }
  })
}

function converter (from, to) {
  var converter = convert(from, to)
  return map(function (pixels) {
    return converter(pixels)
  })
}
