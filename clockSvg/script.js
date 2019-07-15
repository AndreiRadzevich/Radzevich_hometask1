'use strict';
const baseRadius = 150; //радиус циферблата
const circleRadius = 20; // радиус кружков с цифрами
const wrapper = document.getElementById('wrapper');

wrapper.appendChild(createWatch());
setInterval(tickTimer, 1000);

// UI

function createWatch() {
  let base = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
  base.id = 'base';
  base.setAttribute("width", baseRadius * 2);
  base.setAttribute("height", baseRadius * 2);
  base.appendChild(createClockDail());
  base.appendChild(createClockFace());
  base.appendChild(createArrow('black', 6, 'hours'));
  base.appendChild(createArrow('black', 4, 'minutes'));
  base.appendChild(createArrow('red', 2, 'seconds'));
  return base;
}

function createClockDail() {
  let dail = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
  dail.setAttribute("stroke", "lavender");
  dail.setAttribute("fill", "LightBlue");
  dail.setAttribute("r", baseRadius);
  dail.setAttribute("cx", baseRadius);
  dail.setAttribute("cy", baseRadius);
  return dail;
}

function createClockFace() {
  let clockFace = document.createDocumentFragment();
  for (let number = 1; number <= 12; number++) {
    let angle = (number + 9) * 30 / 180 * Math.PI;
    let y = baseRadius + Math.sin(angle) * (baseRadius - 30);
    let x = baseRadius + Math.cos(angle) * (baseRadius - 30);
    clockFace.appendChild(createHourCircle(x, y));
    clockFace.appendChild(createText(x, y, number));
  }
  return clockFace;
}

function createHourCircle(circleX, circleY) {
  let circle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
  circle.setAttribute("fill", "PaleTurquoise");
  circle.setAttribute("r", circleRadius);
  circle.setAttribute("cx", circleX);
  circle.setAttribute("cy", circleY);
  return circle;
}

function createText(circleX, circleY, num) {
  let txt = document.createElementNS("http://www.w3.org/2000/svg", 'text');
  txt.setAttribute("x", circleX);
  txt.setAttribute("y", circleY);
  txt.setAttribute("text-anchor", 'middle');
  txt.setAttribute("dy", '5');
  txt.style.fill = "Teal";
  txt.innerHTML = num;
  return txt;
}

function createArrow(arrowType, arrowWidth, arrowClass) {
  let arrow = document.createElementNS("http://www.w3.org/2000/svg", 'line');
  arrow.setAttribute("x1", baseRadius);
  arrow.setAttribute("y1", baseRadius);
  arrow.setAttribute("x2", baseRadius);
  arrow.setAttribute("y2", 40);
  arrow.setAttribute("stroke", arrowType);
  arrow.setAttribute("stroke-width", arrowWidth);
  arrow.setAttribute('class', arrowClass);
  return arrow;
}

// Logic

function tickTimer() {
  let now = new Date();
  let thisSecond = now.getSeconds();
  let thisMinute = now.getMinutes();
  let thisHour = now.getHours();
  updateWatch(thisHour, thisMinute, thisSecond);
  updateDigitalWatch(thisHour, thisMinute, thisSecond);
}

function updateWatch(hour, minute, second) {
  let thisSecondRotate = (second / 60) * 360;
  let thisMinuteRotate = (minute / 60) * 360;
  let thisHourRotate = ((hour) + minute / 60) / 12 * 360;
  rotateHandle('seconds', thisSecondRotate);
  rotateHandle('minutes', thisMinuteRotate);
  rotateHandle('hours', thisHourRotate);
}

function rotateHandle(handle, degree) {
  let arrow = document.querySelector(`.${handle}`);
  arrow.setAttribute("transform", `rotate(${degree}, 150, 150)`);
}