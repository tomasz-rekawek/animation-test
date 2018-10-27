import config from '../config';
/** 
 * @param {string} fileName - name of the file i.e myImg.png
 * @returns {string} full path to the asset based, on path set in config.js
 */
const path = (fileName) => {
  return `${config.assetsPath}${fileName}`
}

export default {
  path,
}
