$(document).ready(function () {
  // Gameloop
  var gameloop = null;

  // Time
  var startTime = null;
  var endTime   = null;
  var timeSurvived = Math.floor((endTime - startTime)/60)+'.'+(endTime - startTime)%60;

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

  // Winning condition
  var winningCondition = {
    time: timeSurvived,

  }

  var scoreTime = function () {
    return 'you survived for ' + timeSurvived + '. Try again?'
  }

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
  }

  // ***Task left
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
      left: endPos[0], // x end point
      top : endPos[1]  // y end point
    }, {
      easing: 'linear',
      duration: duration, // however this duration may speed up or slow down depends on bullet distance
      complete: function() {
        createBullet();
        $(this).remove();
      },
      progress: function () {
        var shipPosition = $ship.position();
        var shipTop      = shipPosition.top;
        // here is collision condition
      }
    });
  };

  var generateBullet = function () {
    bulletAmount = initialBullets;
    var bulletNumber = initialBullets;
    for (var i = 0; i < bulletNumber; i++ ) {
      createBullet();
    };
    setInterval(function() {createBullet()}, 1000)
  }

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
    $(document).on('keypress', function(e){
      if (e.keyCode === 32) {
        startGame();
        startTime = Date.now();
      }
    })
  };

  var startGame = function () {
    generateBullet();
    gameloop = setInterval(function(){
      moveShip();
    }, 1000/60);
  };

  // Game over (collision system),
  //    key = false;
  //    EndTime = Date.now();

  //    bullets stop moving;
  //    current time - prev time (in terms of ms) return in s & ms

  //  Reset Button
  //
  //  var resettimer = function () { startTIme = null; endTime = null};


/*
  $(document).on('click', function () {
    resetGame();
  })
*/

/*
  var stopCondition =
    // bulletPos.top + 5 == shipPos.top ||
    bulletPos.left == shipPos.left + $ship.width()
    // bulletPos.top == shipPos.top + $ship.height() ||
    // bulletPos.left + 5 == shipPos.left;

  var stopGame = function () {
    if (stopCondition) {
      console.log('touch');
    }
  }
*/


  var init = function () {
    keybtn();
  };

  init();
});