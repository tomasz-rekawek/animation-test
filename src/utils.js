import config from '../config';
/** 
 * @param {string} fileName - name of the file i.e myImg.png
 * @returns {string} full path to the asset based, on path set in config.js
 */
const path = (fileName) => {
  return `${config.assetsPath}${fileName}`
}

class Animator {
  constructor() {
    // short for queue
    this.q = [];
  }

  execute(callback, delay) {
    this.q.push({
      callback: callback,
      delay: delay
    });
    return this;
  }

  run(index=0) {
    setTimeout( () => {
      this.q[index].callback();
      if(this.q[index+1]) {
        this.run(index+1)
      }
    }
    ,this.q[index].delay )
  }
}

function showWithDelayAnimation(SpritesArray, animation, delay) {
  let time = 0;
  SpritesArray.map( (element) => {
    time+=delay;
    element.timeToAnimate = time;
    element.animation = function() {
      element.alpha = 1;
    }
  });
  return SpritesArray;
}


export default {
  path:path
}


// ], () => {}, 50);
// ticker.add(function (frameTime) {
//   animatedShowDown.map( (sprite, index) => {
//     sprite.timeToAnimate-=frameTime;
//     if(sprite.timeToAnimate<=0) {
//       console.log('ITS TIME');
//       console.log(sprite.animation);
//       sprite.animation();
//       animatedShowDown.splice(index, 1);
//     }
//   });
// });