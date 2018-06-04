import {
  WebGLRenderer, Scene, PerspectiveCamera, Group,
  LineBasicMaterial, Geometry, Vector3, Line,
} from 'three';
import noise from '@/noise';
import { getCanvasSize, onresize } from '@/utils';

export default (canvas) => {
  const { width, height } = getCanvasSize(canvas);
  const renderer = new WebGLRenderer({
    canvas,
    antialias: true,
  });
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
  renderer.setSize(width, height);
  renderer.setClearColor(0x000000, 0);

  const scene = new Scene();
  const camera = new PerspectiveCamera(40, width / height, 0.1, 1000);
  camera.position.set(0, 0, 350);

  const sphere = new Group();
  scene.add(sphere);

  const material = new LineBasicMaterial({
    color: 0xfe0e55,
  });
  const linesAmount = 18;
  const radius = 100;
  const verticesAmount = 50;

  let linesIndex = 0;
  while (linesIndex < linesAmount) {
    const geometry = new Geometry();
    geometry.y = (linesIndex / linesAmount) * radius * 2;
    let i = 0;
    while (i < verticesAmount) {
      const vector = new Vector3();
      const percentage = i / verticesAmount;
      vector.x = Math.cos(percentage * Math.PI * 2);
      vector.z = Math.sin(percentage * Math.PI * 2);
      vector.clone = vector.clone();
      geometry.vertices.push(vector);
      i += 1;
    }
    const line = new Line(geometry, material);
    sphere.add(line);
    linesIndex += 1;
  }

  function updateVertices(a) {
    sphere.children.forEach((line) => {
      line.geometry.y += 0.3;
      if (line.geometry.y > radius * 2) {
        line.geometry.y = 0;
      }
      const radiusHeight = Math.sqrt(line.geometry.y * ((2 * radius) - line.geometry.y));
      line.geometry.vertices.forEach((vector) => {
        const ratio = noise(
          vector.x * 0.009,
          (vector.z * 0.009) + (a * 0.0006),
          line.geometry.y * 0.009,
        ) * 15;
        vector.copy(vector.clone);
        vector.multiplyScalar(radiusHeight + ratio);
        vector.y = line.geometry.y - radius;
      });
      line.geometry.verticesNeedUpdate = true;
    });
  }

  function render(a = 0) {
    requestAnimationFrame(render);
    updateVertices(a);
    renderer.render(scene, camera);
  }

  window.addEventListener('resize', onresize.bind(null, canvas, camera, renderer), false);
  render();
};
