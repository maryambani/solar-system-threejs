import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Pane } from "tweakpane";

// initialize pane
const pane = new Pane();

// initialize the scene
const scene = new THREE.Scene();

// add textureLoader
const textureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();
cubeTextureLoader.setPath("/textures/cubeMap/");

// adding textures
const sunTexture = textureLoader.load("/textures/2k_sun.jpg");
const mercuryTexture = textureLoader.load("/textures/2k_mercury.jpg");
const venusTexture = textureLoader.load("/textures/2k_venus_surface.jpg");
const earthTexture = textureLoader.load("/textures/2k_earth_daymap.jpg");
const marsTexture = textureLoader.load("/textures/2k_mars.jpg");
const jupiterTexture = textureLoader.load("/textures/2k_jupiter.jpg");
const saturnTexture = textureLoader.load("/textures/2k_saturn_ring_alpha.png");
const saturnRingTexture = textureLoader.load("/textures/2k_saturn.jpg");
const uranusTexture = textureLoader.load("/textures/2k_uranus.jpg");
const neptuneTexture = textureLoader.load("/textures/2k_neptune.jpg");
const moonTexture = textureLoader.load("/textures/2k_moon.jpg");

const backgroundCubemap = cubeTextureLoader.load([
  "px.png",
  "nx.png",
  "py.png",
  "ny.png",
  "pz.png",
  "nz.png",
]);

scene.background = backgroundCubemap;

// add materials
const mercuryMaterial = new THREE.MeshStandardMaterial({
  map: mercuryTexture,
});
const venusMaterial = new THREE.MeshStandardMaterial({
  map: venusTexture,
});
const earthMaterial = new THREE.MeshStandardMaterial({
  map: earthTexture,
});
const marsMaterial = new THREE.MeshStandardMaterial({
  map: marsTexture,
});
const jupiterMaterial = new THREE.MeshStandardMaterial({
  map: jupiterTexture,
});
const saturnMaterial = new THREE.MeshStandardMaterial({
  map: saturnTexture,
});
const saturnRingMaterial = new THREE.MeshStandardMaterial({
  map: saturnRingTexture,
  transparent: true,
});
const uranusMaterial = new THREE.MeshStandardMaterial({
  map: uranusTexture,
});
const neptuneMaterial = new THREE.MeshStandardMaterial({
  map: neptuneTexture,
});
const moonMaterial = new THREE.MeshStandardMaterial({
  map: moonTexture,
});

// Adding meshes
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({
  map: sunTexture,
});

const sun = new THREE.Mesh(sphereGeometry, sunMaterial);
sun.scale.setScalar(5);
scene.add(sun);

// saturn's ring
const ringGeometry = new THREE.RingGeometry(1.2, 1.6, 15);
saturnRingMaterial.opacity = 0.5;
const saturnRing = new THREE.Mesh(ringGeometry, saturnRingMaterial);
saturnRing.material.side = THREE.DoubleSide;
saturnRing.rotation.x = Math.PI / 2;

const planets = [
  {
    name: "Mercury",
    radius: 0.0375,
    distance: 10,
    speed: 0.01,
    material: mercuryMaterial,
    moons: [],
  },
  {
    name: "Venus",
    radius: 0.0635,
    distance: 15,
    speed: 0.0073,
    material: venusMaterial,
    moons: [],
  },
  {
    name: "Earth",
    radius: 0.0657,
    distance: 20,
    speed: 0.0062,
    material: earthMaterial,
    moons: [
      {
        name: "Moon",
        radius: 0.124,
        distance: 1.5,
        speed: 0.028,
      },
    ],
  },
  {
    name: "Mars",
    radius: 0.0444,
    distance: 25,
    speed: 0.005,
    material: marsMaterial,
    moons: [
      {
        name: "Phobos",
        radius: 0.016,
        distance: 1.03,
        speed: 1.88,
      },
      {
        name: "Deimos",
        radius: 0.03,
        distance: 1.08,
        speed: 0.7,
      },
    ],
  },
  {
    name: "Jupiter",
    radius: 0.5029,
    distance: 30,
    speed: 0.0027,
    material: jupiterMaterial,
    moons: [
      {
        name: "Io",
        radius: 0.0285,
        distance: 1.29,
        speed: 0.042,
      },
      {
        name: "Europa",
        radius: 0.0245,
        distance: 1.49,
        speed: 0.029,
      },
      {
        name: "Ganymede",
        radius: 0.0413,
        distance: 1.72,
        speed: 0.02,
      },
      {
        name: "Callisto",
        radius: 0.0378,
        distance: 2.28,
        speed: 0.014,
      },
    ],
  },
  {
    name: "Saturn",
    radius: 0.4188,
    distance: 35,
    speed: 0.002,
    material: saturnMaterial,
    moons: [
      {
        name: "Titan",
        radius: 0.0403,
        distance: 2.22,
        speed: 0.009,
      },
      {
        name: "Rhea",
        radius: 0.0157,
        distance: 1.58,
        speed: 0.018,
      },
      {
        name: "Iapetus",
        radius: 0.0147,
        distance: 2.79,
        speed: 0.002,
      },
    ],
  },
  {
    name: "Uranus",
    radius: 0.1824,
    distance: 40,
    speed: 0.0014,
    material: uranusMaterial,
    moons: [
      {
        name: "Miranda",
        radius: 0.0212,
        distance: 1.13,
        speed: 0.049,
      },
      {
        name: "Ariel",
        radius: 0.0458,
        distance: 1.19,
        speed: 0.031,
      },
      {
        name: "Umbriel",
        radius: 0.0459,
        distance: 1.26,
        speed: 0.024,
      },
      {
        name: "Titania",
        radius: 0.08,
        distance: 1.43,
        speed: 0.018,
      },
      {
        name: "Oberon",
        radius: 0.076,
        distance: 1.58,
        speed: 0.014,
      },
    ],
  },
  {
    name: "Neptune",
    radius: 0.1773,
    distance: 45,
    speed: 0.0011,
    material: neptuneMaterial,
    moons: [
      {
        name: "Triton",
        radius: 0.0513,
        distance: 1.15,
        speed: 0.029,
      },
      {
        name: "Nereid",
        radius: 0.047,
        distance: 5.5,
        speed: 0.002,
      },
    ],
  },
];

const createPlanet = (planet) => {
  const planetMesh = new THREE.Mesh(sphereGeometry, planet.material);
  planetMesh.scale.setScalar(planet.radius);
  planetMesh.position.x = planet.distance;
  return planetMesh;
};

const createMoon = (moon) => {
  const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
  moonMesh.scale.setScalar(moon.radius);
  moonMesh.position.x = moon.distance;
  return moonMesh;
};

// Determine if a child of a planet is a moon.
function isMoon(mesh) {
  return mesh.material === moonMaterial;
}

const planetMeshes = planets.map((planet) => {
  const planetMesh = createPlanet(planet);
  scene.add(planetMesh);

  // If the planet is Saturn, add its ring
  if (planet.name === "Saturn") {
    planetMesh.add(saturnRing);
  }

  planet.moons.forEach((moon) => {
    const moonMesh = createMoon(moon);
    planetMesh.add(moonMesh);
  });
  return planetMesh;
});

console.log(planetMeshes);

// add lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 3);
scene.add(pointLight);
// initialize the camera
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  400
);
camera.position.z = 100;
camera.position.y = 5;

// initialize the renderer
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// add controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.maxDistance = 200;
controls.minDistance = 20;

function isMoon(mesh) {
  return mesh.material === moonMaterial;
}

// add resize listener
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const scalingFactor = 5;

planetMeshes.forEach((planetMesh, index) => {
  const originalRadius = planets[index].radius;
  const newScale = originalRadius * scalingFactor;
  planetMesh.scale.setScalar(newScale);
});

// render loop
const renderloop = () => {
  planetMeshes.forEach((planet, planetIndex) => {
    planet.rotation.y += planets[planetIndex].speed;
    planet.position.x =
      Math.sin(planet.rotation.y) * planets[planetIndex].distance;
    planet.position.z =
      Math.cos(planet.rotation.y) * planets[planetIndex].distance;
    planet.children.forEach((child) => {
      const moonIndex = planets[planetIndex].moons.findIndex(
        (m) => m.radius === child.scale.x
      );
      if (moonIndex !== -1) {
        child.rotation.y += planets[planetIndex].moons[moonIndex].speed;
        child.position.x =
          Math.sin(child.rotation.y) *
          planets[planetIndex].moons[moonIndex].distance;
        child.position.z =
          Math.cos(child.rotation.y) *
          planets[planetIndex].moons[moonIndex].distance;
      }
    });
  });

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();
