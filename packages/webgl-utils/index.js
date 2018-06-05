import { WebGLRenderer, ShaderMaterial } from 'three';
import image from './dot-texture.png';

export function getCanvasSize(canvas) {
  const width = canvas.offsetWidth;
  const height = canvas.offsetHeight;
  return { width, height };
}

export function onresize(canvas, camera, renderer) {
  canvas.style.width = '';
  canvas.style.height = '';
  const width = canvas.offsetWidth;
  const height = canvas.offsetHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

export const dotTextureImage = image;

export const createRenderer = (canvas, clearColor = 0x000000) => {
  const { width, height } = getCanvasSize(canvas);
  const renderer = new WebGLRenderer({
    canvas,
    antialias: true,
  });
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
  renderer.setSize(width, height);
  renderer.setClearColor(clearColor);
  return renderer;
};

export const createShaderMaterial = (
  vertexShaderSelector,
  fragmentShaderSelector,
  dotTexture,
) => new ShaderMaterial({
  uniforms: {
    texture: {
      value: dotTexture,
    },
  },
  vertexShader:   document.getElementById(vertexShaderSelector).textContent,
  fragmentShader: document.getElementById(fragmentShaderSelector).textContent,
  transparent:    true,
});
