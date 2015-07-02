var rainbowPixels = require('rainbow-pixels')
var throttle = require('floodgate')

var toTerminal = require('./')

var height = process.stdout.rows
var width = process.stdout.columns

var fps = 60

rainbowPixels({
  shape: [height, width]
})
.pipe(throttle({
  objectMode: true,
  interval: 1000 / fps
}))
.pipe(toTerminal())
