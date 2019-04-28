const interviewQuestion = require('./interviewQuestion');

describe('interviewQuestion', () => {
	test('if profession not specified', () => {
		expect(interviewQuestion()('Mark')).toBe('Please, Mark enter your profession');
 	});
 	test('if profession is teacher', () => {
 		expect(interviewQuestion('teacher')('Vova')).toBe('What subject do you teach Vova?');
 	});
});