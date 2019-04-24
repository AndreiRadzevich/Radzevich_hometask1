// задание 3
function addCalc() {
	var number = prompt("Введите число");
	var arr = [];
	while (isNumeric(number)) {
		arr.push(Number(number));
		number = prompt("Введите число");
	};
	return alert(arr.reduce(function (sum, elem) {
		return sum + elem;
	}, 0));
};

function isNumeric(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
};