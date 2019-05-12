(function () {
  // функция-конструктор
  function Question(question, answers, correctAnswer) {
    this.question = question;
    this.answers = answers;
    this.correctAnswer = correctAnswer;
  }
  // данные для составления викторины
  var allData = {
    quest: ['when javascript was created?', 'who created javascript?', 'what method create new array in javascript?'],
    answ: [[1945, 1995, 2015], ['Lerdorf', 'Gosling', 'Eich'], ['forEach', 'filter', 'join']],
    correct: [2, 3, 2]
  };
  // создаем метод для класса, который выводит в консоль вопрос с вариантами ответов
  Question.prototype.logQuestion = function () {
    var str = '';
    for (var i = 0; i < this.answers.length; i++) {
      str += (i + 1) + '.' + this.answers[i] + '   ';
    }
    return console.log(this.question + ' \n' + str);
  };
  // функция при помощи которой, используя исходные данные, создаются объекты на основе класса Question(они собраны в массив)
  function createArrayQuestions(question, answer, correctAnswer) {
    var arr = [];
    for (var i = 0; i < question.length; i++) {
      arr.push(new Question(question[i], answer[i], correctAnswer[i]));
    }
    return arr;
  }

  var correctAnswerTrue;
  var numberAnswer;

  function Quiz() {
    // функция при помощи которой, рандомно выбирается вопрос и выводиться в консоль,
    // также сохраняем правильный ответ на данный вопрос в переменную
    function selectRondomQuestion() {
      var selectedNumberQuest = random(0, (allQuestions.length - 1));
      allQuestions[selectedNumberQuest].logQuestion();
      correctAnswerTrue = allQuestions[selectedNumberQuest].correctAnswer;
    }

    var allQuestions = createArrayQuestions(allData.quest, allData.answ, allData.correct);
    // функция при помощи которой, запрашивается ответ у пользователя и правильный
    //  ответ(в аргумент передаем сколько будет вопросов в викторине)
    function askCorrectAnswer(amountQuestion) {
      // функция для запроса ответа
      function enterAnswer() {
        do {
          numberAnswer = prompt('Укажите номер правильного ответа');
        }
        while (!numberAnswer);
      }
      var count = 0;
      var countCor = 0;
      do {
        enterAnswer();
        if (numberAnswer == correctAnswerTrue) {
          console.log('Вы ответили правильно');
          ++countCor;
        } else {
          console.log('Вы ответили неправильно');
        }
        if (count < amountQuestion - 1) {
          selectRondomQuestion();
        }
        count++;
      } while (count < amountQuestion);
      console.log('Правильных ответов: ' + countCor);
    }

    function random(min, max) {
      var rand = min + Math.random() * (max + 1 - min);
      rand = Math.floor(rand);
      return rand;
    }
    selectRondomQuestion();
    askCorrectAnswer(3);
  }
window.Quiz = Quiz;
})();
