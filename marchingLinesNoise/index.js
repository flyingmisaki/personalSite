const DENSITY = 25
const NOISE_DETAIL = 1
const NOISE_SCALE = 1

let lines

// https://www.sliderrevolution.com/resources/css-animated-background/

function setup() {
    createCanvas(window.innerWidth, window.innerHeight)
    background(0)
    angleMode(DEGREES)
    noiseDetail(NOISE_DETAIL, NOISE_SCALE)
    lines = setupLines(DENSITY)
    
}

function draw() {
    background(0)
    noStroke()

    lines.forEach(line => line.render())
}

function setupLines(density) {
    const lines = []

    const spacing = window.innerWidth / density
    
    for (let x = 0; x < window.innerWidth; x += spacing) {
        for (let y = 0; y < window.innerHeight; y += spacing) {
            const line = new Line(x, y)
            lines.push(line)
        }
    }

    return lines
}