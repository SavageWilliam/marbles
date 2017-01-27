var outer = document.getElementById('game');
var box = document.getElementById('ballBox');
var ball = document.getElementById('ball');
var ballInner = document.getElementById('ballInner')
var hole = document.getElementById('hole');
var holeInner = document.getElementById('holeInner');
var successMsg = document.getElementById('success');


// Initial hole position
var hTop = '75%';
var hLeft = '75%';

// Level tracker
var level = 1;
window.addEventListener("orientationchange", handleOrientation);
window.addEventListener("deviceorientation", handleOrientation);

// Map device orientation to coordinates from 0-100
function handleOrientation(event) {
  var z    = event.alpha;
  var x    = ((event.beta + 50)/1.8) + 5; //-180 to 180
  var y    = ((event.gamma + 90)/1.8) + 5; //-90 to 90

// Contraints on coordinates for ball to remain in box
  if (x >  93) { x =  93};
  if (x < 5) { x = 5};
  if (y >  90) { y =  90};
  if (y < 10) { y = 10};

// Apply position to ball
  ball.style.top  = x + '%';
  ball.style.left = y + '%';


// Rules for getting ball in hole
  var xupper = num(hTop) + 3;
  var xlower = num(hTop) - 3;
  var xtrue = (xupper > x && xlower < x);

  var yupper = num(hLeft) + 3;
  var ylower = num(hLeft) - 3;
  var ytrue = (yupper > y && ylower < y);

// Things to do WHEN ball in hole
  if(xtrue && ytrue) {

    onSuccess();
  }
}

// Helper functions
var onSuccess = function() {

  switch(level) {
    case 1:
      level++
      resetHole("20%",'50%');
      break;
    case 2:
      level++
      resetHole("75%", "20%");
      break;
    case 3:
      level++
      resetHole("30%", "30%");
      break;
    case 4:
      level++
      resetHole("75%", "50%");
      break;
    //next stage
    case 5:
      level++
      console.log(load);
      ball.className = 'box__ball eight';
      ballInner.className = 'ate'
      document.body.style.background = 'url(images/snooker.jpg)';
      hole.style.background = 'url(images/snooker.jpg)';
      // hole.style.boxShadow = 'none'
      holeInner.style.background = 'url(images/snooker-ball.png)';
      resetHole("45%", "75%");

      break;
    case 6:
      level++
      resetHole("20%",'50%');
      break;
    case 7:
      level++
      resetHole("82%", "15%");
      break;
    case 8:
      level++
      resetHole("15%", "15%");
      break;
    case 9:
      level++
      resetHole("40%", "30%");
      break;
    default:
      console.log("HERE");
      win();
  }
}
// Reassign hole positon
var resetHole = function(top, left) {
  hTop = top;
  hLeft = left;
  hole.style.top = hTop;
  hole.style.left = hLeft;
}

// Colour display for victory
var win = function() {
  var i = 0, max = 360, cnt = 10;
  var party = function() {
    i += cnt;
    if (i===max) {cnt = -10;}
    if (i===0)  {cnt = 10;}
    colourShow(i)
    setTimeout(party, 100);
  }
  var colourShow = function(hue) {
    var hslaString = `hsla(${hue}, 90%, 60%, 1)`
    hole.style.display = 'none';
    outer.style.backgroundColor = hslaString;
  }
  successMsg.style.display = 'block';
  party();

}

var num = function(val) {
  return Number(val.slice(0, -1));
}
