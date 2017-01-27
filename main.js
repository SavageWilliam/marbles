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
  if (x >  95) { x =  95};
  if (x < 5) { x = 5};
  if (y >  95) { y =  95};
  if (y < 8) { y = 8};
  marble.style.top  = x + '%';
  marble.style.left = y + '%';



  let xupper = num(hTop) + 2;
  let xlower = num(hTop) - 2 ;
  let xtrue = (xupper > x && xlower < x);

  let yupper = num(hLeft) + 2;
  let ylower = num(hLeft) - 2;
  let ytrue = (xupper > y && xlower < y);

  if(xtrue && ytrue) {
    marble.style.display = 'none';
    window.navigator.vibrate(300);

    const colourBox = (hue) => {
      const hslaString = `hsla(${hue}, 90%, 60%, 1)`
      console.log(hslaString);
      box.style.backgroundColor = hslaString;
    }

    var i = 0, max = 360, cnt = 10;
    const timer = function() {
      i += cnt;
      if (i===max) {cnt = -10;}
      if (i===0)  {cnt = 10;}
      colourBox(i)
      setTimeout(timer, 100);
    }

    timer();

    setTimeout(() => {
      marble.style.display = 'inline-block';
      box.style.backgroundColor = 'white';
    }, 1500);

  }

  // const output = document.getElementById('output');
  // output.innerHTML  = "beta : " + x + "\n";
  // output.innerHTML += "gamma: " + y + "\n";
}
