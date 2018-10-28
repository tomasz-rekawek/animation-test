# Animation Test

---

## Table of Contents (Optional)

- [Installation](#installation)
- [Deployment](#deployment)


## Installation

```shell
$ npm install
$ npm start
```

### Deployment

instructions for hipotetical deployment

#### 1.Standalone deployment

enable the noConflictMode in config.js file (if its disabled, global init functions are not exposed)
```javascript
noConflictMode: true,
```

if you want to change, where you deploy your images you can modify those entries, in config.js
```javascript
//path to assets with showdown app images
assetsPathShowdown : '/assets/images/showdown/',
//path to assets with wheel app images
assetsPathWheel : '/assets/images/wheel/',
```

```shell
$ npm install
$ npm run build
```

deploy your application to a server include the main.js file from dist in your html, and call
```javascript
window.wheelInit();
window.showdownInit();
```

if those global names collide, with your current code, you can change init functions name in config.
```javascript
//function name exposed to window to initialise wheel app 
//change in case its colliding in your system 
wheelInitFunction: 'wheelInit',

//function name exposed to window to initialise showdown app 
//change in case its colliding in your system 
showdownInitFunction: 'showdownInit',
```

#### 2.Including in your package

import `src/showdown/index.js` and `src/wheel/index.js`

they both expose init functions




