import './style.css'

import * as THREE from 'three'
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 0.1, 100);
const eartTexture = new THREE.TextureLoader().load('map_nasa.jpg')
const eartTextureMesh = new THREE.TextureLoader().load('map_texture_nasa.jpg')
const spaceTexture = new THREE.TextureLoader().load('bg.jpg')

let lat = 47.03566827680185;
let lon = 8.173796572382669;
let apiData = 'c435402a8fa9cf6f557df3ddcf4b7139';

let weatherData = fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + apiData + '')
.then(function (response) {
	// The API call was successful!
	console.log('success!', response);
}).catch(function (err) {
	// There was an error
	console.warn('Something went wrong.', err);
});

const earth = new THREE.Mesh(
  new THREE.SphereGeometry( 15, 32, 32 ),
  new THREE.MeshStandardMaterial({
    map: eartTexture,
    normalMap: eartTextureMesh,
  }),
)

const light = new THREE.PointLight( 0xffffff );
light.position.set( 1, 2, 2);

const render = new THREE.WebGLRenderer({
  canvas: document.querySelector('canvas'),
})

render.setPixelRatio( window.devicePixelRatio );
render.setSize( window.innerWidth, window.innerHeight);
camera.position.setZ(30)

scene.background = spaceTexture;

const controls = new OrbitControls( camera, render.domElement );

function stars() {
  const geo = new THREE.SphereGeometry( .15, 20, 20 );
  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
  });
  const star = new THREE.Mesh( geo, material );

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ));
  star.position.set( x, y, z );

  scene.add(star);
}

function animate() {
  requestAnimationFrame( animate );

  // earth.rotation.x += 0.005;
  earth.rotation.y += 0.005;
  // earth.rotation.z += 0.005;

  controls.update();
  
  render.render( scene, camera, light );
}


scene.add( earth, light )
animate();
Array(500).fill().forEach( stars )