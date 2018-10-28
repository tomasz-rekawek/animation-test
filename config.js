const CONFIG = {
  
  //if turn on doesn't expose global init functions
  noConflictMode: true,

  //function name exposed to window to initialise wheel app 
  //change in case its colliding in your system 
  wheelInitFunction: 'wheelInit',

  //function name exposed to window to initialise showdown app 
  //change in case its colliding in your system 
  showdownInitFunction: 'showdownInit',

  //id of the dom element that wheel applicaion will attach
  wheelDomRootID: 'wheel',
  //path to assets with showdown app images

  assetsPathShowdown : '/assets/images/showdown/',
  //path to assets with wheel app images
  assetsPathWheel : '/assets/images/wheel/',
  
  
  //className with animations for wheel application
  rotationClass: 'rotate-center',

  //id name of the spinning wheel
  spinningWheelID: 'spinner',

  //id name of the button in wheel application
  buttonID: 'button',

  //error message when request fails
  wheelErrorMsg: 'Ups, something went wront try again later',
  wheelErrorMsgClass: 'error-field',
  //names of assets for wheel application
  imagesNamesWheel: {
    wheel: 'wheel.png',
    marker: 'marker.png',
    button: 'btn-spin.png'
  },

  //names of assets for showdown application
  imagesNamesShowdown: {
    header: "header.png",
    showdown_off: "showdown-off.png",
    bolt_off: "bolt-off@2x.png",
    bolt: "bolt@2x.png",
    d: "d@2x.png",
    h: "h@2x.png",
    n: "n@2x.png",
    o_1: "o-1@2x.png",
    o_2: "o-2@2x.png",
    s: "s@2x.png",
    slots: "slots@2x.png",
    vegas: "vegas@2x.png",
    w_1: "w-1@2x.png",
    w_2: "w-2@2x.png",
    must_drop: "must_drop.png",
  },

  //initial sprite configuration for showdown application
  SpritesPositions: {
    bolt: {
      x: 345,
      y: -26,
      alpha:0,
    },
    bolt_off: {
      alpha: 0
    },
    showdown_off: {
      alpha:1,
      y:20,
      x:0,
    },
    header: {
      alpha:1,
    },
    slots: {
      alpha:0,
      x: 435,
      y:10,
    },
    vegas: {
      alpha: 0,
      x: 55,
      y:10,
    },
    must_drop: {
      alpha: 0,
      x: 90,
      y: 230
    },
    s: {
      x: -60,
      y: 25,
      alpha:0,
    },
    h: {
      x: 36,
      y: 25,
      alpha:0,
    },
    o_1: {
      x: 190,
      y: 25,
      alpha:0,
    },
    w_1: {
      x: 235,
      y: 25,
      alpha:0,
    },
    d: {
      x: 350,
      y: 25,
      alpha:0,
    },
    o_2: {
      x:435,
      y:25,
      alpha:0,
    },
    w_2: {
      x:520,
      y:25,
      alpha:0,
    },
    n: {
      x:610,
      y:25,
      alpha:0,
    }
  }
}

export default CONFIG;