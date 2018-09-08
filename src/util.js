export function whatColor (rgb) {
  let r = parseInt(rgb.slice(0, 2), 16)
  let g = parseInt(rgb.slice(2, 4), 16)
  let b = parseInt(rgb.slice(4, 6), 16)
  var min = Math.min(r, g, b),
    max = Math.max(r, g, b),
    diff = max - min,
    h = 0
  if (diff != 0) {
    h =
      (r == max
        ? (g - b) / diff
        : g == max
          ? 2 + (b - r) / diff
          : 4 + (r - g) / diff) * 60
  }
  if ((r + g + b) / 3 > 220) {
    return 'white'
  } else if ((r + g + b) / 3 < 30) {
    return 'black'
  } else if (h >= 330 || h <= 30) {
    return 'red'
  } else if (h >= 30 && h <= 90) {
    return 'yellow'
  } else if (h >= 90 && h <= 150) {
    return 'green'
  } else if (h >= 150 && h <= 210) {
    return 'cyan'
  } else if (h >= 210 && h <= 270) {
    return 'blue'
  } else if (h >= 270 && h <= 330) {
    return 'purple'
  }
}

export function calFontColor (rgb) {
  if (!rgb) return
  let r = parseInt(rgb.slice(0, 2), 16)
  let g = parseInt(rgb.slice(2, 4), 16)
  let b = parseInt(rgb.slice(4, 6), 16)
  if ((r + g + b) / 3 < 128) {
    return 'bright'
  } else {
    return 'dark'
  }
}

export function hex2rgb (hex) {
  if (!hex) return
  let r = parseInt(hex.slice(0, 2), 16)
  let g = parseInt(hex.slice(2, 4), 16)
  let b = parseInt(hex.slice(4, 6), 16)
  return [r, g, b]
}
