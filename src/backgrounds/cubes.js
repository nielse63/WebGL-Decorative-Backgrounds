import {
  Vector3, WebGLRenderer, Scene,
  PerspectiveCamera, BoxGeometry, MeshBasicMaterial,
  Mesh, DoubleSide,
} from 'three';
import noise from '@/noise';
import { getCanvasSize, onresize } from '@/utils';

// eslint-disable-next-line complexity
function setFaceVector(geometry, face, segments) {
  const v1 = geometry.vertices[face.a];
  const v2 = geometry.vertices[face.b];
  const v3 = geometry.vertices[face.c];
  const center = new Vector3();
  center.add(v1).add(v2).add(v3).divideScalar(3);
  face.materialIndex = Math.floor(center.y + 25) % (segments * 2) < segments ? 0 : 1;
  if (center.y === 24.5) {
    face.materialIndex = 0;
  }
  if (face.materialIndex === 0) {
    face.materialIndex = Math.floor(center.x + 25) % (segments * 2) < segments ? 0 : 1;
    if (center.x === 24.5) {
      face.materialIndex = 0;
    }
  }
}

export default (canvas) => {
  const { width, height } = getCanvasSize(canvas);
  const renderer = new WebGLRenderer({
    canvas,
    antialias: true,
  });
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
  renderer.setSize(width, height);
  renderer.setClearColor(0x0F1617);

  const scene = new Scene();
  const camera = new PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.set(0, 0, 100);

  const segments = 7;
  const geometry = new BoxGeometry(49, 49, 49, segments, segments, segments);
  geometry.faces.forEach((face) => {
    setFaceVector(geometry, face, segments);
  });
  geometry.vertices.forEach((vector) => {
    vector.clone = new Vector3().copy(vector);
  });

  const material = [
    new MeshBasicMaterial({
      color:       0x000000,
      transparent: true,
      opacity:     0,
    }),
    new MeshBasicMaterial({
      color:     0x13756a,
      side:      DoubleSide,
      wireframe: true,
    }),
  ];
  const sphere = new Mesh(geometry, material);
  scene.add(sphere);

  function render(a = 0) {
    requestAnimationFrame(render);

    geometry.vertices.forEach((vector) => {
      const ratio = noise(
        (vector.clone.x * 0.01),
        (vector.clone.y * 0.01) + (a * 0.0005),
        (vector.clone.z * 0.01),
      );
      vector.copy(vector.clone);
      vector.multiplyScalar(1 + (ratio * 0.05));
      vector.multiplyScalar(1);
    });
    geometry.verticesNeedUpdate = true;

    sphere.rotation.x += 0.001;
    sphere.rotation.y += 0.001;
    renderer.render(scene, camera);
  }

  // start animation
  window.addEventListener('resize', onresize.bind(null, canvas, camera, renderer), false);
  render();
};
