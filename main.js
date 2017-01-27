const game = document.getElementById('game');
const box = document.getElementById('ballBox');
const ball = document.getElementById('ball');
const ballInner = document.getElementById('ballInner')
const hole = document.getElementById('hole');
const holeInner = document.getElementById('holeInner');
const success = document.getElementById('success');

ball.style.display = 'none'
// Initial hole position
let hTop = '80%';
let hLeft = '80%';

// Level tracker
let level = 1;
window.addEventListener("orientationchange", handleOrientation);
window.addEventListener("deviceorientation", handleOrientation);

// Map device orientation to coordinates from 0-100
function handleOrientation(event) {
  var z    = event.alpha;
  var x    = ((event.beta + 90)/1.8) + 5; //-180 to 180
  var y    = ((event.gamma + 90)/1.8) + 5; //-90 to 90

// Contraints on coordinates for ball to remain in box
  if (x >  93) { x =  93};
  if (x < 5) { x = 5};
  if (y >  90) { y =  90};
  if (y < 9) { y = 9};

// Apply position to ball
  ball.style.top  = x + '%';
  ball.style.left = y + '%';


// Rules for getting ball in hole
  let xupper = num(hTop) + 4;
  let xlower = num(hTop) - 4;
  let xtrue = (xupper > x && xlower < x);

  let yupper = num(hLeft) + 4;
  let ylower = num(hLeft) - 4;
  let ytrue = (yupper > y && ylower < y);

// Things to do WHEN ball in hole
  if(xtrue && ytrue) {

    onSuccess();
  }
}

// Helper functions
const onSuccess = () => {
  window.navigator.vibrate(200);
  switch(level) {
    case 1:
      level++
      resetHole("20%",'50%');
      break;
    case 2:
      level++
      resetHole("80%", "20%");
      break;
    case 3:
      level++
      resetHole("30%", "30%");
      break;
    case 4:
      level++
      resetHole("80%", "50%");
      break;
    case 5:
      level++
      resetHole("15%", "15%");
      break;
    //next stage
    case 6:
      level++
      console.log(load);
      ball.className = 'box__ball eight';
      ballInner.className = 'ate'
      document.body.style.background = 'url(images/snooker.jpg)';
      hole.style.background = 'url(images/snooker.jpg)';
      // hole.style.boxShadow = 'none'
      holeInner.style.background = 'url(images/snooker-ball.png)';
      resetHole("70%", "70%");

      break;
    case 7:
      level++
      resetHole("20%",'50%');
      break;
    case 8:
      level++
      resetHole("82%", "15%");
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
const resetHole = (top, left) => {
  hTop = top;
  hLeft = left;
  hole.style.top = hTop;
  hole.style.left = hLeft;
}

// Colour display for victory
const win = () => {
  var i = 0, max = 360, cnt = 10;
  const party = function() {
    i += cnt;
    if (i===max) {cnt = -10;}
    if (i===0)  {cnt = 10;}
    colourShow(i)
    setTimeout(party, 100);
  }
  const colourShow = (hue) => {
    const hslaString = `hsla(${hue}, 90%, 60%, 1)`
    hole.style.display = 'none';
    game.style.backgroundColor = hslaString;
  }
  success.style.display = 'block';
  party();

}

const num = (val) => {
  return Number(val.slice(0, -1));
}
