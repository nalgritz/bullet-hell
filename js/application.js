$(document).ready(function () {
  // Gameloop
  var gameloop = null;
  var bulletLoop = null;
  // Time
  var startTime = null;
  var endTime   = null;
  var timeLapsed = null;
  var timeSurvived = null;
  //
  var $endGame = $('#endgame');
  // Screen
  var $screen = $('#screen');
  var xScreen = 800;
  var yScreen = 800;
  // Ship
  var $ship = $('#ship');
  var shipSpeed = 4;
  // Bullet
  var $bullet  = $('<div class="bullet"></div>');
  var bulletDiameter = 5;
  var initialBullets = 1;
  var bulletAmount   = 0;
  var defaultBulletDuration = 4000;
  // keyboard
  var keys = {
    top   : false,
    right: false,
    down : false,
    left : false,
  };

  // Effect
  var $explosion = $('#explosion');
  var explosionSound = new buzz.sound('sounds/explosion.wav', {
    preload: true
  });

  // score for bestScore
  var score = [];
  // Generate bullets
  var selectSides  = function () {
    var sides       = ["top", "right", "bot", "left"];
    var startIndex  = Math.floor(Math.random() * 4);
    var startSide   = sides.splice(startIndex, 1);
    var endIndex    = Math.floor(Math.random() * 3);
    var endSide     = sides.splice(endIndex, 1);
    return startSide.concat(endSide);
  };

  var randomPos = function (side) {
    if (side === "top") {
      return [Math.floor(Math.random() * xScreen + 1 - bulletDiameter), -bulletDiameter];
    } else if (side === "right") {
      return [xScreen, Math.floor(Math.random() * yScreen + 1 + bulletDiameter)];
    } else if (side === "bot") {
      return [Math.floor(Math.random() * xScreen + 1 + bulletDiameter), yScreen];
    } else {
      return [-bulletDiameter, Math.floor(Math.random() * yScreen + 1 - bulletDiameter)];
    }
  };

  // Create bullet, animate and finish
  var createBullet = function () {
    var sides     = selectSides();
    var startSide = sides[0];
    var endSide   = sides[1];
    var startPos  = randomPos(startSide);
    var endPos    = randomPos(endSide);
    var $bullet   = $('<div class="bullet"></div>');
    var xSide     = startPos[0] - endPos[0];
    var ySide     = startPos[1] - endPos[1];
    var distance  = Math.sqrt((xSide * xSide) + (ySide * ySide));
    var pxMS      = defaultBulletDuration / 800;
    var duration  = pxMS * distance;

    $bullet.appendTo($screen).css({
      left: startPos[0],
      top : startPos[1]
    }).animate({
      opacity: 1,
      left: endPos[0],
      top : endPos[1]
    }, {
      easing: 'linear',
      duration: duration,
      complete: function() {
        createBullet();
        $(this).remove();
      },
      progress: function () {
        var shipPos   = $ship.position();
        var shipTop   = shipPos.top;
        var shipLeft  = shipPos.left;
        var bulletPos = $bullet.position();
        var stopCondition =
          bulletPos.top+bulletDiameter < shipTop+7||
          bulletPos.left > shipLeft + $ship.width()-7 ||
          bulletPos.top > shipTop + $ship.height()-5 ||
          bulletPos.left+bulletDiameter < shipLeft+7;
        if (stopCondition) {
        } else {
          clearInterval(gameloop);
          clearInterval(bulletLoop);
          $('.bullet').stop();
          explosionSound.play();
          var position = $ship.position();
          $ship.hide();
          $explosion.show().css({
            left: position.left,
            top: position.top
          })
          setTimeout(function(){
            $explosion.css({
              'background-position': '60px 0'
            });
          }, 500);
          setTimeout(function () {
            $explosion.hide();
            endTime = Date.now();
            timeLapsed = endTime - startTime;
            timeSurvived = (timeLapsed/1000).toFixed(3);
            setTimeout(function () {
              $endGame.show().effect('bounce', {times: 4}, 'slow');
              $('.bullet').remove();
            }, 1500);
            $('#time').text(timeSurvived);
            $('#bulletnumber').text(bulletAmount);
            score.push(parseFloat(timeSurvived));
            $('#bestscore').text(Math.max(...score));
          }, 600);
        }
      }
    });
  };

  var generateBullet = function () {
    bulletAmount = initialBullets;
    var bulletNumber = initialBullets;
    for (var i = 0; i < bulletNumber; i++ ) {
      createBullet();
    }
    // bullet comes in every timeInterval
    bulletLoop = setInterval(function() {
      createBullet();
      bulletAmount++;
    }, 1000);
  };

  //
  var setActiveMovement = function (e) {
    var keyCode = e.keyCode;

    if (keyCode < 37 || keyCode > 40) {
      return false;
    }

    var active = e.type === 'keydown' ? true : false;

    e.preventDefault();
    switch (keyCode) {
      case 38:
        keys["top"] = active;
        break;
      case 39:
        keys["right"] = active;
        break;
      case 40:
        keys["down"] = active;
        break;
      case 37:
        keys["left"] = active;
        break;
    }
  };

  // Key detection
  var keybtn = function(){
    document.addEventListener('keydown', setActiveMovement);
    document.addEventListener('keyup', setActiveMovement);
  };

  // Control
  var moveShip = function (x, y) {
    var shipPos = $ship.position();
    $ship.css({left: shipPos.left+x*shipSpeed});
    $ship.css({top : shipPos.top +y*shipSpeed});
  };

  // Character control
  var dectectShipMovement = function () {
    var shipPos = $ship.position();
    if (keys.left) {
      if ( shipPos.left > 0) {
        moveShip(-1,0);
      } else {
        shipPos.left += 0;
      }
    }
    if (keys.down) {
      if (yScreen-shipPos.top > $ship.height()) {
        moveShip(0,1);
      } else {
        shipPos.top += 0;
      }
    }
    if (keys.right) {
      if (xScreen-shipPos.left > $ship.width()) {
        moveShip(1,0);
      } else {
        shipPos.left += 0;
      }
    }
    if (keys.top) {
      if ( shipPos.top > 0) {
        moveShip(0,-1);
      } else {
        shipPos.top += 0;
      }
    }
  };

  var bindStart = function () {
    $(document).off('keypress').one('keypress', function(e){
      if (e.keyCode === 32) {
        startGame();
      }
    });
  };

  var startGame = function () {
    startTime = Date.now();
    generateBullet();
    gameloop = setInterval(function(){
      dectectShipMovement();
    }, 1000/60);
    $explosion.hide();
  };

  var init = function () {
    keybtn();
    bindStart();
    bindResetBtn();
  };

  var bindResetBtn = function () {
    $('#reset').on('click', function () {
      clearInterval(gameloop);
      clearInterval(bulletLoop);
      $('.bullet').stop().remove();
      $ship.css({top: '400px', left: '370px'}).show();
      bulletAmount = 0;
      $('#endgame').hide();
      $('#reset').blur();
      bindStart();
    });
  };

  init();
});