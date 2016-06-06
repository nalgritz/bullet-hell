$(document).ready(function () {
// Bullet
  // input new bullet
  var createBullet = function (e) {
    $screen.append($('<div class="bullet"></div>').css({
        marginTop: yPos() + 'px',
    }));

  };

  // move bullet from left to right, 2000 is bullet speed
  // any ways to move within the screen
  var moveBullet = function () {
    $('.bullet').animate({
      opacity: 1,
      left: '800',
      top : '200',
    }, {
      easing: 'linear',
      duration: 2000,
      complete: function () {
        $(this).remove();
      }
    });
  };

  var timeScore = 0;

  // set random x, y position
  var xPos = function (xScreen) {
   Math.floor( Math.random() * xScreen);
  };
  var yPos = function (yScreen) {
   Math.floor( Math.random() * yScreen);
  };


  $screen = $('#screen');

  // Screen size
  var xScreen = $screen.width();
  var yScreen = $screen.height();

  // run new bullet:
    createBullet();
    moveBullet();

  // 4 positions are:
    // marginTop: yPos + 'px', marginLeft: '0';
    // marginTop: yScreen + 'px', marginLeft: '0';
    // marginTop: '0', marginLeft: xPos + 'px';
    // marginTop: '0', marginLeft: xScreen;

  // Ship
  var $ship = $('#ship');

  var gameloop = null;
  var randomBullet = null;

  var movement = {
    up: false,
    down: false,
    left: false,
    right: false
  };

  var keyMovement = function () {
    $(document).on('keydown', function(e){
      switch (e.keyCode) {
        case 37:
          movement.left  = true;
          break;
        case 38:
          movement.up    = true;
          break;
        case 39:
          movement.right = true;
          break;
        case 40:
          movement.down  = true;
          break;
      }
    });
    $(document).on('keyup', function(e){
      switch (e.keyCode) {
        case 37:
          movement.left  = false;
          break;
        case 38:
          movement.up    = false;
          break;
        case 39:
          movement.right = false;
          break;
        case 40:
          movement.down  = false;
          break;
      }
    });
  };

  var moveShip = function () {
    var position = $ship.position();
    if (movement.up) {
      if ( position.top > 0) {
        $ship.css({top: position.top - 5});
      } else {
        movement.up = false;
      }
    }
    if (movement.down) {
      if ( (yScreen - $ship.position().top) > $ship.height()) {
        $ship.css({top: position.top + 5});
      } else {
        movement.down = false;
      }
    }
    if (movement.left) {
      if ( position.left > 0) {
        $ship.css({left: position.left - 5});
      } else {
        movement.left = false;
      }
    }
    if (movement.right) {
      if ( (xScreen - $ship.position().left) > $ship.width()) {
        $ship.css({left: position.left + 5});
      } else {
        movement.right = false;
      }
    }
  };

// Surface Collision system
      /*
      progress: function(){
        // check if the ship left surface touch the bullet
      }
      */


// Have to tidy these up; can't figure what's going on here
// init? startGame? randomBullet? resetBullet?
  var startGame = function () {
    gameloop = setInterval(function(){
      moveShip();
      keyMovement();
    }, 17);
    randomBullet = setInterval(function() {
      createBullet();
      moveBullet();
    }, 1500); //it works in constant speed
  };


  startGame();

  // Reset button, pressed reset button but gameloop / randomBullet not working
  var resetBullet = $('#reset').one('click', function () {
    $screen.remove();
    $('body').append(
      '<div class="center-block" id="screen">' +
      '<img id="ship" src="./img/ship.jpg">' +
      '</div>'
    );
    createBullet();
    moveBullet();
    startGame();
  });

  //
    $('#reset').addEventListener('click', resetBullet);

});