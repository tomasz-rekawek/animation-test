import Config from '../config';
import utils from '../utils';
import keyframesTools from './keyframesTools';
import mathUtils from '../mathUtils';
import Axios from 'axios';
import DOMtools from './DOMtools.js';

/**
 * 
 * @param {number} position - position to stop the spiner on
 * @returns {number} angle in deg coresponding to position
 */
const selectPosition = (position) => {
  const positions = {
    1: 45,
    2: 135,
    3: 225,
    4: 315
  }
  return positions[position];
}


//configuration of dom elements
const DOM = {
  wheelContainer: 'div',
  wheel: 'div',
  wheelImage: 'img',
  button: 'button',
  buttonImage: 'img',
  errorField: 'div',
  marker: 'div',
  markerImage: 'img'
}
//object to hold at what angle the spinner stopped
const SPINNER = {
  angle: 45,
}
//adding dom elements
//in doing it vanilla.js style
//because i dedcided that for such a small project
//there is no reason to add templating engine
const setupDOM = () => {

  DOMtools.transformObjectToDOMElements(DOM);
  DOM.wheelContainer = document.getElementById(Config.wheelDomRootID);
  
  DOM.wheelImage.src = utils.path(Config.imagesNamesWheel.wheel, Config.assetsPathWheel);
  DOM.wheel.id=Config.spinningWheelID;
  
  DOM.button.id = Config.buttonID;
  DOM.buttonImage.src = utils.path(Config.imagesNamesWheel.button, Config.assetsPathWheel);
  
  DOM.errorField.classList.add(Config.wheelErrorMsgClass);

  DOM.wheel.appendChild(DOM.wheelImage);
  DOM.button.appendChild(DOM.buttonImage);
  DOM.markerImage.src=utils.path(Config.imagesNamesWheel.marker, Config.assetsPathWheel);
  DOM.marker.appendChild(DOM.markerImage);
  DOM.marker.classList.add(Config.markerClass);
  DOM.wheelContainer.appendChild(DOM.marker);
  DOM.wheelContainer.appendChild(DOM.wheel);
  DOM.wheelContainer.appendChild(DOM.button);
  DOM.wheelContainer.appendChild(DOM.errorField);
}

/**
 * function with randomized time and number of full rotations that 
 * stops on choosen wheel position
 * @param {number} chosenPosition - position that the wheel will stop on
 */
const spinToSelectedPosition = (chosenPosition) => {

  //seting random duration between 2 and 3 seconds
  const duration = mathUtils.randomNumberBetween(10, 20)/10;

  //randomaizing the desired angle adding between 1-3 full rotations
  let stopAngle = selectPosition(chosenPosition) + mathUtils.numberOfSpins(mathUtils.randomNumberBetween(1,3));
  
  //if chosen angle is the same add one spin so the wheel doens't stand still
  if(SPINNER.angle === stopAngle) {
    stopAngle += mathUtils.numberOfSpins(1);
  }
 

  //applying changed rotation to keyframes
  keyframesTools.changeRotationAnimation({
    rotationClassName: Config.rotationClass,
    startAngle: SPINNER.angle,
    stopAngle: stopAngle,
  });

  //changing duration of css animation
  keyframesTools.changeAnimationDuration(`.${Config.rotationClass}`, `${duration}s`);
  SPINNER.angle = stopAngle;
}


//initializes the application
const wheelInit = () => {
  //adding required dom elements to dom
  setupDOM();

    DOM.button.addEventListener('click', () => {
      DOM.button.disabled = true;
      Axios('/assets/api.json').then((request) => {
        if(typeof request.data.POSITION !== 'number') {
          throw new Error('incorrect data format');
        }


    
        //start animation
        
        spinToSelectedPosition(request.data.POSITION);
        //clear error message
        DOM.errorField.innerText = '';
        //reseting animation
        void DOM.wheel.offsetWidth;
        
        DOM.wheel.classList.add(Config.rotationClass);

        function clearAnimation() {
          DOM.button.disabled = false;
          DOM.wheel.classList.remove(Config.rotationClass);
          DOM.wheel.style.transform = `rotate(${selectPosition(request.data.POSITION)}deg)`; 
          DOM.wheel.removeEventListener('animationend', clearAnimation);
        }
        DOM.wheel.addEventListener('animationend', clearAnimation);
      }).catch( (error) => {
        console.error(error);
        DOM.errorField.innerText = Config.wheelErrorMsg;
        DOM.button.disabled = false;
      });
  });
}
//expose initialising function to window for end client
if(!Config.noConflictMode) {
  window[Config.wheelInitFunction] = wheelInit;
}

export default wheelInit;