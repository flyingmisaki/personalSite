const LINE_THICKNESS = 3

const LOCATION_OFFSET = 100 // +-
const CURVE_SPEED = 0.001

const TRAIL_SEGMENTS = 10
const TRAIL_LENGTH = 500

// Represents a line
class Line {
    constructor(x, y) {
        this.curveSpeed = CURVE_SPEED
        this.points = [] 
        this.initialVector = createVector(x + random(-LOCATION_OFFSET, LOCATION_OFFSET), y + random(-LOCATION_OFFSET, LOCATION_OFFSET))
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
        //ellipse(point.x, point.y, this.thickness)

        this.renderTrail()
        // console.log(this.currentVector)
    }

    renderTrail() {
        if (this.points.length < 2) return

        if (this.points.length > TRAIL_LENGTH) this.points.splice(0, 1)
        
        const numberOfPoints = TRAIL_SEGMENTS

        // Getting trail points as subset of all points on line
        let trailPoints = []
        if (numberOfPoints > this.points.length) {
            trailPoints = this.points
        }
        else {
            const step = Math.ceil(this.points.length / numberOfPoints)

            for(let i = 0; i < this.points.length; i += step){
                trailPoints.push(this.points[i])
            }

            trailPoints.push(this.points[this.points.length - 1])
        }
        
        // Drawing lines between points on the trail
        for (let i = 1; i < trailPoints.length; i++) {
            const lastPoint = trailPoints[i - 1]
            const currentPoint = trailPoints[i]

            const weight = LINE_THICKNESS * i / trailPoints.length
            //const shade = 255 * i / trailPoints.length

            strokeWeight(weight)
            //stroke(shade)

            line(lastPoint.x, lastPoint.y, currentPoint.x, currentPoint.y)
        }

    }

}