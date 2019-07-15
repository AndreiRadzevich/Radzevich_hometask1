/**
 * Created by Андрей on 09.06.2019.
 */
const FIELD_WIDTH = 400; //ширина игрового поля
const FIELD_HEIGHT = 300; //высота игрового поля
const RACKET_WIDTH = 15; //ширина ракетки
const RACKET_HEIGHT = 70; //высота ракетки

var racketLeft = new Racket('left', 'rack1');
var racketRight = new Racket('right', 'rack2');
var RequestAnimationFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };
var scoreboard = document.querySelector('.scoreboard');
var input = document.querySelector('input');
input.addEventListener('click', start);
document.addEventListener('keyup', keyUp);
document.addEventListener('keydown', keyDown);
//объект мяч
var BallH = {
  PosX: 0,
  PosY: 0,
  SpeedX: 0,
  SpeedY: 0,
  width: 30,
  height: 30,
  PosCenterX: 0,
  PosCenterY: 0,

  Update: function () {
    var BallObj = document.getElementById('IBall');
    BallObj.style.left = this.PosX + "px";
    BallObj.style.top = this.PosY + "px";
  },

  createBall: function () {
    var BallObj = document.createElement('div');
    BallObj.style.background = "black";
    BallObj.style.position = "absolute";
    BallObj.style.width = this.width + "px";
    BallObj.style.height = this.height + "px";
    BallObj.style.borderRadius = '50% 50%';
    BallObj.id = "IBall";
    this.PosCenterX = FIELD_WIDTH / 2 - this.width / 2 + "px";
    this.PosCenterY = FIELD_HEIGHT / 2 - this.height / 2 + "px";
    BallObj.style.left = this.PosCenterX;
    BallObj.style.top = this.PosCenterY;
    this.PosX = parseFloat(BallObj.style.left);
    this.PosY = parseFloat(BallObj.style.top);
    return BallObj;
  }
};
//класс для создания ракеток
function Racket(position, racketClass) {
  if (position == 'left') {
    var x = 0;
  } else {
    x = FIELD_WIDTH - RACKET_WIDTH;
  }
  var y = FIELD_HEIGHT / 2 - RACKET_HEIGHT / 2;
  this.PosX = x;
  this.PosY = y;
  this.score = 0;
  this.width = RACKET_WIDTH;
  this.height = RACKET_HEIGHT;
  this.speedUp = 0;
  this.speedDown = 0;
  this.createRacket = function () {
    var racketObj = document.createElement('div');
    racketObj.style.left = this.PosX + "px";
    racketObj.style.top = this.PosY + "px";
    racketObj.style.background = "red";
    racketObj.style.position = "absolute";
    racketObj.style.width = this.width + "px";
    racketObj.style.height = this.height + "px";
    racketObj.className = racketClass;
    return racketObj;
  }
}

function createField() {
  var container = document.querySelector('.container');
  var scoreboard = document.querySelector('.scoreboard');
  scoreboard.textContent = '0 : 0';
  var fieldObj = document.createElement('div');
  fieldObj.className = 'field';
  fieldObj.style.width = FIELD_WIDTH + "px";
  fieldObj.style.height = FIELD_HEIGHT + "px";
  fieldObj.appendChild(racketLeft.createRacket());
  fieldObj.appendChild(racketRight.createRacket());
  fieldObj.appendChild(BallH.createBall());
  container.appendChild(fieldObj);
}

createField();

function keyUp(e) {
  switch (e.keyCode) {
    case 16:
      racketLeft.speedUp = 0;
      break;
    case 17:
      racketLeft.speedDown = 0;
      break;
    case 38:
      racketRight.speedUp = 0;
      break;
    case 40:
      racketRight.speedDown = 0;
      break;
    default:
      break;
  }
}

function keyDown(e) {
  switch (e.keyCode) {
    case 16:
      racketLeft.speedUp = 2;
      break;
    case 17:
      racketLeft.speedDown = 2;
      break;
    case 38:
      racketRight.speedUp = 2;
      break;
    case 40:
      racketRight.speedDown = 2;
      break;
    default:
      break;
  }
}
// движение левой ракетки вверх
function goLeftUp() {
  var racket = document.querySelector('.rack1');
  var top = parseFloat(racket.style.top) - racketLeft.speedUp;
  racket.style.top = top + 'px';
  if (parseFloat(racket.style.top) <= 0) { racket.style.top = 0; }
  RequestAnimationFrame(goLeftUp);
}
// движение левой ракетки вниз
function goLeftDown() {
  var racket = document.querySelector('.rack1');
  var field = document.querySelector('.field');
  var top = parseFloat(racket.style.top) + racketLeft.speedDown;
  var boardDown = parseFloat(field.style.height) - parseFloat(racket.style.height);
  racket.style.top = top + 'px';
  if (parseFloat(racket.style.top) >= boardDown) { racket.style.top = boardDown + 'px'; }
  RequestAnimationFrame(goLeftDown);
}
// движение правой ракетки вверх
function goRightUp() {
  var racket = document.querySelector('.rack2');
  var top = parseFloat(racket.style.top) - racketRight.speedUp;
  racket.style.top = top + 'px';
  if (parseFloat(racket.style.top) <= 0) { racket.style.top = 0; }
  RequestAnimationFrame(goRightUp);
}
// движение правой ракетки вниз
function goRightDown() {
  var racket = document.querySelector('.rack2');
  var field = document.querySelector('.field');
  var top = parseFloat(racket.style.top) + racketRight.speedDown;
  var boardDown = parseFloat(field.style.height) - parseFloat(racket.style.height);
  racket.style.top = top + 'px';
  if (parseFloat(racket.style.top) >= boardDown) { racket.style.top = boardDown + 'px'; }
  RequestAnimationFrame(goRightDown);
}

function Tick() {
  var field = document.querySelector('.field');
  var racket2 = document.querySelector('.rack2');
  var racket1 = document.querySelector('.rack1');
  BallH.PosX += BallH.SpeedX;
  // если словил правой ракеткой
  if (BallH.PosX + BallH.width > parseFloat(racket2.style.left)
    && BallH.PosY > (parseFloat(racket2.style.top) - (BallH.width / 2))
    && BallH.PosY < parseFloat(racket2.style.top) + parseFloat(racket2.style.height)) {
    BallH.SpeedX = -BallH.SpeedX;
    BallH.PosX = parseFloat(racket2.style.left) - BallH.width;
  } else if (BallH.PosX + BallH.width > parseFloat(racket2.style.left)) { // если не словил правой ракеткой
    BallH.SpeedX = 0;
    BallH.SpeedY = 0;
    BallH.PosX = parseFloat(field.style.width) - BallH.width;
    racketRight.speedUp = 0;
    racketRight.speedDown = 0;
    racketLeft.score++;
  }
  // если словил левой ракеткой
  if (BallH.PosX < parseFloat(racket1.style.width) && BallH.PosY > (parseFloat(racket1.style.top)
    - (BallH.width / 2)) && BallH.PosY < parseFloat(racket1.style.top) + parseFloat(racket1.style.height)) {
    BallH.SpeedX = -BallH.SpeedX;
    BallH.PosX = parseFloat(racket1.style.width);
  } else if (BallH.PosX < parseFloat(racket1.style.width) && (BallH.PosY < parseFloat(racket1.style.top) // если не словил левой ракеткой
    || BallH.PosY > (parseFloat(racket1.style.top) + parseFloat(racket1.style.height)))) {
    racketLeft.speedUp = 0;
    racketLeft.speedDown = 0;
    BallH.SpeedX = 0;
    BallH.SpeedY = 0;
    BallH.PosX = 0;
    racketRight.score++;
  }
  BallH.PosY += BallH.SpeedY;
  // вылетел ли мяч ниже пола?
  if (BallH.PosY + BallH.height > parseFloat(field.style.height)) {
    BallH.SpeedY = -BallH.SpeedY;
    BallH.PosY = parseFloat(field.style.height) - BallH.height;
  }
  // вылетел ли мяч выше потолка?
  if (BallH.PosY < 0) {
    BallH.SpeedY = -BallH.SpeedY;
    BallH.PosY = 0;
  }
  // записываем счет
  scoreboard.textContent = racketLeft.score + ' : ' + racketRight.score;
  BallH.Update();
  // если ракетка отбила
  if (0 < BallH.PosX && (BallH.PosX + BallH.width) < parseFloat(field.style.width)) {
    RequestAnimationFrame(Tick);
  }
}

function start() {
  BallH.SpeedX = randomInteger(1, 2);
  BallH.SpeedY = randomInteger(1, 2);
  BallH.PosX = parseFloat(BallH.PosCenterX);
  BallH.PosY = parseFloat(BallH.PosCenterY);
  Tick();
}

goLeftUp();
goLeftDown();
goRightUp();
goRightDown();

function randomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand) * ((Math.random() < 0.5) ? -1 : 1);
  return rand;
}
