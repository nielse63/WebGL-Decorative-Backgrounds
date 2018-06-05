const puppeteer = require('puppeteer');
const path = require('path');
const pkg = require('../package.json');

const getPageScreenshot = async (name, page) => {
  // go to url
  const url = `http://localhost:8080/${name}.html`;
  console.log(`visiting ${url}`);
  await page.goto(url);

  // hide header and footer
  await page.evaluate(() => {
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    header.style.display = 'none';
    footer.style.display = 'none';
  });

  // take screenshot
  await page.screenshot({
    path: path.resolve(__dirname, `../src/images/screenshots/${name}.png`),
  });
};

(async () => {
  console.log('getting screenshots');
  const browser = await puppeteer.launch({
    headless: false,
    args:     [
      '--headless',
      '--hide-scrollbars',
      '--mute-audio',
      '--no-sandbox',
      '--disable-setuid-sandbox',
    ],
  });
  const page = await browser.newPage();

  // set viewport
  await page.setViewport({
    width:  900,
    height: 580,
  });

  // get screenshots for each page
  const names = Object.keys(pkg.dependencies).map(dep => dep.replace(/@nielse63\/webgl-/, ''));
  // eslint-disable-next-line no-restricted-syntax
  for (const name of names) {
    await getPageScreenshot(name, page); // eslint-disable-line no-await-in-loop
  }

  await browser.close();
})();
