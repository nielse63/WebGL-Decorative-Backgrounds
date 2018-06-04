
import brain from '@/backgrounds/brain';
import network from '@/backgrounds/network';

const backgrounds = {
  brain,
  network,
};

const links = document.querySelectorAll('a');
links.addEventListener('click', (e) => {
  e.preventDefault();
  console.log(e);
}, false);
