/**
 * Created by Андрей on 06.05.2019.
 */
const isPal = require('./isPal');

describe('func isPal', () => {
	test('enter palindrome', () => {
		expect(isPal('Anna')).toBeTruthy();
    expect(isPal('А роза упала на лапу Азора')).toBeTruthy();
    expect(isPal('12321')).toBeTruthy();
  });

  test('enter not palindrome', () => {
	  expect(isPal('Вася')).toBeFalsy();
    expect(isPal('123212')).toBeFalsy();
  });
});