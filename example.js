var rainbowPixels = require('rainbow-pixels')
var throttle = require('floodgate')

var toTerminal = require('./')

var opts = {
  shape: [
    process.stdout.columns,
    process.stdout.rows
  ],
  fps: 60
}

rainbowPixels(opts)
.pipe(throttle({
  objectMode: true,
  interval: 1000 / opts.fps
}))
.pipe(toTerminal(opts))
