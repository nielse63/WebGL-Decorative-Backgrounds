import {
  Scene, PerspectiveCamera, Geometry, TextureLoader,
  IcosahedronGeometry, BufferGeometry,
  BufferAttribute, Points,
} from 'three';
import { TweenLite } from 'gsap';
import {
  getCanvasSize, onresize, dotTextureImage,
  createRenderer, createShaderMaterial,
} from '@nielse63/webgl-utils';

export default (canvas) => {
  const { width, height } = getCanvasSize(canvas);
  const renderer = createRenderer(canvas, 0x59c384);

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

  function onComplete() {
    this.reversed(!this.reversed());
  }

  function animateDot(index, vector) {
    TweenLite.to(vector, 4, {
      x:                 0,
      z:                 0,
      ease:              window.Back.easeOut,
      delay:             Math.abs(vector.y / radius) * 2,
      repeat:            -1,
      onComplete,
      onReverseComplete: onComplete,
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
  const shaderMaterial = createShaderMaterial(
    'wrapVertexShaderWaves',
    'wrapFragmentShaderWaves',
    dotTexture,
  );
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
