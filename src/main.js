import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import "./style.css";

import vertex from "./shaders/vert.glsl?raw";
import fragment from "./shaders/frag.glsl?raw";
import { color } from "three/tsl";

const loader = new THREE.TextureLoader();
const texture = loader.load("./dog.jpg");
console.log(texture);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.set(0, 8, 12);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

const uniforms = {
  uTime: { value: 0.0 },
};

const geometry = new THREE.PlaneGeometry(10, 10, 64, 64);
const material = new THREE.ShaderMaterial({
  vertexShader: vertex,
  fragmentShader: fragment,
  uniforms: {
    color1: { value: new THREE.Vector4(1, 1, 0, 1) },
    color2: { value: new THREE.Vector4(0, 1, 1, 1) },
  },
  side: THREE.DoubleSide,
});

const plane = new THREE.Mesh(geometry, material);
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  controls.update();
  renderer.render(scene, camera);
}

animate();
