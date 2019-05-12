function interviewQuestion(profession) {
  if (profession == null) {
    return function (name) {
      return 'Please, ' + name + ' enter your profession';
    };
  } else if (profession == 'designer') {
    return function (name) {
      return name + ' can you please explain what UX design is?';
    };
  } else if (profession == 'teacher') {
    return function (name) {
      return 'What subject do you teach ' + name + '?';
    };
  } else if (profession == 'other') {
    return function (name) {
      return 'Hello ' + name + ', what do you do?';
    };
  }
}

module.exports = interviewQuestion;