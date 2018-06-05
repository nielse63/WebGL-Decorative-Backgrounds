# WebGL Decorative Backgrounds

> Sample decorative backgrounds using WebGL

[![Maintainability](https://api.codeclimate.com/v1/badges/22cea98ae5b00bbccf64/maintainability)](https://codeclimate.com/github/nielse63/WebGL-Decorative-Backgrounds/maintainability)

## Demos

* [Demo Homepage](https://nielse63.github.io/WebGL-Decorative-Backgrounds/)
* [The Brain](https://nielse63.github.io/WebGL-Decorative-Backgrounds/brain.html)
* [Cubes](https://nielse63.github.io/WebGL-Decorative-Backgrounds/cubes.html)
* [Network](https://nielse63.github.io/WebGL-Decorative-Backgrounds/network.html)
* [Sphere](https://nielse63.github.io/WebGL-Decorative-Backgrounds/sphere.html)
* [Waves](https://nielse63.github.io/WebGL-Decorative-Backgrounds/waves.html)

![WebGL Decorative Backgrounds](https://s3.us-east-2.amazonaws.com/github-storage/cubes.min.gif)

Based on the amazing work from the people at Codrops, this is a modern, lightweight extension of previously crafted WebGL Decorative Backgrounds.

## Installation

To download and install the entire repo, including all examples, build scripts, etc., clone the repo and install the dependencies:

```bash
git clone https://github.com/nielse63/WebGL-Decorative-Backgrounds.git
cd WebGL-Decorative-Backgrounds
yarn
```

If you only want to use a single background in an existing project, you can install the individual module and `import` it like you would any other script:

```bash
yarn add @nielse63/cubes
```

To see all the scoped packages available for installation, visit the [`packages/`](https://github.com/nielse63/WebGL-Decorative-Backgrounds/tree/master/packages) directory.

## Usage

Assuming you've installed a single, scoped package (i.e. `@nielse63/cubes`), simply import the main script like you would any other ESModule:

```js
import cubes from '@nielse63/cubes';

const canvas = document.querySelector('canvas');
cubes(canvas);
```

## Credits

* [Original Article on Codrops](https://tympanus.net/codrops/2017/11/28/decorative-webgl-backgrounds/)

## Resources

* [Three.js](https://threejs.org/)
* [TweenMax](https://www.npmjs.com/package/gsap)
* [Simplex Noise](https://github.com/nielse63/node-simplex-noise)
