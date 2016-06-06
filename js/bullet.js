$(document).ready(function () {

// Bullet
  // input new bullet
  var createBullet = function (e) {
    $screen.append($bullet);
  };

  // move bullet from left to right, 2000 is bullet speed
  // any ways to move within the screen
  var moveBullet = function () {
    $bullet.animate({
      opacity: 1,
      left: '800',
      top : '200',
    }, {
      easing: 'linear',
      duration: 3000,
      complete: function(){
        $(this).remove();
    }

  // new bullet:


      /*,
      progress: function(){
        // surface collision
        // check if the ship left surface touch the bullet
      }*/
    });
  };

/*
// found inputting .animate left & top gives moving with slopes, have to set up 4 conditions
  var bulletDirection = [
    '{left: xPos, top: '0'}',
    '{left: xScreen, top: '0'}',
    '{left: '0', top: yPos}',
    '{left: '0', top: yScreen}'
    ];
*/

  // set x,y total screen distance <---should set function to move across the screen (cos diagonal is longer than 800px)
  $screen = $('.screen');

  var xScreen = $screen.width();
  var yScreen = $screen.height();

  // set random x, y position
  var xPos = function(e) {
   return Math.round( Math.random() * xScreen);
  };

  var yPos = function (e) {
   return Math.round( Math.random() * yScreen);
  };

  // Define bullet
  // how to random need 4 positions?
  var $bullet = $('<div class="bullet"></div>').css({
    marginTop: yPos() + 'px',
  });
  // 4 positions are:
    // marginTop: yPos + 'px', marginLeft: '0';
    // marginTop: yScreen + 'px', marginLeft: '0';
    // marginTop: '0', marginLeft: xPos + 'px';
    // marginTop: '0', marginLeft: xScreen;


  // testing to loop new bullet & move but the bullet reappear at the same location & direction

    createBullet();
    moveBullet();

/*
// bullet ref which shoot out of object
// Bullet class
function Bullet(x, y, speed, angle,  width, height, colors){
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.angle = angle;
    this.width = width;
    this.height = height;
    this.colors = colors;
    this.frameCounter = 0;
}

Bullet.prototype.update = function(){
    // (!) here we calculate the vector (vx, vy) that represents the velocity
    var vx = this.speed * Math.cos(this.angle-(Math.PI/2));
    var vy = this.speed * Math.sin(this.angle-(Math.PI/2));

    // move the bullet
    this.x += vx;
    this.y += vy;
}

Bullet.prototype.draw = function(context, xScroll,  yScroll){
    context.save();

    if(this.angle != 0) {
        // translate to the orign of system
        context.translate(this.x-xScroll, this.y-yScroll);
        // rotate
        context.rotate(this.angle);
        // translate back to actual position
        context.translate(xScroll-this.x, yScroll-this.y);
    }
    // animate the bullets (changing colors)
    context.fillStyle = this.colors[this.frameCounter % this.colors.length];
    this.frameCounter++;

    // draw the bullet
    context.fillRect((this.x-this.width/2) - xScroll, (this.y-this.height/2) - yScroll, this.width, this.height);

    context.restore();
}
*/

  // Ship
  var $ship = $('#ship');

  var gameloop = null;

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
        $('#ship').css({top: position.top - 5});
      } else {
        movement.up = false;
      }
    }
    if (movement.down) {
      if ( (yScreen - $ship.position().top) > $ship.height()) {
        $('#ship').css({top: position.top + 5});
      } else {
        movement.down = false;
      }
    }
    if (movement.left) {
      if ( position.left > 0) {
        $('#ship').css({left: position.left - 5});
      } else {
        movement.left = false;
      }
    }
    if (movement.right) {
      if ( (xScreen - $ship.position().left) > $ship.width()) {
        $('#ship').css({left: position.left + 5});
      } else {
        movement.right = false;
      }
    }
  };

  var startGame = function () {
    gameloop = setInterval(function(){
      moveShip();
      keyMovement();
    }, 17);
  };

  startGame();


});