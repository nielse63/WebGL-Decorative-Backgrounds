
import brain from '@nielse63/webgl-brain';

const backgrounds = {
  brain,
};

window.onload = () => {
  const file = window.location.pathname || window.location.path;
  const key = file
    .replace(/\//g, '')
    .replace(/\.html/, '')
    .trim();
  const fn = backgrounds[key];
  if (!fn) {
    throw new Error(`No background for ${key} was found`);
  }
  const canvas = document.querySelector('#scene');
  fn(canvas);
};
