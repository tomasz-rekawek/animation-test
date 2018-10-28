

/**
 * @typedef {Object} keyframesRules
 * @property {Object} webkit webkit keyframe object
 * @property {Object} default default keyframes object
 */

/**
 * @param {string} rule - name of the key frame rule
 * @returns {keyframesRules} 
 */
const findKeyframesRules = (name) => {
  const styleSheets = document.styleSheets;
  const keyFramesRules = {
    webkit: null,
    default: null
  };
  
  for(let i=0; i<styleSheets.length; i++) {
    const styleSheet = styleSheets[i];
    for(let j=0; j<styleSheet.cssRules.length; j++) {
      const rule = styleSheet.cssRules[j];
      if (rule.name === name && rule.cssText.indexOf('webkit') > -1) {
        keyFramesRules.webkit = rule;
      } else if (rule.name === name){
        keyFramesRules.default = rule;
      }
    };
    return keyFramesRules;
  };
}
/**
 * changes the angle of rotation in animation
 * @param {string} rotationClassName - class that have anmations attached to it 
 * @param {number} angle - desired rotation in deg
 */
const changeRotationAnimation = ({rotationClassName, startAngle, stopAngle}) => {
  
  const keyframesObject = findKeyframesRules(rotationClassName);
  modifyKeyFrames(keyframesObject, 'deleteRule', '0%');
  modifyKeyFrames(keyframesObject, 'deleteRule', '100%');

  const ruleTemplate = (param) => {
    return `
      -webkit-transform: rotate(${param}deg);
      transform: rotate(${param}deg);
    `
  }
  insertRule(keyframesObject,
    `0% { 
        ${ruleTemplate(startAngle)}
    }`
  );
  insertRule(keyframesObject,
    `100% { 
      ${ruleTemplate(stopAngle)}
    }`
  );
}

/**
 * calls methods on both webkit and default keys in keyframesObject
 * @param {keyframesRules} keyframesObject 
 * @param {string} action - name of method to call 
 * @param {*} param - param to apply
 */
const modifyKeyFrames = (keyframesObject, action, param) => {
  keyframesObject.webkit[action](param);
  keyframesObject.default[action](param);
}
/**
 * appends keyframes rules
 * @param {keyframesRules} keyframesObject 
 * @param {string} rule - animation rule to insert
 */
const insertRule  = (keyframesObject, rule) => {
  //prefixes saved in keyFramesObject
  const prefixes = [
    'webkit',
    'default'
  ]

  const methodNameVariations = [
    'insertRule',
    'appendRule'
  ]
  
  //some older browsers use insertRule
  //others use appendRule
  //checking for existence of method and calling it
  prefixes.forEach( (prefix) => {
    methodNameVariations.forEach( (methodName) => {
      if(keyframesObject[prefix][methodName]) {
        keyframesObject[prefix][methodName](rule);
      }
    })
  });
}

/**
 * returns cssRules appended to css selector
 * @param {string} selectorName
 * @returns {cssRules}
 */
const findSelectorRules = (selectorName) => {
  const styleSheets = document.styleSheets;
  
  for(let i=0; i<styleSheets.length; i++) {
    let styleSheet = styleSheets[i];
    for(let j=0; j<styleSheet.cssRules.length; j++) {
      const rule = styleSheet.cssRules[j];
      if (rule.selectorText === selectorName) {
        return rule;
      } 
    };
    return null;
  };
}
/**
 * change animation duration on chosen selector
 * @param {string} selectorName - name of selector .class
 * @param {string} duration - duration in seconds i.e '2s'
 */
const changeAnimationDuration = (selectorName, duration) => {
  const selectorRules = findSelectorRules(selectorName);
  selectorRules.style.animation = `rotate-center ${duration} ease-in-out both`;
  selectorRules.style.webkitAnimation = 'rotate-center ${duration} ease-in-out both';
}


export default {
  changeRotationAnimation,
  changeAnimationDuration
}