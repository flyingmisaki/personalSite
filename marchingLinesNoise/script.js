const DENSITY = 50
let lines

function setup() {
    createCanvas(window.innerWidth, window.innerHeight)
    background(0)
    angleMode(DEGREES)
    noiseDetail(2)
    lines = setupLines(DENSITY)
    
}

function draw() {
    noStroke()
    fill(255)

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

class Line {
    constructor(x, y) {
        this.curveSpeed = 0.001
        this.points = []
        this.startX = x
        this.startY = y
        this.initialVector = createVector(x + random(-1, 1), y + random(-1, 1))
        this.currentVector = this.initialVector.copy()
    }

    nextPoint() {
        // Angle at which each point moves towards
        const angle = map(noise(this.currentVector.x * this.curveSpeed, this.currentVector.y * this.curveSpeed), 0, 1, 0, 720)

        // Add vector to each point based on angle variable
        this.currentVector.add(createVector(cos(angle), sin(angle)))

        // Get a point using the current x, y of the vector
        const point = {x: this.currentVector.x, y: this.currentVector.y}
        this.points.push(point)

        return point
    }

    render() {
        const point = this.nextPoint()
        ellipse(point.x, point.y, 1)
    }
}