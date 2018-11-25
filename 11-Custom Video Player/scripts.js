// Get Our Elements
const player = document.querySelector('.player')
const video = player.querySelector('.viewer')
const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled')
const toggle = player.querySelector('.toggle')
const skipButtons = player.querySelectorAll('[data-skip]')
const ranges = player.querySelector('.player__slider')

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

// Hook up event listeners
toggle.addEventListener('click', togglePlay)

video.addEventListener('click', togglePlay)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)

skipButtons.forEach(skipButton => skipButton.addEventListener('click', skip))
