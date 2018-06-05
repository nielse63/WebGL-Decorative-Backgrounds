
import brain from '$packages/webgl-brain';
import cubes from '$packages/webgl-cubes';
import network from '$packages/webgl-network';
import sphere from '$packages/webgl-sphere';
import waves from '$packages/webgl-waves';

const backgrounds = {
  brain,
  cubes,
  network,
  sphere,
  waves,
};

window.addEventListener('load', () => {
  const file = window.location.pathname || window.location.path;
  const key = file
    .replace(/\//g, '')
    .replace(/\.html/, '')
    .trim();
  const fn = backgrounds[key];
  const canvas = document.querySelector('#scene');
  fn(canvas);
}, false);
