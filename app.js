const cols = document.querySelectorAll('.item-col')

document.addEventListener('keydown', (event) => {
  event.preventDefault()
  if (event.code.toLowerCase() == 'space') {
    setRandomColors()
  }
})

document.addEventListener('click', (event) => {
  const element = event.target
  if (element.closest('[data-type="lock"]')) {
    const buttonIcon = element.closest('[data-type="lock"]').children[0]
    buttonIcon.classList.toggle('fa-lock-open')
    buttonIcon.classList.toggle('fa-lock')
  } else if (element.closest('[data-type="copy"]')) {
    const copyText = element.closest('[data-type="copy"]').children[1]
    copyText.classList.add('active')
    setTimeout(() => {
      copyText.classList.remove('active')
    }, 1500)
    copyToClickboard(element.textContent)
  }
})

function copyToClickboard(text) {
  return navigator.clipboard.writeText(text)
}

function setRandomColors(isInitial) {
  let colors = isInitial ? getColorsFromHash() : []
  cols.forEach((col, index) => {
    const isLocked = col.querySelector('i').classList.contains('fa-lock')
    if (isLocked) return
    else {
      const text = col.querySelector('h2 span')
      const buttonLock = col.querySelector('button')
      const color = isInitial 
      ? colors[index]
        ? colors[index] : chroma.random()
      : chroma.random()

      if (!isInitial) colors.push(color)
    
      text.textContent = color
      col.style.background = color

      const luminance = chroma(color).luminance()
      col.style.color = luminance > 0.5 ? 'black' : 'white'
    }
  })
  updateColorsHash(colors)
}

function updateColorsHash(colors = []) {
  document.location.hash = colors
    .map((col) => col.toString().substring(1))
    .join('-')
}

function getColorsFromHash() {
  if (document.location.hash.length > 1) {
    return document.location.hash
      .substring(1)
      .split('-')
      .map((color) => '#' + color)
  }
  return []
}
setRandomColors(true)