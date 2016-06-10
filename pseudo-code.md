Pseudo-code

How to find a button
---------------------
$('document').on('keypress',function (e) console.log(e));

tap space - start game
arrow button -> move the plane

1. create bullets
 1.1 moving bullet
 1.2 bullets direction -
(random() * screen size, 0) or
(screen size, 0) or
(0, random() * screen size) or
(0, screen size)

        // Define bullet
        var $bullet = $('<div class="bullet"></div>').css({
          left: xPos + 'px',
          top: yPox + 'px'
        });
 1.2 bullets angle
 1.3 bullets speed
2.  collision system





Javascript
http://stackoverflow.com/questions/16591144/js-game-shooting-in-random-directions

http://jsfiddle.net/gfcarv/nueT7/

http://stackoverflow.com/questions/10385950/how-to-get-a-div-to-randomly-move-around-a-page-using-jquery-or-css


The basic premise is to generate positional values, and use jquery's animate() function to move the div. The calculation of the next position is simple, you just need a bit of math. Here's a very basic jsfiddle i just knocked up. It could do with possibly a delay timer, a dynamically calculating speed based on how far its got too move e.c.t. But it gives you a start point i hope.




bullet is the major object with properties
= position
= angle
= speed


Html
1. Title - Dodge it
2. Start button
3. Game screen
4. Stopwatch
5. bonus -> difficulty selector
difficulties : 100, 1000, 10000 bullets (depends on the plane size & game screen)

for 2 player game
1.  share screen or
2.  same screen

