// задание 1
function findWinner(obj) {
	if (typeof obj !== "object") {
		return "Аргумент не является объектом";
	};
	var arr = Object.keys(obj).map(function (elem) {
		return obj[elem];
	}).sort(function (a, b) {
		return a - b;
	});
	return arr;
};
module.exports = findWinner;