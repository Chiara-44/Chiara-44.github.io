// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue,
  set
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyB2foi_dQ7-Bw-yigFY4b5Zmp38rQc0Dxs",
authDomain: "lovers-lamps.firebaseapp.com",
databaseURL: "https://lovers-lamps-default-rtdb.asia-southeast1.firebasedatabase.app/",
projectId: "lovers-lamps",
storageBucket: "lovers-lamps.firebasestorage.app",
messagingSenderId: "815738399518",
appId: "1:815738399518:web:a133a733d197934194770f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Realtime Database listener
const db = getDatabase(app);
const themeRef = ref(db, 'theme');

onValue(themeRef, (snapshot) => {
  const data = snapshot.val();
  document.body.style.backgroundColor = data.backgroundColor;
  document.body.style.color = data.textColor;
});

//update colour with clicker
window.updateColor = function () {
  const newColor = document.getElementById('bgColorPicker').value;
  const bgRef = ref(db, 'theme/backgroundColor');
  set(bgRef, newColor);
};


//BEEEEEEEEEEEEEEEEEEEEESSSSSSSSSSSSSSSSSSSSSSSSSSS

const bee = document.getElementById("bee");
const path = document.getElementById("flight-path");
const pathLength = path.getTotalLength();

function flyBee() {
  let start = null;
  const duration = 3000 + Math.random() * 2000;

  function animateBee(timestamp) {
    if (!start) start = timestamp;
    const elapsed = timestamp - start;
    const progress = Math.min(elapsed / duration, 1);
    const distance = pathLength * progress;

    const point = path.getPointAtLength(distance);
    const nextPoint = path.getPointAtLength(distance + 1); // small step ahead

    const dx = nextPoint.x - point.x;
    const dy = nextPoint.y - point.y;
    const angle = Math.atan2(dy, dx) * (180 / Math.PI); // convert to degrees

    const container = document.querySelector('.images-3');
    const containerRect = container.getBoundingClientRect();

    const scaleX = containerRect.width / 1000;
    const scaleY = containerRect.height / 1000;

    bee.style.transform = `translate(${point.x * scaleX}px, ${point.y * scaleY}px) rotate(${angle}deg)`;


    if (progress < 1) {
      requestAnimationFrame(animateBee);
    } else {
      const delay = 1000 + Math.random() * 4000;
      setTimeout(flyBee, delay);
    }
  }

  requestAnimationFrame(animateBee);
}

flyBee();
