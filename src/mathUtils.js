/**
 * multiples number by 360
 * @param {number} n - spin times
 * @returns {number} spins in degrees
 */
const numberOfSpins = (n) => {
  return n * 360;
}

/**
 * @param {number} a - lesser number
 * @param {number} b - bigger number
 * @returns {number} between a and b
 */
const randomNumberBetween = (a,b) => {
  return Math.floor(Math.random() * b) + a 
}

export default{
  numberOfSpins,
  randomNumberBetween
}