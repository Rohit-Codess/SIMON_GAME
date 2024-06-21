let gameSeq = [];
let userSeq = [];
let btns = ["red", "yellow", "green", "blue"];

let started = false;
let level = 0;

let h3 = document.querySelector("h3");

// step 1: Choose any key
document.addEventListener("keypress", function (e) {
  if (started == false) {
    console.log("start");
    started = true;

    levelUp();
  }
});

// step 2.1: Level up function
function levelUp() {
  userSeq = []; // step 5.10: when we update the level make the userSeq empty.
  level++;
  h3.innerText = `Level ${level}`;

  // step 2.2: Random Btn choose
  let randInd = Math.floor(Math.random() * 3);
  let randColor = btns[randInd];
  let randBtn = document.querySelector(`.${randColor}`);
  gameSeq.push(randColor); // step 5.1: check the sequence of the computer and user
  console.log(gameSeq); // step 5.2: pushed the color choose by the computer and add in gameSeq.
  gameFlash(randBtn);
}

// step 3: Flashing button is blink only one time in starting
function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 200);
}

// step 4.1: Pressing the button by the user
let allBtns = document.querySelectorAll(".color");
allBtns.forEach((btn) => {
  btn.addEventListener("click", btnPress);
});

// step 4.2: make a function for Press button by the user
function btnPress() {
  let btn = this;
  userFlash(btn);
  // console.log(this);
  userColor = btn.getAttribute("id"); // step 5.3: get the "id" attribute for user
  userSeq.push(userColor); // step 5.4: pushed the color choose by the user and add in userSeq.
  console.log(userSeq); // step 5.5:

  checkSeq(userSeq.length - 1); // step 5.6: length of level to pass in checkSeq to find the equal sequence b/w user and computer.
}

// step 4.3: when the user press the button the change the background color into green
function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(() => {
    btn.classList.remove("userflash");
  }, 200);
}

// step 5.7: check the sequence of the computer and user
function checkSeq(ind) {
  //   console.log("curren level", level);
  if (userSeq[ind] === gameSeq[ind]) {
    if (userSeq.length == gameSeq.length) {
      // 5.9: equal length of userSeq and gameSeq
      // ind represent step 5.6
      setTimeout(() => {
        levelUp();
      }, 1000); // step 5.8: level up after 1sec that gave a smooth animation.
    }
  } else {
    h3.innerHTML = `Game over! Your score was : <b> ${level} </b> <br> Press any key to start the game again 🎮🧑‍💻`;
    reset();
    document.body.style.backgroundColor = "red";

    setTimeout(() => {
      document.body.style.backgroundColor = "white";
    }, 250);
  }
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
