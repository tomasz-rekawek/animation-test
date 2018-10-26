
import pixi from 'pixi.js';
import utils from './utils';
import Config from '../config';
const PLAYBACK_SPEED = 0.25;
let PixiApp = new PIXI.Application({ 
    width: 802,         // default: 800
    height: 336,        // default: 600
    antialias: true,    // default: false
    transparent: false, // default: false
    resolution: 1       // default: 1
  }
);

let imagesStore = {
  header: "header.png",
  showdown_off: "showdown-off.png",
  bolt_off: "bolt-off@2x.png",
  bolt: "bolt@2x.png",
  d: "d@2x.png",
  h: "h@2x.png",
  must_drop: "must_drop.png",
  n: "n@2x.png",
  o_1: "o-1@2x.png",
  o_2: "o-2@2x.png",
  s: "s@2x.png",
  slots: "slots@2x.png",
  vegas: "vegas@2x.png",
  w_1: "w-1@2x.png",
  w_2: "w-2@2x.png",
}

const Sprites = {};

const createAnimationQ = ({
  spritesArray,
  animationProperty,
  animateToValue,
  delay,
  duration,
}) => {
  const animationQ = [];
  let time = 0;
  spritesArray.forEach( (sprite) => {
    time+=delay;
    animationQ.push(
      {
        sprite,
        animationProperty,
        animateToValue,
        duration,
        startTime:time
      }
    )
  });
  return animationQ;
}

const processAnimationQ = (animationQ, timeFrame) => {
  animationQ.map( (element, index) => {
    element.startTime-=timeFrame;
    if(element.startTime <= 0 ) {

      //startTime is now negative so when we use abs value, we have time from start of the animation
      element.sprite[element.animationProperty] = element.animateToValue * (Math.abs(element.startTime)/element.duration);
      //when animation is finish remove element from array and equalize value
      if(Math.abs(element.sprite[element.animationProperty]-element.animateToValue) < 0.05) {
        element.sprite[element.animationProperty] = element.animateToValue;
        animationQ.splice(index, 1);
      }
    }
  });
}


//convert to relative paths based, on path specified in config.js
Object.keys(imagesStore).forEach((key) => {
  imagesStore[key] = utils.path(imagesStore[key]);
});

//load all textures
Object.keys(imagesStore).forEach((key) => {
  PIXI.loader.add(imagesStore[key]);
});


PIXI.loader.load(setup);

function setup() {

  //create sprites
  Object.keys(imagesStore).forEach((key) => {
    Sprites[key] = new PIXI.Sprite(
      PIXI.loader.resources[imagesStore[key]].texture
    );
    Sprites[key] = Object.assign(Sprites[key], Config.SpritesPos[key]);
  });


  window.Sprites = Sprites;
  //add all sprites to stage
  Object.keys(Sprites).forEach((sprite) => {
    PixiApp.stage.addChild(Sprites[sprite]);
  })

  const SHOWDOWN = [  
    Sprites.s,
    Sprites.h,
    Sprites.o_1,
    Sprites.w_1,
    Sprites.d,
    Sprites.o_2,
    Sprites.w_2,
    Sprites.n
  ]
/*
  sprite,
  animationProperty,
  animateToValue,
  duration,
  startTime:time
*/
  const VegasAnimationQ = [
    {
      sprite: Sprites.vegas,
      animationProperty: 'alpha',
      animateToValue: 1,
      duration: 20 * PLAYBACK_SPEED,
      startTime: 90 * PLAYBACK_SPEED
    },
    {
      sprite: Sprites.slots,
      animationProperty: 'alpha',
      animateToValue: 1,
      duration: 20 * PLAYBACK_SPEED,
      startTime: 90 * PLAYBACK_SPEED
    },
    {
      sprite: Sprites.vegas,
      animationProperty: 'alpha',
      animateToValue: 0,
      duration: 10 * PLAYBACK_SPEED,
      startTime: 110 * PLAYBACK_SPEED
    },
    {
      sprite: Sprites.slots,
      animationProperty: 'alpha',
      animateToValue: 0,
      duration: 10 * PLAYBACK_SPEED,
      startTime: 110 * PLAYBACK_SPEED
    },
    {
      sprite: Sprites.vegas,
      animationProperty: 'alpha',
      animateToValue: 1,
      duration: 20 * PLAYBACK_SPEED,
      startTime: 120 * PLAYBACK_SPEED
    },
    {
      sprite: Sprites.slots,
      animationProperty: 'alpha',
      animateToValue: 1,
      duration: 20 * PLAYBACK_SPEED,
      startTime: 120 * PLAYBACK_SPEED
    },
    {
      sprite: Sprites.vegas,
      animationProperty: 'alpha',
      animateToValue: 0,
      duration: 10 * PLAYBACK_SPEED,
      startTime: 140 * PLAYBACK_SPEED
    },
    {
      sprite: Sprites.slots,
      animationProperty: 'alpha',
      animateToValue: 0,
      duration: 10 * PLAYBACK_SPEED,
      startTime: 140 * PLAYBACK_SPEED
    },
    {
      sprite: Sprites.vegas,
      animationProperty: 'alpha',
      animateToValue: 1,
      duration: 20 * PLAYBACK_SPEED,
      startTime: 150 * PLAYBACK_SPEED
    },
    {
      sprite: Sprites.slots,
      animationProperty: 'alpha',
      animateToValue: 1,
      duration: 20 * PLAYBACK_SPEED,
      startTime: 150 * PLAYBACK_SPEED
    }
  ]

  const AnimationContainer = document.getElementById('showdown_animation');
  AnimationContainer.append(PixiApp.view);
  
  let ticker = PIXI.ticker.shared;
  ticker.autoStart = false;
  ticker.stop();
  ticker.start();
  console.log('animation q');
  const animationQ = createAnimationQ({
    spritesArray: SHOWDOWN,
    animationProperty: 'alpha',
    animateToValue: 1,
    duration: 20 * PLAYBACK_SPEED,
    delay: 100 * PLAYBACK_SPEED
  });

  ticker.add(function (frameTime) {
    processAnimationQ(animationQ, frameTime);
    processAnimationQ(VegasAnimationQ, frameTime);
  });
  console.log(animationQ);

}
