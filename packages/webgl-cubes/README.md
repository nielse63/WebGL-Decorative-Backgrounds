
# @nielse63/webgl-cubes
> A sample WebGL decorative background using Three.js

[![npm](https://img.shields.io/npm/v/@nielse63/webgl-cubes.svg?maxAge=2592000)
[![Dependency Status](https://david-dm.org/nielse63/WebGL-Decorative-Backgrounds.svg?path=packages/webgl-cubes)](https://david-dm.org/nielse63/WebGL-Decorative-Backgrounds?path=packages/webgl-cubes)

Given a `<canvas>` NodeElement as the only parameter, the function will render an animation using Three.js

* [Example](https://nielse63.github.io/WebGL-Decorative-Backgrounds/cubes.html)

## Installation

Using Yarn
```bash
yarn add --save @nielse63/webgl-cubes
```

or NPM
```bash
npm install --save @nielse63/webgl-cubes
```

## Usage

```js
import cubes from '@nielse63/webgl-cubes';

const canvas = document.querySelector('canvas');
cubes(canvas);
```
