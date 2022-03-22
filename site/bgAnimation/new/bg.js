const getRandomParticlePos = (particleCount) => {
    const arr = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
        arr[i] = (Math.random() - 0.5) * 20
    }
    return arr
}
  
const resizeRendererToDisplaySize = (renderer) => {
    const canvas = document.getElementById("canvas")
    const width = window.innerWidth
    const height = window.innerHeight
    const needResize = canvas.width !== width || canvas.height !== height
    
    // resize
    if (needResize) renderer.setSize(window.innerWidth, window.innerHeight)
    return needResize
}

const main = () => {
    // get canvas
    const canvas = document.getElementById("canvas")
    // create renderer
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor(new THREE.Color("#000000"))
  
    // camera
    const fov = 60
    const aspect = window.innerWidth/window.innerHeight
    const near = 0.1
    const far = 50
    // create camera
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    camera.position.z = 2
    
    // scene
    const scene = new THREE.Scene()

    const geometry = new THREE.BufferGeometry()
    const noOfPoints = 2500
    geometry.setAttribute("position", new THREE.BufferAttribute(getRandomParticlePos(noOfPoints), 3))
  
    const material = new THREE.PointsMaterial({size: 0.045})
  
    // per point mesh
    const point = new THREE.Points(geometry, material)

    // add point
    scene.add(point)

    // mouse stuff
    let mouseX = 0
    let mouseY = 0

    document.addEventListener("mousemove", (event) => {
        mouseX = event.clientX
        mouseY = event.clientY
    })

    const render = () => {
        if (resizeRendererToDisplaySize(renderer)) {
            // changing the camera aspect to remove the strechy problem
            camera.aspect = canvas.width / canvas.height
            camera.updateProjectionMatrix()
        }

        // movement
        point.rotation.x += 0.00025
        point.rotation.y += 0.0
    
        // point.rotation.x = mouseY * 0.000075
        // point.rotation.y = mouseX * 0.000075
    
        point.position.x = mouseX * 0.00075
        point.position.y = mouseY * -0.00075
    
        // render the scene
        renderer.render(scene, camera)
        // loop
        requestAnimationFrame(render)
    }
    requestAnimationFrame(render)
}

main()