/**
 * Created by Андрей on 06.05.2019.
 */
function anClean(ourArr) {
  if (!Array.isArray(ourArr)) {
    return 'argument should be array';
  } else {

    var anagrams = {};
    var newArr = [];

    for (var i = 0; i < ourArr.length; i++) {
      // расставляемм буквы в алфавитном порядке
      var sorted = ourArr[i].toLowerCase().split('').sort().join('');
      // заполняем объект при этом если уже есть такой ключ то он перезапишеться
      anagrams[sorted] = ourArr[i];
    }

    for (var key in anagrams) newArr.push(anagrams[key]);

    return newArr;
  }
}

module.exports = anClean;