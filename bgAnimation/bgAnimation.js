const BACKGROUND_COLOR = 0

const MIN_NOISE_DETAIL = 1
const MAX_NOISE_DETAIL = 3
const MIN_NOISE_SCALE = 0.5
const MAX_NOISE_SCALE = 1.5

const MIN_DENSITY = 10
const MAX_DENSITY = 33
const FORCED_SPACING = 75

const MIN_ANIMATION_LENGTH = 6000
const MAX_ANIMATION_LENGTH = 8000

const LINE_BRIGHTNESS = 175

let animationLength
let startTime
let lines

function setup() {
    canvas = createCanvas(window.innerWidth, window.innerHeight)
    canvas.position(0, 0)
    canvas.style('z-index', '-1')
    angleMode(DEGREES)
    
    resetAnimation()
}

function draw() {
    runAnimationTick()
}

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight)
}

function resetAnimation() {
    lines = setupLines(random(MIN_DENSITY, MAX_DENSITY))
    startTime = millis()
    animationLength = random(MIN_ANIMATION_LENGTH, MAX_ANIMATION_LENGTH)
    noiseDetail(random(MIN_NOISE_DETAIL, MAX_NOISE_DETAIL), random(MIN_NOISE_SCALE, MAX_NOISE_SCALE))
}

function runAnimationTick() {
    background(BACKGROUND_COLOR)
    
    const timePassed = millis() - startTime
    let brightness
    if (timePassed < animationLength / 2) {
        brightness = LINE_BRIGHTNESS * 2 * (timePassed / animationLength)
    } 
    else {
        brightness = LINE_BRIGHTNESS * 2 * (1 - timePassed / animationLength)
    }
    stroke(brightness)
    
    if (timePassed > animationLength) {
        resetAnimation()
    }
    
    lines.forEach(line => line.render())
}

function setupLines(density) {
    const lines = []
    
    const spacing = FORCED_SPACING //window.innerWidth / density
    
    for (let x = 0; x < window.innerWidth; x += spacing) {
        for (let y = 0; y < window.innerHeight; y += spacing) {
            const line = new Line(x, y)
            lines.push(line)
        }
    }

    return lines
}