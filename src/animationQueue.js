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

const process = (animationQ, timeFrame) => {
  _process(animationQ, timeFrame, (props) => {
    //in normal processing we remove element when animation is finished
    console.log('slice', props.element);
    props.animationQ.splice(props.index, 1);
  })
}

const processInifinite = (animationQ, timeFrame) => {
  _process(animationQ, timeFrame, (props => {
    props.element.timeToAnimate = props.element.startTime;
  }));
}



const animateGroup = ({
  Sprites,
  startTime,
  animations
}) => {
  const animationQ = [];
  animations.forEach((animation) => {
    console.log(animation);
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