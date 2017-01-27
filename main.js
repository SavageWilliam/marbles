const box = document.getElementById('marbleBox');
const marble = document.getElementById('marble');
const hole = document.getElementById('hole');

// Initial hole position
let hTop = hole.style.top = "80%";
let hLeft = hole.style.left = "80%";

window.addEventListener("deviceorientation", handleOrientation, true);
