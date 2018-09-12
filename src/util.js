export function throttle (fn, mustRun = 60) {
  let previous = null
  return function () {
    const now = new Date()
    // const context = this
    const args = arguments
    if (!previous) {
      previous = 0
    }
    const remaining = now - previous
    if (mustRun && remaining >= mustRun) {
      fn.apply(args)
      previous = now
    }
  }
}

export function isInSight (el) {
  const bound = el.getBoundingClientRect()
  const clientHeight = window.innerHeight
  return bound.top <= clientHeight + 100
}

export function checkInSightInit (operate) {
  return () => {
    const imgs = document.querySelectorAll('.js-tab-item')
    let initialEl = []
    Array.from(imgs).forEach(el => {
      if (!el.isShow && isInSight(el)) {
        initialEl.push(el)
        el.isShow = true
      }
    })
    operate(initialEl)
  }
}

export function checkInSight (operate) {
  return () => {
    const imgs = document.querySelectorAll('.js-tab-item')
    Array.from(imgs).forEach(el => {
      if (!el.isShow && isInSight(el)) {
        operate(el)
        el.isShow = true
      }
    })
  }
}

export function clipboardCopy (text) {
  // Use the Async Clipboard API when available
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(text)
  }

  // ...Otherwise, use document.execCommand() fallback

  // Put the text to copy into a <span>
  var span = document.createElement('span')
  span.textContent = text

  // Preserve consecutive spaces and newlines
  span.style.whiteSpace = 'pre'

  // An <iframe> isolates the <span> from the page's styles
  var iframe = document.createElement('iframe')
  iframe.sandbox = 'allow-same-origin'

  // Add the <iframe> to the page
  document.body.appendChild(iframe)
  var win = iframe.contentWindow

  // Add the <span> to the <iframe>
  win.document.body.appendChild(span)

  // Get a Selection object representing the range of text selected by the user
  var selection = win.getSelection()

  // Fallback for Firefox which fails to get a selection from an <iframe>
  if (!selection) {
    win = window
    selection = win.getSelection()
    document.body.appendChild(span)
  }

  var range = win.document.createRange()
  selection.removeAllRanges()
  range.selectNode(span)
  selection.addRange(range)

  var success = false
  try {
    success = win.document.execCommand('copy')
  } catch (err) {}

  selection.removeAllRanges()
  win.document.body.removeChild(span)
  document.body.removeChild(iframe)

  // The Async Clipboard API returns a promise that may reject with `undefined` so we
  // match that here for consistency.
  return success
    ? Promise.resolve()
    : Promise.reject() // eslint-disable-line prefer-promise-reject-errors
}

export function whatColor (rgb) {
  let r = parseInt(rgb.slice(0, 2), 16)
  let g = parseInt(rgb.slice(2, 4), 16)
  let b = parseInt(rgb.slice(4, 6), 16)
  var min = Math.min(r, g, b)
  var max = Math.max(r, g, b)
  var diff = max - min
  var h = 0
  if (diff !== 0) {
    h =
      (r === max
        ? (g - b) / diff
        : g === max
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
