
export function getCanvas() {
  const canvas = document.querySelector('canvas');
  return canvas;
}

export function getCanvasSize(canvas) {
  const width = canvas.offsetWidth;
  const height = canvas.offsetHeight;
  return { width, height };
}
