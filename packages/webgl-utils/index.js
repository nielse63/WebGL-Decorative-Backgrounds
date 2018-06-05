import image from './dot-texture.png';

export function getCanvasSize(canvas) {
  const width = canvas.offsetWidth;
  const height = canvas.offsetHeight;
  return { width, height };
}

export function onresize(canvas, camera, renderer) {
  /* eslint-disable no-param-reassign */
  canvas.style.width = '';
  canvas.style.height = '';
  const width = canvas.offsetWidth;
  const height = canvas.offsetHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

export const dotTextureImage = image;
