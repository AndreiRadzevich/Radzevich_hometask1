/**
 * Created by Андрей on 09.04.2019.
 */

function identifyNumber(a) {
	return (typeof a == "number");
};

describe('test number', () => {
	test('5 is number', () => {
		expect(identifyNumber(5)).toBeTruthy();
	});

	test('five isn\'t number', () => {
		expect(identifyNumber("five")).toBeFalsy();
	});
});

function identifyString(a) {
	if (typeof a == "string") return a;

	return "it dosn\'t string";
};

describe('test string', () => {
	test('book is string', () => {
		expect(identifyString("book")).toBe("book");
	});

	test('5 isn\'t string', () => {
		expect(identifyString(5)).toBe("it dosn\'t string");
	});
});

function identifyBoolen(a, b) {
	var result = a > b;

	return result;
};

describe('test boolen', () => {
	test('result is boolen', () => {
		expect(identifyBoolen(3, 2)).toBeTruthy();
	});

	test('result isn\'t boolen', () => {
		expect(identifyBoolen(2, 3)).toBeFalsy();
	});
});

describe('test null', () => {
	test('a is null', () => {
		var a = null;

		expect(a).toBeNull();
	});

	test('a isn\'t null', () => {
		var a;

		expect(a).not.toBeNull();
	});
});

describe('test undefined', () => {
	test('a is undefined', () => {
		var a;

		expect(a).toBeUndefined();
	});

	test('a isn\'t undefined', () => {
		var a = 8;

		expect(a).not.toBeUndefined();
	});
});

function identifyObject(obj) {
	return (typeof obj == "object");
};

describe('test object', () => {
	test('{} is object', () => {
		expect(identifyObject({})).toBeTruthy();
	});

	test('5 isn\'t object', () => {
		expect(identifyObject(5)).toBeFalsy();
	});
});

describe('test NaN', () => {
	test("function isNaN", () => {
		expect(isNaN('true')).toBeTruthy();
	});

	test("function isNaN", () => {
		expect(isNaN('123')).toBeFalsy();
	});
});