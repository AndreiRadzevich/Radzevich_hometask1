// задание 1
function extractLetter() {
	var impWord = prompt("введите слово");
	var letters = ["А","О","У","Ы","Э","Я","Ё","Ю","И","Е","а","о","у","ы","э","я","ё","ю","и","е"];
	var reqLetter = impWord.split('').filter(function(elem){
		for (var i = 0; i < letters.length; i++) {
			if (elem == letters[i]) return true ;
		};
	});
	return alert(reqLetter.length);
};
extractLetter();

// задание 2
function enterPersData() {
	var arr = [];
	var age;
	var retir = "нет";
	var ageDay;
	var ageFive;
// задаем свою фамилию имя отчество
	checkName("имя");
	checkName("фамилию");
	checkName("отчество");
// задаем возраст
	checkAge();
// задаем пол
	var sex = confirm("ваш пол женский");
	(sex)? sex = "женский": sex = "мужской";

	return alert("Ваше ФИО: " + arr[0]+ " " +arr[1]+ " " + arr[2]+ " \n"
	+ "ваш возраст в годах: " + age +" \n" + "ваш возраст в днях: "+ ageDay+" \n"
	+ "через 5 лет вам будет: " + ageFive +" \n"+ "ваш пол: " + sex +"\n"+
	"вы на пенсии: "+ retir);
// функция к определению ФИО
	function checkName(elem) {
		var name = prompt("введите ваше " + elem);
		if (name)name = name.trim();
		if ((!name) || (name.length = 0) || (Number(name))) {
			alert("вы должны правильно указать " + elem);
			checkName(elem);
		} else {
			return arr.push(name);
		};
	};
// функция к определению возраста
	function checkAge() {
		age = prompt("введите ваш возраст");
		if ( (!age) || !(Number(age)) || (5 > Number(age)) || (Number(age) > 100) ) {
			alert("вы должны указать свой возраст");
			checkAge();
		};

		if (age > 65) {
			retir = "да";
		};

		ageFive = Number(age) + 5;
		ageDay = Number(age) * 365;
	};
};
enterPersData();