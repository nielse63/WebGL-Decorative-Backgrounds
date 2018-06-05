
# @nielse63/webgl-brain
> A sample WebGL decorative background using Three.js

[![npm](https://img.shields.io/npm/v/@nielse63/webgl-brain.svg?maxAge=2592000)
[![Dependency Status](https://david-dm.org/nielse63/WebGL-Decorative-Backgrounds.svg?path=packages/webgl-brain)](https://david-dm.org/nielse63/WebGL-Decorative-Backgrounds?path=packages/webgl-brain)

Given a `<canvas>` NodeElement as the only parameter, the function will render an animation using Three.js

* [Example](https://nielse63.github.io/WebGL-Decorative-Backgrounds/brain.html)

## Installation

Using Yarn
```bash
yarn add --save @nielse63/webgl-brain
```

or NPM
```bash
npm install --save @nielse63/webgl-brain
```

## Usage

```js
import brain from '@nielse63/webgl-brain';

const canvas = document.querySelector('canvas');
brain(canvas);
```
