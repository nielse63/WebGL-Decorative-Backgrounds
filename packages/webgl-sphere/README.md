
# @nielse63/webgl-sphere
> A sample WebGL decorative background using Three.js

[![npm](https://img.shields.io/npm/v/@nielse63/webgl-sphere.svg?maxAge=2592000)
[![Dependency Status](https://david-dm.org/nielse63/WebGL-Decorative-Backgrounds.svg?path=packages/webgl-sphere)](https://david-dm.org/nielse63/WebGL-Decorative-Backgrounds?path=packages/webgl-sphere)

Given a `<canvas>` NodeElement as the only parameter, the function will render an animation using Three.js

* [Example](https://nielse63.github.io/WebGL-Decorative-Backgrounds/sphere.html)

## Installation

Using Yarn
```bash
yarn add --save @nielse63/webgl-sphere
```

or NPM
```bash
npm install --save @nielse63/webgl-sphere
```

## Usage

```js
import sphere from '@nielse63/webgl-sphere';

const canvas = document.querySelector('canvas');
sphere(canvas);
```
