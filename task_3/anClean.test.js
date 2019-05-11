/**
 * Created by Андрей on 06.05.2019.
 */
const anClean = require('./anClean');

var ourArray = ['воз', 'гав', 'киборг', 'корсет', 'ЗОВ', 'авг', 'гробик', 'костер', 'сектор'];

describe('func anClean', () => {
  test('if argument is string', () => {
    expect(anClean('err')).toBe('argument should be array');
  });

  test('if argument is ourArray', () => {
    expect(anClean(ourArray)).toEqual(['ЗОВ', 'авг', 'гробик', 'сектор']);
  });
});