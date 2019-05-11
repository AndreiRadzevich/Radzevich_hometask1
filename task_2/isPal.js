/**
 * Created by Андрей on 06.05.2019.
 */
function isPal(string) {
  var transformString = string.split('').filter(elem => elem != " ").join('').toLowerCase();
  var reverseString = string.split('').filter(elem => elem != " ").reverse().join('').toLowerCase();

  return (transformString === reverseString);
}

module.exports = isPal;