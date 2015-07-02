# 2dpixels-terminal

display a 2-dimensional [ndarray](https://npmjs.org/ndarray) of [colors](https://npmjs.org/colors) in the terminal

## install

with [npm](https://npmjs.org), do:

```
npm i --save 2dpixels-terminal
```

## usage

```
var rainbowPixels = require('rainbow-pixels')
var toTerminal = require('2dpixels-terminal')

var height = process.stdout.rows
var width = process.stdout.columns

rainbowPixels({
  shape: [height, width]
})
.pipe(toTerminal())
```

## license

ISC
