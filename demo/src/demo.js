
import brain from '@/backgrounds/brain';
import network from '@/backgrounds/network';

const backgrounds = {
  brain,
  network,
};

const loadBackground = (hash = 'network') => {
  console.log(hash);
  const key = hash.replace(/#/g, '');
  const background = backgrounds[key];
  if(!background) {
    // window.location.href = '/';
    console.log(`background not found for ${key}`)
    return;
  }
  console.log(background);
};

window.onload = () => {
  loadBackground(window.location.hash || 'network');
};
