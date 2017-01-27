const box = document.getElementById('marbleBox');
const marble = document.getElementById('marble');
const hole = document.getElementById('hole');

// Initial hole position
let hTop = hole.style.top = "85%";
let hLeft = hole.style.left = "80%";

const num = (val) => {
  return val.slice(0, -1);
}

window.addEventListener("deviceorientation", handleOrientation, true);

// Map device orientation to coordinates from 0-100
function handleOrientation(event) {
  var z    = event.alpha;
  var x    = (event.beta + 90)/1.8; //-180 to 180
  var y    = (event.gamma + 90)/1.8; //-90 to 90

// Contraints on coordinates for marble to remain in box
  if (x >  93) { x =  93};
  if (x < 5) { x = 5};
  if (y >  90) { y =  90};
  if (y < 9) { y = 9};

// Apply position to marble
  marble.style.top  = x + '%';
  marble.style.left = y + '%';

// Rules for getting marble in hole
  let xupper = num(hTop) + 1;
  let xlower = num(hTop) - 1;
  let xtrue = (xupper > x && xlower < x);

  let yupper = num(hLeft) + 1;
  let ylower = num(hLeft) - 1;
  let ytrue = (yupper > y && ylower < y);

// Things to do WHEN marble in hole
  if(xtrue && ytrue) {
    marble.style.display = 'none';
    window.navigator.vibrate(300);


    colourWin();

    setTimeout(() => {
      marble.style.display = 'inline-block';
      box.style.backgroundColor = 'none';
    }, 1500);

  }
}

// Helper function
const colourWin = () => {
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
    document.getElementById('game').style.backgroundColor = hslaString;
  }
  party();

}
