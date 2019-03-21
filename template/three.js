import '@babel/polyfill';
import * as THREE from 'three';

const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;
const ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;

const renderer = new THREE.WebGLRenderer();

renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, ASPECT, 1, 10000);
camera.position.set(0, 0, 1000);

const geometry = new THREE.BoxGeometry(250, 250, 250);
const material = new THREE.MeshPhongMaterial({color: 0xff0000});
const box = new THREE.Mesh(geometry, material);
box.position.z = -5;
scene.add(box);

const light = new THREE.DirectionalLight(0xffffff);
light.position.set(1, 1, 1);
scene.add(light);

const tick = () => {
    requestAnimationFrame(tick);
    renderer.render(scene, camera);
};
tick();
