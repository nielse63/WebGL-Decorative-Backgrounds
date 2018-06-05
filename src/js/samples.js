
import brain from '@nielse63/webgl-brain';
import cubes from '@nielse63/webgl-cubes';
import network from '@nielse63/webgl-network';
import sphere from '@nielse63/webgl-sphere';
import waves from '@nielse63/webgl-waves';

const backgrounds = {
  brain,
  cubes,
  network,
  sphere,
  waves,
};

window.addEventListener('load', () => {
  const file = window.location.href.split('/').pop();
  const key = file
    .replace(/\//g, '')
    .replace(/\.html/, '')
    .trim();
  console.log({ file, backgrounds, key }); // eslint-disable-line
  const fn = backgrounds[key];
  const canvas = document.querySelector('#scene');
  fn(canvas);
}, false);
