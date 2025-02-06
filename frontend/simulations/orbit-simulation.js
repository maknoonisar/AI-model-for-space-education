// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

console.log("Orbit simulation script loaded!");

// Create a sun
const sun = new THREE.Mesh(new THREE.SphereGeometry(2), new THREE.MeshBasicMaterial({ color: 0xFFFF00 }));
scene.add(sun);

// Create Earth and its orbit around the Sun
const earth = new THREE.Mesh(new THREE.SphereGeometry(0.5), new THREE.MeshBasicMaterial({ color: 0x0000FF }));
scene.add(earth);

// Position the camera
camera.position.z = 10;

// Declare the angle variable globally, before it's used in animate()
let angle = 0;
let earthOrbitRadius = 5; // Earth's orbit radius

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Increase the angle to animate the rotation and orbit
    angle += 0.01;

    // Rotate the sun
    sun.rotation.y += 0.01;

    // Move Earth in orbit around the sun
    earth.position.x = earthOrbitRadius * Math.cos(angle);
    earth.position.z = earthOrbitRadius * Math.sin(angle);

    // Optionally rotate Earth around its axis
    earth.rotation.y += 0.02;

    // Render the scene
    renderer.render(scene, camera);
}

animate();
