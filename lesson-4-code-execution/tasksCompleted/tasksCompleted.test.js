const findWinner = require('./tasksCompleted');

var tasksCompleted = {
	'Anna': 29,
	'Serg': 35,
	'Elena': 1,
	'Anton': 99
};

describe('test func tasksCompleted', () => {
	test('enter correct argument', () => {
		expect(findWinner(tasksCompleted)).toEqual([1, 29, 35, 99]);
});

test('if argument isn\'t object', () => {
	expect(findWinner("string")).toBe("Аргумент не является объектом");
});
});

