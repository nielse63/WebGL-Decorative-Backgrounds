
# @nielse63/webgl-waves
> A sample WebGL decorative background using Three.js

[![npm](https://img.shields.io/npm/v/@nielse63/webgl-waves.svg?maxAge=2592000)
[![Dependency Status](https://david-dm.org/nielse63/WebGL-Decorative-Backgrounds.svg?path=packages/webgl-waves)](https://david-dm.org/nielse63/WebGL-Decorative-Backgrounds?path=packages/webgl-waves)

Given a `<canvas>` NodeElement as the only parameter, the function will render an animation using Three.js

* [Example](https://nielse63.github.io/WebGL-Decorative-Backgrounds/waves.html)

## Installation

Using Yarn
```bash
yarn add --save @nielse63/webgl-waves
```

or NPM
```bash
npm install --save @nielse63/webgl-waves
```

## Usage

```js
import waves from '@nielse63/webgl-waves';

const canvas = document.querySelector('canvas');
waves(canvas);
```
