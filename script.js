const radiusClockFace = 100; // радиус циферблата
const radiusNumber = 10; // радиус цифры
// создаем циферблат, описываем его ширину-высоту, и добавляем css-класс
var createClockFace = document.createElement('div');
var contain = document.querySelector('.container');
var clockFace = contain.appendChild(createClockFace);
clockFace.style.width = (radiusClockFace * 2) + 'px';
clockFace.style.height = (radiusClockFace * 2) + 'px';
clockFace.className = 'clock-face';
// находим координаты центра циферблата
var centerClockFaceX = clockFace.offsetWidth / 2;
var centerClockFaceY = clockFace.offsetHeight / 2;
// создаем электрон. часы
var createElectrClock = document.createElement('div');
var ElectrClock = clockFace.appendChild(createElectrClock);
ElectrClock.style.position = 'absolute';
ElectrClock.style.top = '25%';
ElectrClock.style.left = '36%';

for (var i = 1; i <= 12; i++) { // отображаемый час
  var createclockNumber = document.createElement('div'); // создаем цифру
  var angle = i / 12 * Math.PI * 2; // отображаемый угол в радианах
  var x = centerClockFaceX + Math.sin(angle) * (radiusClockFace - 20); // проверяем - для угла=0 sin=0
  var y = centerClockFaceY - Math.cos(angle) * (radiusClockFace - 20); // проверяем - для угла=0 cos=1
  // итого цифра 12 (=0) окажется в X=CX, Y=CY-R.
  var clockNumber = clockFace.appendChild(createclockNumber);
  clockNumber.style.width = (radiusNumber * 2) + 'px';
  clockNumber.style.height = (radiusNumber * 2) + 'px';
  clockNumber.className = 'clock-number';
  clockNumber.style.left = Math.round(x - clockNumber.offsetWidth / 2) + 'px';
  clockNumber.style.top = Math.round(y - clockNumber.offsetHeight / 2) + 'px';
  clockNumber.innerHTML = i;
}

setInterval(ticTac, 1000);
// создаем стрелки
var HandHour = getHand('div', clockFace, 'hand hand-hour');
var HandMin = getHand('div', clockFace, 'hand hand-min');
var HandSec = getHand('div', clockFace, 'hand hand-sec');

function ticTac() {
  var now = new Date();
  var seconds = now.getSeconds();
  var secondsDeg = ((seconds / 60) * 360) -90;
  HandSec.style.transform = 'rotate(' + secondsDeg + 'deg)';
  var minutes = now.getMinutes();
  var minutesDeg = ((minutes / 60) * 360);
  HandMin.style.transform = 'rotate(' + minutesDeg + 'deg)';
  var hour = now.getHours();
  ElectrClock.innerHTML = Str0L(hour, 2) + ':' +
  Str0L(minutes, 2) + ':' + Str0L(seconds, 2);
  if ((hour) > 12) {
    hour = hour - 13;
  }
  var hourDeg = ((hour / 12) * 360) - 90;
  HandHour.style.transform = 'rotate(' + hourDeg + 'deg)';
}

function getHand(selector, parent, classEl) {
  var createElem;
  var appendElem;
  createElem = document.createElement(selector);
  appendElem = parent.appendChild(createElem);
  appendElem.className = classEl;
  appendElem.style.top = radiusClockFace + 'px';
  appendElem.style.left = radiusClockFace + 'px';
  return appendElem;
}
// дополняет строку Val слева нулями до длины Len
function Str0L(Val, Len) {
  var StrVal = Val.toString();
  while (StrVal.length < Len)
    StrVal = '0' + StrVal;
  return StrVal;
}
