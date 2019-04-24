// задание 2
function multiplyNumeric(obj) {
	if (typeof obj !== "object") {
		return false;
	};
	var obj1 = {};
	var arr = Object.keys(obj).map(function (elem) {
		if (Number(obj[elem])) {
			obj1[elem] = (obj[elem]) * 2;
			return obj1[elem];
		};
		return obj1[elem] = obj[elem];
	});
	return obj1;
};
module.exports = multiplyNumeric;