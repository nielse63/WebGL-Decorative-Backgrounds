import {
  Color, WebGLRenderer, Scene, VertexColors as vertexColors,
  Raycaster, PerspectiveCamera, Group,
  TextureLoader, Geometry, Vector3,
  BufferGeometry, BufferAttribute, ShaderMaterial,
  Points, LineBasicMaterial, LineSegments,
} from 'three';
import TweenMax from 'gsap/TweenMax';
import { getCanvas, getCanvasSize } from './utils';

const dotTextureImage = require('./images/dot-texture.png');

function network() {
  const canvas = getCanvas();
  let { width, height } = getCanvasSize();

  const colors = [
    new Color(0xac1122),
    new Color(0x96789f),
    new Color(0x535353),
  ];

  const renderer = new WebGLRenderer({
    canvas,
    antialias: true,
  });
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
  renderer.setSize(width, height);
  renderer.setClearColor(0x000000);

  const scene = new Scene();

  const raycaster = new Raycaster();
  raycaster.params.Points.threshold = 6;

  const camera = new PerspectiveCamera(50, width / height, 0.1, 2000);
  camera.position.set(0, 0, 350);

  const galaxy = new Group();
  scene.add(galaxy);

  // create dots
  const dotsAmount = 3000;
  const loader = new TextureLoader();
  loader.crossOrigin = 'Anonymous';
  const dotTexture = loader.load(dotTextureImage);
  const dotsGeometry = new Geometry();
  const positions = new Float32Array(dotsAmount * 3);
  const sizes = new Float32Array(dotsAmount);
  const colorsAttribute = new Float32Array(dotsAmount * 3);
  let dotsIndex = 0;
  while (dotsIndex < dotsAmount) {
    const vector = new Vector3();

    vector.color = Math.floor(Math.random() * colors.length);
    vector.theta = Math.random() * Math.PI * 2;
    vector.phi = (
      (1 - Math.sqrt(Math.random())) * Math.PI
    ) / (2 * (Math.random() > 0.5 ? 1 : -1));

    vector.x = Math.cos(vector.theta) * Math.cos(vector.phi);
    vector.y = Math.sin(vector.phi);
    vector.z = Math.sin(vector.theta) * Math.cos(vector.phi);
    vector.multiplyScalar(120 + ((Math.random() - 0.5) * 5));
    vector.scaleX = 5;

    if (Math.random() > 0.5) {
      moveDot(vector, dotsIndex); // eslint-disable-line no-use-before-define
    }
    dotsGeometry.vertices.push(vector);
    vector.toArray(positions, dotsIndex * 3);
    colors[vector.color].toArray(colorsAttribute, dotsIndex * 3);
    sizes[dotsIndex] = 5;
    dotsIndex += 1;
  }

  const bufferWrapGeom = new BufferGeometry();
  const attributePositions = new BufferAttribute(positions, 3);
  bufferWrapGeom.addAttribute('position', attributePositions);
  const attributeSizes = new BufferAttribute(sizes, 1);
  bufferWrapGeom.addAttribute('size', attributeSizes);
  const attributeColors = new BufferAttribute(colorsAttribute, 3);
  bufferWrapGeom.addAttribute('color', attributeColors);
  const shaderMaterial = new ShaderMaterial({
    uniforms: {
      texture: {
        value: dotTexture,
      },
    },
    vertexShader:   document.getElementById('wrapVertexShader').textContent,
    fragmentShader: document.getElementById('wrapFragmentShader').textContent,
    transparent:    true,
  });
  const wrap = new Points(bufferWrapGeom, shaderMaterial);
  scene.add(wrap);

  const segmentsGeom = new Geometry();
  const segmentsMat = new LineBasicMaterial({
    vertexColors,
    color:       0xffffff,
    transparent: true,
    opacity:     0.3,
  });

  dotsGeometry.vertices.forEach((vector1, i) => {
    dotsGeometry.vertices.forEach((vector2, j) => {
      if (i !== j && vector1.distanceTo(vector2) < 12) {
        segmentsGeom.vertices.push(vector1);
        segmentsGeom.vertices.push(vector2);
        segmentsGeom.colors.push(colors[vector1.color]);
        segmentsGeom.colors.push(colors[vector1.color]);
      }
    });
  });

  const segments = new LineSegments(segmentsGeom, segmentsMat);
  galaxy.add(segments);

  function render() {
    requestAnimationFrame(render);
    dotsGeometry.verticesNeedUpdate = true;
    segmentsGeom.verticesNeedUpdate = true;
    attributeSizes.needsUpdate = true;
    attributePositions.needsUpdate = true;
    renderer.render(scene, camera);
  }

  function moveDot(vector, index) {
    const tempVector = vector.clone();
    tempVector.multiplyScalar(((Math.random() - 0.5) * 0.2) + 1);
    TweenMax.to(vector, (Math.random() * 3) + 3, {
      x:      tempVector.x,
      y:      tempVector.y,
      z:      tempVector.z,
      yoyo:   true,
      repeat: -1,
      delay:  -(Math.random() * 3),
      ease:   window.Power0.easeNone,
      onUpdate() {
        attributePositions.array[index * 3] = vector.x;
        attributePositions.array[(index * 3) + 1] = vector.y;
        attributePositions.array[(index * 3) + 2] = vector.z;
      },
    });
  }


  function onresize() {
    canvas.style.width = '';
    canvas.style.height = '';
    width = canvas.offsetWidth;
    height = canvas.offsetHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  // let resizeTm;
  window.addEventListener('resize', onresize, false);
  requestAnimationFrame(render);
}

export default network;
