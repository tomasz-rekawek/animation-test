
import {Application, Sprite, ticker, loader} from 'pixi.js' ;
import utils from '../utils';
import Config from '../config';
import animationQ from './animationQueue';

const PIXI = {
  Application,
  Sprite,
  ticker,
  loader
}

//initializes Showdown application
const initShowdown = () => {
  const PLAY_SPEED = 1;
  let PixiApp = new PIXI.Application({ 
      width: 802,         // default: 800
      height: 400,        // default: 600
      antialias: true,    // default: false
      transparent: false, // default: false
      resolution: 1       // default: 1
    }
  );
  //Object for holding all sprites objects
  const Sprites = {};
  //copy imagesNames object to local constangt
  const imagesNames = Object.assign({}, Config.imagesNamesShowdown);
  //convert to relative paths based, on path specified in config.js
  Object.keys(imagesNames).forEach((key) => {
    imagesNames[key] = utils.path(imagesNames[key], Config.assetsPathShowdown);
  });

  //load all textures
  Object.keys(imagesNames).forEach((key) => {
    PIXI.loader.add(imagesNames[key]);
  });


  PIXI.loader.load(setup);

  function setup() {

    //create sprites from textures
    Object.keys(imagesNames).forEach((key) => {
      Sprites[key] = new PIXI.Sprite(
        PIXI.loader.resources[imagesNames[key]].texture
      );
      Sprites[key] = Object.assign(Sprites[key], Config.SpritesPositions[key]);
    });

    Sprites.must_drop.scale.x = 0.65;
    Sprites.must_drop.scale.y = 0.65;

    //add all sprites to stage
    Object.keys(Sprites).forEach((sprite) => {
      PixiApp.stage.addChild(Sprites[sprite]);
    })

    //Array with letters for SHOWDOWN


    const VegasAnimationQ = animationQ.animateGroup({
      Sprites: [
        Sprites.vegas,
        Sprites.slots
      ],
      startTime: 0,
      animations: [
        {
        animationProperty: 'alpha',
        animateToValue: 1,
        duration: 50,
        delay: 450, 
        },
        {
          animationProperty: 'alpha',
          animateToValue: 0,
          duration: 100,
          delay: 550, 
        },
        {
          animationProperty: 'alpha',
          animateToValue: 1,
          duration: 50,
          delay: 750,
        },
        {
          animationProperty: 'alpha',
          animateToValue: 0,
          duration: 50,
          delay: 855,
        },
        {
          animationProperty: 'alpha',
          animateToValue: 1,
          duration: 50,
          delay: 1250,
        },
      ]
    })

    const AnimationContainer = document.getElementById('showdown_animation');
    AnimationContainer.append(PixiApp.view);
    
    let ticker = PIXI.ticker.shared;
    ticker.autoStart = false;
    ticker.speed = PLAY_SPEED;
    ticker.stop();
    ticker.start();
    const showdownQ = animationQ.animateInOrder({
      spritesArray: [  
        Sprites.s,
        Sprites.h,
        Sprites.o_1,
        Sprites.w_1,
        Sprites.d,
        Sprites.o_2,
        Sprites.w_2,
        Sprites.n
      ],
      animationProperty: 'alpha',
      animateToValue: 1,
      duration: 50,
      delay: 150,
      startTime: 800 
    });

    const animationBoltCycle = [
      {
        animateToValue: 1,
        duration: 30,
        delay: 0,
      },
      {
        animateToValue: 0,
        duration: 50,
        delay: 100,
      },
      {
        animateToValue: 1,
        duration: 25,
        delay: 250,
      },
      {
        animateToValue: 0,
        duration: 60,
        delay: 290,
      },
      {
        animateToValue: 1,
        duration: 30,
        delay: 350,
      },
      {
        animateToValue: 0,
        duration: 55,
        delay: 390,
      },
      {
        animateToValue: 1,
        duration: 20,
        delay: 500,
      },
    ]

    const repeatAnimation = ({
      sprite,
      animationProperty,
      animations,
      startTime,
      cycleTime, 
      repeatNumber
    }) => {
      const animationQ = [];
      for( let n =0; n< repeatNumber; n++) {
        animations.forEach( (animation) => {
          animationQ.push({
            sprite: sprite,
            timeToAnimate: startTime + animation.delay + (cycleTime * n),
            startTime: startTime + animation.delay + (cycleTime * n),
            animationProperty: animationProperty,
            animateToValue: animation.animateToValue,
            duration: animation.duration
          });
        });
      }
      return animationQ;
    }

    const animationQBolt = repeatAnimation({
      sprite: Sprites.bolt,
      animationProperty: 'alpha',
      startTime: 1500,
      cycleTime: 600,
      repeatNumber: 3,
      animations: animationBoltCycle
    });


    const animationQBoltInfinite = repeatAnimation({
      sprite: Sprites.bolt,
      animationProperty: 'alpha',
      startTime: 10000,
      cycleTime: 600,
      repeatNumber: 1,
      animations: animationBoltCycle
    });

    const mustDropQ = repeatAnimation({
      sprite: Sprites.must_drop,
      animationProperty: 'alpha',
      startTime: 3000,
      cycleTime: 0,
      repeatNumber: 1,
      animations: [
        {
          animateToValue: 1,
          duration: 50,
          delay: 0,
        },
        {
          animateToValue: 0,
          duration: 30,
          delay: 90,
        },
        {
          animateToValue: 1,
          duration: 40,
          delay: 150,
        },
        {
          animateToValue: 0,
          duration: 30,
          delay: 150,
        },
        {
          animateToValue: 1,
          duration: 40,
          delay: 170,
        },
      ]
    })

    ticker.add(function () {
      //animation of SHODOWN letters fading in
      animationQ.process(showdownQ, PIXI.ticker.shared.elapsedMS * PLAY_SPEED);
      
      //vegas slots flickering
      animationQ.process(VegasAnimationQ, PIXI.ticker.shared.elapsedMS * PLAY_SPEED);
      
      //bolt flickering
      animationQ.process(animationQBolt, PIXI.ticker.shared.elapsedMS * PLAY_SPEED);
      
      //must drop flickering
      animationQ.process(mustDropQ, PIXI.ticker.shared.elapsedMS * PLAY_SPEED);
      
      //infinite bolt flickering every 10 seconds
      animationQ.processInifinite(animationQBoltInfinite, PIXI.ticker.shared.elapsedMS * PLAY_SPEED);
    });
  }
}

//exposing initialise function to window if noConflict === true
if(!Config.noConflictMode) {
  window[Config.showdownInitFunction] = initShowdown;
}

export default initShowdown;