const { random, floor, round, min, max, sqrt, pow, exp, E, log } = Math
const win = window as any

const R = 0
const G = 1
const B = 2
const A = 3

const stats = win.stats as HTMLElement
const canvas = win.main as HTMLCanvasElement
const rect = canvas.getBoundingClientRect()

const scale = 1
const grid = 4
const w = floor(rect.width / scale)
const h = floor(rect.height / scale)
const n = w * h

const colors_2 = ['black', 'white']

const colors_5 = ['black', 'white', 'red', 'green', 'blue']

const colors_9 = [
  'black',
  'white',
  'red',
  'orange',
  'yellow',
  'green',
  'cyan',
  'blue',
  'purple',
]

const colors = colors_2

canvas.width = w
canvas.height = h

const context = canvas.getContext('2d')!

function init() {
  for (let y = 0; y < h; y += grid) {
    for (let x = 0; x < w; x += grid) {
      context.fillStyle = colors[floor(colors.length * random())]
      context.fillRect(x, y, grid, grid)
    }
  }
}
init()

let epoch = 0
function tick() {
  epoch++
  let current = context.getImageData(0, 0, w, h)
  let next = context.getImageData(0, 0, w, h)
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let i = (y * w + x) * 4
      let r = 0
      let g = 0
      let b = 0
      let n = 0
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          let tx = x + dx
          let ty = y + dy
          if (tx < 0 || tx >= w) {
            continue
          }
          if (ty < 0 || ty >= h) {
            continue
          }
          let i = (ty * w + tx) * 4
          r += current.data[i + 0]
          g += current.data[i + 1]
          b += current.data[i + 2]
          n++
        }
      }
      next.data[i + 0] = round(r / n)
      next.data[i + 1] = round(g / n)
      next.data[i + 2] = round(b / n)
    }
  }
  context.putImageData(next, 0, 0)
  if (epoch == 1 || epoch % 10 == 0) {
    stats.textContent = epoch + ' epochs'
  }
  requestAnimationFrame(tick)
}
requestAnimationFrame(tick)
