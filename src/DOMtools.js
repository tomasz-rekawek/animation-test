
/**
 * transform object with name of dom elements
 * to object with dom elements
 * 
 * @example 
 * ```javascript
 * 
 * const DOM = { 
 * 'element': 'div'
 * }
 * 
 * transformObjectToDOMElements(DOM)
 * -> { 'element': '<div></div>' }
 * ```
 * @param {object} domObject - object containing domElement names as values
 * 
 */
const transformObjectToDOMElements = (domObject) => {
  Object.keys(domObject).forEach( (key) => {
    domObject[key] = document.createElement(domObject[key]);
  }); 
}

export default {
  transformObjectToDOMElements
}