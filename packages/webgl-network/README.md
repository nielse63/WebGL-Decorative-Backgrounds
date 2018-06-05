
# @nielse63/webgl-network
> A sample WebGL decorative background using Three.js

[![npm](https://img.shields.io/npm/v/@nielse63/webgl-network.svg?maxAge=2592000)
[![Dependency Status](https://david-dm.org/nielse63/WebGL-Decorative-Backgrounds.svg?path=packages/webgl-network)](https://david-dm.org/nielse63/WebGL-Decorative-Backgrounds?path=packages/webgl-network)

Given a `<canvas>` NodeElement as the only parameter, the function will render an animation using Three.js

* [Example](https://nielse63.github.io/WebGL-Decorative-Backgrounds/network.html)

## Installation

Using Yarn
```bash
yarn add --save @nielse63/webgl-network
```

or NPM
```bash
npm install --save @nielse63/webgl-network
```

## Usage

```js
import network from '@nielse63/webgl-network';

const canvas = document.querySelector('canvas');
network(canvas);
```
