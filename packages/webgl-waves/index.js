import {
  WebGLRenderer, Scene, PerspectiveCamera, Geometry,
  TextureLoader, IcosahedronGeometry, BufferGeometry,
  BufferAttribute, ShaderMaterial, Points,
} from 'three';
import TweenMax from 'gsap/TweenMax';
import { getCanvasSize, onresize } from '@nielse63/webgl-utils';
import dotTextureImage from '../../src/images/dot-texture.png';

export default (canvas) => {
  const { width, height } = getCanvasSize(canvas);
  const renderer = new WebGLRenderer({
    canvas,
    antialias: true,
  });
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
  renderer.setSize(width, height);
  renderer.setClearColor(0x59c384);

  const scene = new Scene();

  const camera = new PerspectiveCamera(50, width / height, 0.1, 2000);
  camera.position.set(0, 0, 80);

  const loader = new TextureLoader();
  loader.crossOrigin = 'Anonymous';
  const dotTexture = loader.load(dotTextureImage);

  const radius = 50;
  const sphereGeom = new IcosahedronGeometry(radius, 5);
  const dotsGeom = new Geometry();
  const bufferDotsGeom = new BufferGeometry();
  const positions = new Float32Array(sphereGeom.vertices.length * 3);

  function updateDot(index, vector) {
    const i3 = index * 3;
    positions[i3] = vector.x;
    positions[(i3) + 2] = vector.z;
  }

  function animateDot(index, vector) {
    TweenMax.to(vector, 4, {
      x:        0,
      z:        0,
      ease:     window.Back.easeOut,
      delay:    Math.abs(vector.y / radius) * 2,
      repeat:   -1,
      yoyo:     true,
      yoyoEase: window.Back.easeOut,
      onUpdate() {
        updateDot(index, vector);
      },
    });
  }

  {
    let i = 0;
    const { vertices } = sphereGeom;
    const { length } = vertices;
    while (i < length) {
      const vector = vertices[i];
      animateDot(i, vector);
      dotsGeom.vertices.push(vector);
      vector.toArray(positions, i * 3);
      i += 1;
    }
  }

  const attributePositions = new BufferAttribute(positions, 3);
  bufferDotsGeom.addAttribute('position', attributePositions);
  const shaderMaterial = new ShaderMaterial({
    uniforms: {
      texture: {
        value: dotTexture,
      },
    },
    vertexShader:   document.getElementById('wrapVertexShaderWaves').textContent,
    fragmentShader: document.getElementById('wrapFragmentShaderWaves').textContent,
    transparent:    true,
  });
  const dots = new Points(bufferDotsGeom, shaderMaterial);
  scene.add(dots);

  function render() {
    requestAnimationFrame(render);
    dots.geometry.verticesNeedUpdate = true;
    dots.geometry.attributes.position.needsUpdate = true;
    renderer.render(scene, camera);
  }

  window.addEventListener('resize', onresize.bind(null, canvas, camera, renderer), false);
  render();
};
