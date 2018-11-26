// Get Our Elements
const player = document.querySelector('.player')
const video = player.querySelector('.viewer')
const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled')
const toggle = player.querySelector('.toggle')
const skipButtons = player.querySelectorAll('[data-skip]')
const ranges = player.querySelectorAll('.player__slider')
const fullscreen = player.querySelector('.player__fullscreen')

// Build Out Functions
const togglePlay = () => {
    if(video.paused) {
        video.play()
    } else {
        video.pause()
    }
}

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon
}

function skip() {
    video.currentTime+= parseFloat(this.dataset.skip)
}

function handleRangeUpdate() {
    video[this.name] = this.value
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100
    progressBar.style.flexBasis = `${percent}%`
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration
    video.currentTime = scrubTime
}

function makeFullscreen() {
    video.webkitRequestFullScreen()
}

// Hook up event listeners
toggle.addEventListener('click', togglePlay)

video.addEventListener('click', togglePlay)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
video.addEventListener('timeupdate', handleProgress)

skipButtons.forEach(skipButton => skipButton.addEventListener('click', skip))

ranges.forEach(slider => slider.addEventListener('change', handleRangeUpdate))
ranges.forEach(slider => slider.addEventListener('mousemove', handleRangeUpdate))

let mouseDown = false
progress.addEventListener('click', scrub)
progress.addEventListener('mousemove', (e) => mouseDown && scrub(e))
progress.addEventListener('mousedown', () => mouseDown = true)
progress.addEventListener('mouseup', () => mouseDown = false)
progress.addEventListener('mouseout', () => mouseDown = false)

fullscreen.addEventListener('click', makeFullscreen)
