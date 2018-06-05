import {
  Group, WebGLRenderer, Scene,
  PerspectiveCamera, LineBasicMaterial,
  Geometry, Line, Vector3,
} from 'three';
import { getCanvasSize, onresize } from '@nielse63/webgl-utils';

export default (canvas) => {
  const { width, height } = getCanvasSize(canvas);
  const renderer = new WebGLRenderer({
    canvas,
    antialias: true,
  });
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
  renderer.setSize(width, height);
  renderer.setClearColor(0x191919);

  const scene = new Scene();

  const camera = new PerspectiveCamera(40, width / height, 0.1, 1000);
  camera.position.set(0, 0, 280);

  const sphere = new Group();
  scene.add(sphere);
  const mat1 = new LineBasicMaterial({
    color: 0x4a4a4a,
  });
  const mat2 = new LineBasicMaterial({
    color: 0x3F51B5,
  });

  const radius = 100;
  const lines = 50;
  const dots = 50;

  {
    let i = 0;
    while (i < lines) {
      const geometry = new Geometry();
      const line = new Line(geometry, (Math.random() > 0.2) ? mat1 : mat2);
      line.speed = (Math.random() * 300) + 250;
      line.wave = Math.random();
      line.radius = Math.floor(radius + (
        (Math.random() - 0.5) * (radius * 0.2)
      ));
      let j = 0;
      while (j < dots) {
        const x = ((j / dots) * line.radius * 2) - line.radius;
        const vector = new Vector3(x, 0, 0);
        geometry.vertices.push(vector);
        j += 1;
      }
      line.rotation.x = Math.random() * Math.PI;
      line.rotation.y = Math.random() * Math.PI;
      line.rotation.z = Math.random() * Math.PI;
      sphere.add(line);
      i += 1;
    }
  }

  function updateDots(a) {
    const { children } = sphere;

    let i = 0;
    while (i < lines) {
      const line = children[i];
      const { vertices } = line.geometry;
      let j = 0;
      while (j < dots) {
        const vector = vertices[j];
        const ratio = 1 - ((line.radius - Math.abs(vector.x)) / line.radius);
        const y = Math.sin((a / line.speed) + (j * 0.15)) * 12 * ratio;
        vector.y = y;
        j += 1;
      }
      line.geometry.verticesNeedUpdate = true;
      i += 1;
    }
  }

  function render(a = 0) {
    requestAnimationFrame(render);
    updateDots(a);
    sphere.rotation.y = (a * 0.0001);
    sphere.rotation.x = (-a * 0.0001);
    renderer.render(scene, camera);
  }

  window.addEventListener('resize', onresize.bind(null, canvas, camera, renderer), false);
  render();
};
