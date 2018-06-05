import '@/styles/demo.scss';

const prerenderExists = (url) => {
  const link = document.head.querySelector(`link[href="${url}"]`);
  return url === window.location.href || !!link;
};

const createPrerender = (url) => {
  const link = document.createElement('link');
  link.rel = 'prerender';
  link.href = url;
  document.head.appendChild(link);
};

const links = document.querySelectorAll('a');
const urlHost = window.location.host;
[...links].forEach((link) => {
  link.addEventListener('mouseover', (e) => {
    const { path } = e;
    const firstItem = path[0];
    const target = firstItem.nodeName.toLowerCase() === 'a' ? firstItem : path.filter(({ nodeName }) => nodeName && nodeName.toLowerCase() === 'a')[0];
    const { href, host } = target;
    if (host !== urlHost || prerenderExists(href)) {
      return;
    }
    createPrerender(href);
  }, false);
});
