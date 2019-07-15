/**
 * Created by Андрей on 14.06.2019.
 */
const FIELD_WIDTH = 400; //ширина игрового поля
const FIELD_HEIGHT = 300; //высота игрового поля
const RACKET_HEIGHT = 70; //высота ракетки
const RACKET_WIDTH = 5; //высота ракетки
const BALL_WIDTH = 15; //ширина мяча
const BALL_HEIGHT = 15; //высота мяча

var scoreboard = document.querySelector('.scoreboard');
var ourBall = document.querySelector('.ball');
var left = document.querySelector('.left');
var right = document.querySelector('.right');
var field = document.querySelector('.field');
var input = document.querySelector('input');
var RequestAnimationFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };

var ball = new Ball(ourBall);
var leftRacket = new Racket(left);
var rightRacket = new Racket(right);

document.addEventListener('keyup', keyUp);
document.addEventListener('keydown', keyDown);
input.addEventListener('click', go);

function Racket(racket) {
  var self = this;
  self.count = 0;
  self.speedY = 0;
  self.topRacket = 0;
  self.update = function () {
    self.topRacket = self.topRacket + self.speedY;
    racket.style.transform = 'translateY(' + self.topRacket + 'px)' + 'translateZ(0)';
    if (self.topRacket <= -(FIELD_HEIGHT / 2 - RACKET_HEIGHT / 2)) {
      self.topRacket = -(FIELD_HEIGHT / 2 - RACKET_HEIGHT / 2);
      racket.style.transform = 'translateY(' + '-' + (FIELD_HEIGHT / 2 - RACKET_HEIGHT / 2) + 'px)' + 'translateZ(0)';
    } else if (self.topRacket >= (FIELD_HEIGHT / 2 - RACKET_HEIGHT / 2)) {
      self.topRacket = (FIELD_HEIGHT / 2 - RACKET_HEIGHT / 2);
      racket.style.transform = 'translateY(' + (FIELD_HEIGHT / 2 - RACKET_HEIGHT / 2) + 'px)' + 'translateZ(0)';
    }
  };
}

function Ball(ball) {
  var self = this;
  self.speedX = 0;
  self.speedY = 0;
  self.topBall = 0;
  self.leftBall = 0;
  self.update = function () {
    self.topBall = self.topBall + self.speedY;
    self.leftBall = self.leftBall + self.speedX;
    ball.style.transform = 'translateX(' + self.leftBall + 'px)' + 'translateY(' + self.topBall + 'px)' + 'translateZ(0)';
  };
  self.moveRacket = function () {
    return !!(self.speedX || self.speedY);
  };
  self.controlHit = function (box, rP, lP, translRacket) {
    // vertic
    if (self.leftBall >= ((FIELD_WIDTH - BALL_HEIGHT) / 2)) {
      if (self.moveRacket()) {
        self.speedX = self.speedY = 0;
        if (self.topBall < 0) {
          ball.style.top = (FIELD_HEIGHT / 2 - self.topBall) + 'px';
        }
        ball.style.top = (FIELD_HEIGHT / 2 + self.topBall) + 'px';
        self.leftBall = 0;
        self.topBall = 0;
        ball.style.left = FIELD_WIDTH - BALL_HEIGHT + 'px';
        lP.count++;
        self.updateScore(box, lP.count, rP.count);
      }
    } else if (self.leftBall <= -((FIELD_WIDTH - BALL_HEIGHT) / 2)) {
      if (self.moveRacket()) {
        self.speedX = self.speedY = 0;
        if (self.topBall < 0) {
          ball.style.top = (FIELD_HEIGHT / 2 - self.topBall) + 'px';
        }
        ball.style.top = FIELD_HEIGHT / 2 + self.topBall + 'px';
        self.leftBall = 0;
        self.topBall = 0;
        ball.style.left = '0px';
        rP.count++;
        self.updateScore(box, lP.count, rP.count);
      }
    };
    // horiz
    if (self.topBall <= -(FIELD_HEIGHT - BALL_HEIGHT) / 2) {
      self.speedY = -self.speedY;
    } else if (self.topBall >= (FIELD_HEIGHT - BALL_HEIGHT) / 2) {
      self.speedY = -self.speedY;
    }
    // hit
    // left
    if (self.leftBall <= -((FIELD_WIDTH - BALL_HEIGHT) / 2 - RACKET_WIDTH) &&
      self.topBall - (RACKET_HEIGHT / 2 - BALL_HEIGHT / 2) <= translRacket[1] &&
      self.topBall - (RACKET_HEIGHT / 2 - BALL_HEIGHT / 2) >= translRacket[1] - RACKET_HEIGHT) {
      if (self.moveRacket()) {
        self.leftBall = -((FIELD_WIDTH - BALL_HEIGHT) / 2 - RACKET_WIDTH);
        self.speedX = -self.speedX;
      }
    }
    // right
    if (self.leftBall >= (FIELD_WIDTH - BALL_HEIGHT) / 2 - RACKET_WIDTH &&
      self.topBall - (RACKET_HEIGHT / 2 - BALL_HEIGHT / 2) <= translRacket[0] &&
      self.topBall - (RACKET_HEIGHT / 2 - BALL_HEIGHT / 2) >= translRacket[0] - RACKET_HEIGHT) {
      if (self.moveRacket()) {
        self.leftBall = (FIELD_WIDTH - BALL_HEIGHT) / 2 - RACKET_WIDTH;
        self.speedX = -self.speedX;
      }
    }
  };

  self.randomInteger = function (min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand) * ((Math.random() < 0.5) ? -1 : 1);
    return rand;
  };

  self.updateScore = function (scoreBox, countLeft, countRight) {
    scoreBox.textContent = countLeft + ':' + countRight;
  };
};

function init() {
  ourBall.style.left = FIELD_WIDTH / 2 - BALL_WIDTH / 2 + "px";
  ourBall.style.top = FIELD_HEIGHT / 2 - BALL_HEIGHT / 2 + "px";
  left.style.top = FIELD_HEIGHT / 2 - RACKET_HEIGHT / 2 + "px";
  right.style.top = FIELD_HEIGHT / 2 - RACKET_HEIGHT / 2 + "px";
  RequestAnimationFrame(start);
}

init();

function start() {
  ball.update();
  ball.controlHit(scoreboard, rightRacket, leftRacket, [rightRacket.topRacket, leftRacket.topRacket]);
  leftRacket.update();
  rightRacket.update();
  RequestAnimationFrame(start);
}

function go() {
  ourBall.style.left = FIELD_WIDTH / 2 - BALL_WIDTH / 2 + "px";
  ourBall.style.top = FIELD_HEIGHT / 2 - BALL_HEIGHT / 2 + "px";
  ball.speedX = ball.randomInteger(1, 2);
  ball.speedY = ball.randomInteger(1, 2);
}

function keyDown(e) {
  switch (e.keyCode) {
    case 16:
      leftRacket.speedY = -2;
      break;
    case 17:
      leftRacket.speedY = 2;
      break;
    case 38:
      rightRacket.speedY = -2;
      break;
    case 40:
      rightRacket.speedY = 2;
      break;
    default:
      break;
  }
}

function keyUp() {
  leftRacket.speedY = 0;
  rightRacket.speedY = 0;
}