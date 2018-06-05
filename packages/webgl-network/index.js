import {
  Color, WebGLRenderer, Scene, VertexColors as vertexColors,
  Raycaster, PerspectiveCamera, Group,
  TextureLoader, Geometry, Vector3,
  BufferGeometry, BufferAttribute, ShaderMaterial,
  Points, LineBasicMaterial, LineSegments,
} from 'three';
import { TweenLite } from 'gsap';
import { getCanvasSize, onresize, dotTextureImage } from '@nielse63/webgl-utils';

export default (canvas) => {
  const { width, height } = getCanvasSize(canvas);
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
  {
    let i = 0;
    while (i < dotsAmount) {
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
        moveDot(vector, i); // eslint-disable-line no-use-before-define
      }
      dotsGeometry.vertices.push(vector);
      vector.toArray(positions, i * 3);
      colors[vector.color].toArray(colorsAttribute, i * 3);
      sizes[i] = 5;
      i += 1;
    }
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
    vertexShader:   document.getElementById('wrapVertexShaderNetwork').textContent,
    fragmentShader: document.getElementById('wrapFragmentShaderNetwork').textContent,
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

  {
    let i = 0;
    const { vertices } = dotsGeometry;
    const { length } = vertices;
    while (i < length) {
      const v1 = vertices[i];
      const color = colors[v1.color];
      let j = 0;
      while (j < length) {
        const v2 = vertices[j];
        if (i !== j && v1.distanceTo(v2) < 12) {
          segmentsGeom.vertices.push(v1);
          segmentsGeom.vertices.push(v2);
          segmentsGeom.colors.push(color);
          segmentsGeom.colors.push(color);
        }
        j += 1;
      }
      i += 1;
    }
  }

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

  function onComplete() {
    this.reversed(!this.reversed());
  }

  function moveDot(vector, index) {
    const tempVector = vector.clone();
    tempVector.multiplyScalar(((Math.random() - 0.5) * 0.2) + 1);
    TweenLite.to(vector, (Math.random() * 3) + 3, {
      x:                 tempVector.x,
      y:                 tempVector.y,
      z:                 tempVector.z,
      repeat:            -1,
      delay:             -(Math.random() * 3),
      ease:              window.Power0.easeNone,
      onComplete,
      onReverseComplete: onComplete,
      onUpdate() {
        attributePositions.array[index * 3] = vector.x;
        attributePositions.array[(index * 3) + 1] = vector.y;
        attributePositions.array[(index * 3) + 2] = vector.z;
      },
    });
  }

  // let resizeTm;
  window.addEventListener('resize', onresize.bind(null, canvas, camera, renderer), false);
  render();
};
