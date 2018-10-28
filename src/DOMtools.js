const transformObjectToDOMElements = (domObject) => {
  Object.keys(domObject).forEach( (key) => {
    domObject[key] = document.createElement(domObject[key]);
  }); 
}

export default {
  transformObjectToDOMElements
}