$(document).ready(function () {


  // Screen
  var $screen = $('.screen');
  var xScreen = Math.round($screen.width());
  var yScreen = Math.round($screen.height());

  // Ship
  var $ship = $('#ship');

  // keyboard
  var key = {
    up   : false,
    down : false,
    left : false,
    right: false,
    start: false
  };

  // Gameloop
  var gameloop = null;

  // set random x, y position
  var x = function(e) {
   return Math.floor( Math.random() * xScreen);
  };
  var y = function (e) {
   return Math.floor( Math.random() * yScreen);
  };

  // Bullet coords, x()/y() only return the same number
  var bulletCoords = function () {
    return [
      [x() , 0      ], // top
      [xScreen, y() ], // left
      [x() , yScreen], // bottom
      [0      , y() ], // right
      ];
  }

/*
// trying to generate the values of 3 other sides
  function GetValue() {
    var xRandom = bulletCoords[Math.floor(Math.random() * bulletCoords().length)];
    var yRandom = bulletCoords[Math.floor(Math.random() * bulletCoords().length)];
  }
*/
  // Bullet
  var $bullet = $('<div class="bullet"></div>')

  // input new bullet
  var createBullet = function (e) {
    $screen.append($bullet);
  };

  // move bullet from left to right, 3000 is bullet speed
  var moveBullet = function () {
    $bullet.animate({
      opacity: 1,
      left: bulletCoords()[1][0], // end point
      top : bulletCoords()[1][1], // end point
    }, {
      easing: 'linear',
      duration: 3000, // however this duration may speed up or slow down depends on bullet distance
      complete: function(){
        $(this).remove();
      }
    });
  };

    for (var i = 0; i < bulletCoords().length ; i++) {
      createBullet();
      $bullet.css({
        left: bulletCoords()[i][0] + 'px',
        top : bulletCoords()[i][1] + 'px'
      });
      i++;
      moveBullet();
      };

    /*,
    progress: function(){
      // surface collision
      // check if the ship left surface touch the bullet
    }*/

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

  // for start key,
  // 1. spacebar key is to start game;
  // 2. if game is stopped, spacebar key turns available to press
/*
  $(document).on('click', function () {
    resetGame();
  })
*/

  var moveShip = function () {
    var position = $ship.position();
    if (key.up) {
      if ( position.top > 0) {
        $('#ship').css({top: position.top - 5});
      } else {
        key.up = false;
      }
    }
    if (key.down) {
      if ( (yScreen - $ship.position().top) > $ship.height()) {
        $('#ship').css({top: position.top + 5});
      } else {
        key.down = false;
      }
    }
    if (key.left) {
      if ( position.left > 0) {
        $('#ship').css({left: position.left - 5});
      } else {
        key.left = false;
      }
    }
    if (key.right) {
      if ( (xScreen - $ship.position().left) > $ship.width()) {
        $('#ship').css({left: position.left + 5});
      } else {
        key.right = false;
      }
    }
  };

  var startGame = function () {
    gameloop = setInterval(function(){
      moveShip();
      keybtn();
    }, 17);
  };

  createBullet();
  moveBullet();
  startGame();


});