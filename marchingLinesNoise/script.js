const DENSITY = 50
let lines

function setup() {
    createCanvas(window.innerWidth, window.innerHeight)
    background(0)
    angleMode(DEGREES)
    noiseDetail(1)
    lines = setupLines(DENSITY)
    
}

function draw() {
    //background(0)
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

// Represents a line
class Line {
    constructor(x, y) {
        this.curveSpeed = 0.001
        this.points = []
        this.initialVector = createVector(x + random(-10, 10), y + random(-10, 10))
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
        console.log(point)

        return point
    }

    render() {
        const point = this.nextPoint()
        ellipse(point.x, point.y, 2)

        // this.renderTrail()
    }

    // renderTrail() {

    //     for (let t = 0; t < this.points.length; t += 10) {
    //         let trail = this.points[t]
    //         ellipse(trail.x, trail.y, t/10)
    //     }

    //     if (this.points.length > 100) {
    //         this.points.splice(0, 1)
    //     }

    //     // if(this.points.length < 2) return
    //     // stroke(255)
    //     // strokeWeight(1)
    //     // fill(255)
    //     // const numberOfLines = 5
    //     // const step = Math.ceil(this.points.length / numberOfLines)

    //     // for (let i = 1; i < this.points.length; i += step) {
    //     //     const previousPoint = this.points[i - 1]
    //     //     const point = this.points[i]
    //     //     line(previousPoint.x, previousPoint.y, point.x, point.y)
    //     // }
    // }

}