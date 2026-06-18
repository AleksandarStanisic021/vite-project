import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// Uvoz šejdera kao običan tekst pomoću ?raw sufiksa
import vertex from "./shaders/vert.glsl?raw";
import fragment from "./shaders/frag.glsl?raw";

// 1. Kreiranje scene
const scene = new THREE.Scene();

// 2. Kreiranje kamere
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.set(0, 8, 12);

// 3. Kreiranje renderera
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 4. Inicijalizacija OrbitControls-a
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// 5. Definisanje uniformi koje šaljemo u šejder
const uniforms = {
  uTime: { value: 0.0 },
};

// 6. Kreiranje Plane-a sa ShaderMaterial-om
// Povećavamo segmente na 64x64 da bi talasi iz vertex šejdera izgledali glatko
const geometry = new THREE.PlaneGeometry(10, 10, 64, 64);
const material = new THREE.ShaderMaterial({
  vertexShader: vertex,
  fragmentShader: fragment,
  uniforms: uniforms,
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(geometry, material);
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

// 7. Prilagođavanje veličine ekrana (Resize)
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Sat za praćenje vremena
const clock = new THREE.Clock();

// 8. Animaciona petlja
function animate() {
  requestAnimationFrame(animate);

  // Ažuriranje vremena za šejder animaciju
  uniforms.uTime.value = clock.getElapsedTime();

  // Ažuriranje kontrola miša
  controls.update();

  renderer.render(scene, camera);
}

animate();
