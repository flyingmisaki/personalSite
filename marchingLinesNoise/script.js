const points = []
const speed = 0.001

function setup() {
    createCanvas(window.innerWidth, window.innerHeight)
    background(20)
    angleMode(DEGREES)
    noiseDetail(3)

    var density = 50
    var spacing = window.innerWidth / density

    // Create a vector for each of the x, y coords
    for (var x = 0; x < window.innerWidth; x += spacing) {
        for (var y = 0; y < window.innerHeight; y += spacing) {
            var point = createVector(x + random(-10, 10), y + random(-10, 10))
            points.push(point)
        }
    }
}

function draw() {
    noStroke()
    fill(255)

    for (var i = 0; i < points.length; i++) {
        
        // Angle at which each point moves towards
        var angle = map(noise(points[i].x * speed, points[i].y * speed), 0, 1, 0, 720)

        // Add vector to each point based on angle variable
        points[i].add(createVector(cos(angle), sin(angle)))
        
        // Ellipse at the x, y coords of each point
        ellipse(points[i].x, points[i].y, 1)
    }
}