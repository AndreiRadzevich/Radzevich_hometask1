const multiplyNumeric = require('./multiplyNumeric');

var image = {
	width: 100,
	height: 400,
	title: 'Cool image'
};

describe('test func multiplyNumeric', () => {
	test('enter correct argument', () => {
		expect(multiplyNumeric(image)).toEqual({width: 200, height: 800, title: 'Cool image'
		});
});

test('if argument isn\'t object', () => {
	expect(multiplyNumeric("string")).toBeFalsy();
});
});

