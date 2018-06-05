
const setActiveClass = (key) => {
  const hash = `#${key}`;
  const target = document.querySelector(`a[href="${hash}"]`);
  if (target.classList.contains('active')) {
    return;
  }
  const active = document.querySelector('a.active');
  if (active) {
    active.classList.remove('active');
  }
  target.classList.add('active');
};

const removeIframe = () => {
  const elements = document.querySelectorAll('iframe');
  [...elements].forEach((element) => {
    element.remove();
  });
};

const createPreload = (key) => {
  const href = `${key}/`;
  if (document.head.querySelector(`link[href="${href}"]`)) {
    return;
  }
  const element = document.createElement('link');
  element.href = href;
  element.rel = 'preload';
  element.setAttribute('as', 'document');
  document.head.appendChild(element);
};

const createIframe = (key) => {
  const nav = document.querySelector('nav');
  const iframe = document.createElement('iframe');
  iframe.src = `${key}/`;
  iframe.setAttribute('frameborder', 0);
  document.body.insertBefore(iframe, nav);
};

const loadBackground = (hash = 'network') => {
  const key = hash.replace(/#/g, '');
  createPreload(key);
  removeIframe();
  setActiveClass(key);
  createIframe(key);
};

const init = () => {
  loadBackground(window.location.hash || 'network');
};

window.onhashchange = init;
window.onload = init;
