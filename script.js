const particles = []

function setup() {
    createCanvas(window.innerWidth, window.innerHeight)
    background(200, 200, 200)

    const particlesLength = Math.floor(window.innerWidth / 10)
    console.log(particlesLength)

    for (let i = 0; i < particlesLength; i++) {
        particles.push(new Particle())
    }
}

function draw() {
    background(10, 10, 10)
    particles.forEach((particle, index) => {
        particle.update()
        particle.render()
        particle.connect(particles.slice(index))
    })
}

// Represents a particle
class Particle {
    constructor() {
        this.size = 2.5;

        this.position = createVector(random(window.innerWidth), random(window.innerHeight))
        this.velocity = createVector(random(-1, 1), random(-1, 1))
    }

    // Updates movement by adding velocity
    update() {
        this.position.add(this.velocity)
        this.bounce()
    }

    // Renders a particle
    render() {
        noStroke();
        fill('rgba(255, 255, 255, 0.2)')
        circle(this.position.x, this.position.y, this.size)
    }
    
    // Detect edges and bounce off them
    bounce() {
        if (this.position.x < 0 || this.position.x > window.innerWidth) {
            this.velocity.x *= -1
        }
        
        if (this.position.y < 0 || this.position.y > window.innerHeight) {
            this.velocity.y *= -1
        }
    }

    // Connects particles
    connect(particles) {
        particles.forEach(particle => {
            const distance = dist(this.position.x, this.position.y, particle.position.x, particle.position.y)

            if (distance < 100) {
                stroke('rgba(255, 255, 255, 0.025)')
                strokeWeight(1)
                line(this.position.x, this.position.y, particle.position.x, particle.position.y)
            }
        })
    }
}