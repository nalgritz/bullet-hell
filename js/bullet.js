$(document).ready(function () {

  // input new bullet
  var createBullet = function (e) {
    $('.gamescreen').append($bullet);
  };

  // move bullet from left to right, 2000 is bullet speed
  // any ways to move within the screen
  var moveBullet = function () {
    $bullet.animate({opacity:1}, 0).animate({
      left: '+=800',
      top : '+=200'
    }, 3000).animate({opacity:0}, 0);
  };

/*
// found inputting .animate left & top gives moving with slopes, have to set up 4 conditions
  var bulletDirection = [
    '{left: xPos, top: '0'}',
    '{left: xGameScreen, top: '0'}',
    '{left: '0', top: yPos}',
    '{left: '0', top: yGameScreen}'
    ];
*/

  // set x,y total screen distance <---should set function to move across the screen (cos diagonal is longer than 800px)
  var yGameScreen = $('.gamescreen').width();
  var xGameScreen = $('.gamescreen').height();

  // set random x, y position
  var xPos = Math.round( Math.random() * xGameScreen);
  var yPos = Math.round( Math.random() * yGameScreen);

  // Define bullet
  // how to random need 4 positions?
  var $bullet = $('<div class="bullet"></div>').css({
    marginTop: yPos + 'px',
  });
  // 4 positions are:
    // marginTop: yPos + 'px', marginLeft: '0';
    // marginTop: yGameScreen + 'px', marginLeft: '0';
    // marginTop: '0', marginLeft: xPos + 'px';
    // marginTop: '0', marginLeft: xGameScreen;





  // testing to loop new bullet & move but the bullet reappear at the same location & direction
  for (i = 0; i < 5; i++) {
    createBullet();
    moveBullet();
}

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
});