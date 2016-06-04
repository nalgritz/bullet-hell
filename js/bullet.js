$(document).ready(function () {
  // Define bullet
  var $bullet = $('.bullet');

  // input new bullet
  var createNewBullet = function () {
    $('.gamescreen').append('<div class="bullet"></div>'
    );
  };
  createNewBullet();

  // move bullet from left to right
  var $moveBullet = $bullet.fadeIn().animate({ left: '+=800'}, 2000);

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