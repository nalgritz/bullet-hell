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
  var key = {
    up   : false,
    down : false,
    left : false,
    right: false,
    start: false
  };
  // // Sound effect
  // var explosionSound = function () {
  //   new buzz.sound('sounds/explosion',
  //   { formats: ['wav']
  //   });
  // };

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
          // explosionSound();
          endTime = Date.now();
          timeLapsed = endTime - startTime;
          timeSurvived = (timeLapsed/1000).toFixed(3);
          setTimeout(function () {
            $endGame.show().effect('bounce', {times: 4}, 'slow');
            $('.bullet').remove();
          }, 1000);
          $('#time').text(timeSurvived);
          $('#bulletnumber').text(bulletAmount);
          score.push(parseFloat(timeSurvived));
          $('#bestscore').text(Math.max(...score));
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

  // Control
  var moveShip = function () {
    var shipPos = $ship.position();
    if (key.up) {
      if ( shipPos.top > 0) {
        $('#ship').css({top: shipPos.top - shipSpeed});
      } else {
        key.up = false;
      }
    }
    if (key.down) {
      if (yScreen-shipPos.top > $ship.height()) {
        $('#ship').css({top: shipPos.top + shipSpeed});
      } else {
        key.down = false;
      }
    }
    if (key.left) {
      if ( shipPos.left > 0) {
        $('#ship').css({left: shipPos.left - shipSpeed});
      } else {
        key.left = false;
      }
    }
    if (key.right) {
      if (xScreen-shipPos.left > $ship.width()) {
        $('#ship').css({left: shipPos.left + shipSpeed});
      } else {
        key.right = false;
      }
    }
  };

  var keybtn = function () {
    $(document).on('keydown', function(e){
      switch (e.keyCode) {
        case 37:
          key.left  = true;
          break;
        case 38:
          key.up    = true;
          break;
        case 39:
          key.right = true;
          break;
        case 40:
          key.down  = true;
          break;
      }
    });
    $(document).on('keyup', function(e){
      switch (e.keyCode) {
        case 37:
          key.left  = false;
          break;
        case 38:
          key.up    = false;
          break;
        case 39:
          key.right = false;
          break;
        case 40:
          key.down  = false;
          break;
      }
    });
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
      moveShip();
    }, 1000/60);
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
      $ship.css({top: '400px', left: '370px'});
      bulletAmount = 0;
      $('#endgame').hide();
      bindStart();
    })
  }

  init();
});
