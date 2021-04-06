const lines = []
const speed = 0.001

function setup() {
    createCanvas(window.innerWidth, window.innerHeight)
    background(20)
    angleMode(DEGREES)
    noiseDetail(random(2))

    var density = 50
    var spacing = window.innerWidth / density

    // Create a vector for each of the x, y coords
    for (var x = 0; x < window.innerWidth; x += spacing) {
        for (var y = 0; y < window.innerHeight; y += spacing) {
            var point = createVector(x + random(-1, 1), y + random(-1, 1))
            lines.push(point)
        }
    }
}

function draw() {
    noStroke()
    fill(255)

    for (var i = 0; i < lines.length; i++) {
        
        // Angle at which each point moves towards
        var angle = map(noise(lines[i].x * speed, lines[i].y * speed), 0, 1, 0, 720)

        // Add vector to each point based on angle variable
        lines[i].add(createVector(cos(angle), sin(angle)))
        
        // Ellipse at the x, y coords of each point
        ellipse(lines[i].x, lines[i].y, 1)
    }
}