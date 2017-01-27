const box = document.getElementById('marbleBox');
const marble = document.getElementById('marble');
const hole = document.getElementById('hole');

// Initial hole position
let hTop = hole.style.top = "80%";
let hLeft = hole.style.left = "80%";

window.addEventListener("deviceorientation", handleOrientation, true);

function handleOrientation(event) {
  var z    = event.alpha;
  var x    = (event.beta + 90)/1.8; //-180 to 180
  var y    = (event.gamma + 90)/1.8; //-90 to 90

  if(y===90) y
  marble.style.top  = x + '%';
  marble.style.left = y + '%';



  let xupper = hTop + 2;
  let xlower = hTop - 2 ;
  let xtrue = (xupper > x && xlower < x);

  let yupper = hLeft + 2;
  let ylower = hLeft - 2;
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
      setTimeout(timer, 60);
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
