/**
 * Created by Андрей on 02.06.2019.
 */
const radiusClockFace = 100; // радиус циферблата
const radiusNumber = 10; // радиус цифры
var contain = document.querySelector('.container');
contain.appendChild(createClockFace());
setInterval(ticTac, 1000);
// UI
function createClockFace() {
  var clockFace = document.createElement('div');
  clockFace.style.width = (radiusClockFace * 2) + 'px';
  clockFace.style.height = (radiusClockFace * 2) + 'px';
  clockFace.className = 'clock-face';
  clockFace.appendChild(ElectrClock());
  clockFace.appendChild(createclockNumber());
  clockFace.appendChild(getHand('div', 'hand hand-hour'));
  clockFace.appendChild(getHand('div', 'hand hand-min'));
  clockFace.appendChild(getHand('div', 'hand hand-sec'));
  return clockFace;
}

function createclockNumber() {
  var containClockNumber = document.createDocumentFragment();
  for (var i = 1; i <= 12; i++) { // отображаемый час
    var angle = i / 12 * Math.PI * 2; // отображаемый угол в радианах
    var circleX = radiusClockFace + Math.sin(angle) * (radiusClockFace - 20); // проверяем - для угла=0 sin=0
    var circleY = radiusClockFace - Math.cos(angle) * (radiusClockFace - 20); // проверяем - для угла=0 cos=1
    // итого цифра 12 (=0) окажется в X=CX, Y=CY-R.
    containClockNumber.appendChild(clockNumber(circleX, circleY, i));
  }
  return containClockNumber;
}

function ElectrClock() {
  var ElectrClock = document.createElement('div');
  ElectrClock.style.position = 'absolute';
  ElectrClock.style.top = '30%';
  ElectrClock.style.left = '40%';
  ElectrClock.className = 'clock-electr';
  return ElectrClock;
}

function clockNumber(x, y, number) {
  var createNumber = document.createElement('div');
  createNumber.style.width = (radiusNumber * 2) + 'px';
  createNumber.style.height = (radiusNumber * 2) + 'px';
  createNumber.className = 'clock-number';
  createNumber.style.left = Math.round(x - createNumber.offsetWidth / 2) + 'px';
  createNumber.style.top = Math.round(y - createNumber.offsetHeight / 2) + 'px';
  createNumber.innerHTML = number;
  return createNumber;
}

function getHand(selector, classEl) {
  var createElem = document.createElement(selector);
  createElem.className = classEl;
  createElem.style.top = radiusClockFace + 'px';
  createElem.style.left = radiusClockFace + 'px';
  return createElem;
}
// Logic
function ticTac() {
  var now = new Date();
  var seconds = now.getSeconds();
  var minutes = now.getMinutes();
  var hour = now.getHours();
  var secondsDeg = ((seconds / 60) * 360) - 90;
  rotateHandle('hand-sec', secondsDeg);
  var minutesDeg = ((minutes / 60) * 360);
  rotateHandle('hand-min', minutesDeg);
  var hourDeg = (hour + minutes / 60) / 12 * 360 - 90;
  rotateHandle('hand-min', hourDeg);
  var elecrCl = document.querySelector('.clock-electr');
  elecrCl.innerHTML = Str0L(hour, 2) + ':' +
  Str0L(minutes, 2) + ':' + Str0L(seconds, 2);
}

function rotateHandle(handle, degree) {
  let arrow = document.querySelector(`.${handle}`);
  arrow.style.transform = `rotate(${degree}deg)`;
}
// дополняет строку Val слева нулями до длины Len
function Str0L(Val, Len) {
  var StrVal = Val.toString();
  while (StrVal.length < Len)
    StrVal = '0' + StrVal;
  return StrVal;
}