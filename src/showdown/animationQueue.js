/**
 * @param {Object} param
 * @param {Array} param.spritesArray - array with sprites to animate
 * @param {Number} param.animateToValue - value to tween to
 * @param {Number} param.delay - time in ms between animations
 * @param {Number} param.startTime - time in ms when the whole animation will start
 * 
 * @returns {animationQ} 
 */
const animateInOrder = ({
  spritesArray,
  animationProperty,
  animateToValue,
  delay,
  duration,
  startTime = 0,
}) => {
  const animationQ = [];
  let time = startTime;
  spritesArray.forEach( (sprite) => {
    animationQ.push(
      {
        sprite,
        animationProperty,
        animateToValue,
        duration,
        startTime:time,
        timeToAnimate: time,
      }
    );
    time+=delay;
  });
  return animationQ;
}

/**
 * 
 * @param {animationQ} animationQ - object with animation
 * @param {number} timeFrame - time passed between frames in ms
 * @param {functio } executeWhenFinished - function executed when animation is finished
 */
const _process = (animationQ, timeFrame, executeWhenFinished) => {
  animationQ.map( (element, index) => {
    element.timeToAnimate-=timeFrame;
    element.initialAnimationProperty = element.initialToValue  || element[element.animationProperty];
    if( element.timeToAnimate <= 0 ) {
      //timeToAnimate is now negative so when we use abs value, we have time from start of the animation
      element.sprite[element.animationProperty] = element.animateToValue * (Math.abs(element.timeToAnimate)/element.duration);
      //when animation is finish call finished callback and equalize value
      if((Math.abs(element.timeToAnimate) >= element.duration)) {
        element.sprite[element.animationProperty] = element.animateToValue;
        executeWhenFinished({
          element, index, animationQ
        });
      }
    }
  });
}

/**
 * animate animationQ to be used in ticker
 * @param {animationQ} animationQ 
 * @param {Number} timeFrame - time between frames in ms
 */
const process = (animationQ, timeFrame) => {
  _process(animationQ, timeFrame, (props) => {
    //in normal processing we remove element when animation is finished
    props.animationQ.splice(props.index, 1);
  })
}
/**
 * animate animationQ in infitie loop
 * @param {animationQ} animationQ 
 * @param {Number} timeFrame - time between frames in ms
 */
const processInifinite = (animationQ, timeFrame) => {
  _process(animationQ, timeFrame, (props => {
    props.element.timeToAnimate = props.element.startTime;
  }));
}


/**
 * Animate group of objects
 * @param {Object} param
 * @param {Array} param.Sprites - array with sprites to animate
 * @param {Array} param.animations - array with animations
 * 
 * @returns {animationQ}
 */
const animateGroup = ({
  Sprites,
  startTime,
  animations
}) => {
  const animationQ = [];
  animations.forEach((animation) => {
    Sprites.forEach((sprite) => {
      animationQ.push({
        sprite: sprite,
        animationProperty: animation.animationProperty,
        animateToValue: animation.animateToValue,
        duration: animation.duration,
        startTime: startTime + animation.delay,
        timeToAnimate: startTime + animation.delay
      })
    })

  })
  return animationQ;
}

export default {
  animateGroup,
  animateInOrder,
  process,
  processInifinite
}