/*
  Code modified from:
  http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
  using graphics purchased from vectorstock.com
*/

/* Initialization.
Here, we create and add our "canvas" to the page.
We also load all of our images. 
*/

let canvas;
let ctx;

canvas = document.getElementById("gameBoard");
ctx = canvas.getContext("2d");
canvas.width = 700;
canvas.height = 800;

let bgReady,
  shipReady,
  metReady,
  aliReady,
  satReady,
  met2Ready,
  ali2Ready,
  sat2Ready,
  met3Ready,
  ali3Ready,
  sat3Ready,
  met4Ready,
  ali4Ready,
  sat4Ready;
let bgImage,
  shipImage,
  metImage,
  aliImage,
  satImage,
  met2Image,
  ali2Image,
  sat2Image,
  met3Image,
  ali3Image,
  sat3Image,
  met4Image,
  ali4Image,
  sat4Image;

function loadImages() {
  bgImage = new Image();
  bgImage.onload = function () {
    // show the background image
    bgReady = true;
  };
  bgImage.src = "images/background1.jpg";

  bg2Image = new Image();
  bg2Image.onload = function () {
    // show the background image
    bg2Ready = true;
  };
  bg2Image.src = "images/background2.jpg";

  bg3Image = new Image();
  bg3Image.onload = function () {
    // show the background image
    bg3Ready = true;
  };
  bg3Image.src = "images/background3.jpg";

  // show the ship image
  shipImage = new Image();
  shipImage.onload = function () {
    // show the ship image
    shipReady = true;
  };
  shipImage.src = "images/spaceship.png";

  // show the meteor image
  metImage = new Image();
  metImage.onload = function () {
    // show the meteor image
    metReady = true;
  };
  metImage.src = "images/meteor1.png";

  // show the alien image
  aliImage = new Image();
  aliImage.onload = function () {
    // show the alien image
    aliReady = true;
  };
  aliImage.src = "images/alien1.png";

  // show the satellite image
  satImage = new Image();
  satImage.onload = function () {
    // show the satellite image
    satReady = true;
  };
  satImage.src = "images/satellite1.png";

  // show the meteor2 image
  met2Image = new Image();
  met2Image.onload = function () {
    // show the meteor2 image
    met2Ready = true;
  };
  met2Image.src = "images/meteor2.png";

  // show the alien2 image
  ali2Image = new Image();
  ali2Image.onload = function () {
    // show the alien2 image
    ali2Ready = true;
  };
  ali2Image.src = "images/alien2.png";

  // show the satellite2 image
  sat2Image = new Image();
  sat2Image.onload = function () {
    // show the satellite2 2image
    sat2Ready = true;
  };
  sat2Image.src = "images/satellite2.png";

  // show the meteor3 image
  met3Image = new Image();
  met3Image.onload = function () {
    // show the meteor3 image
    met3Ready = true;
  };
  met3Image.src = "images/meteor3.png";

  // show the alien3 image
  ali3Image = new Image();
  ali3Image.onload = function () {
    // show the alien3 image
    ali3Ready = true;
  };
  ali3Image.src = "images/alien3.png";

  // show the satellite3 image
  sat3Image = new Image();
  sat3Image.onload = function () {
    // show the satellite3 image
    sat3Ready = true;
  };
  sat3Image.src = "images/satellite3.png";

  // show the meteor4 image
  met4Image = new Image();
  met4Image.onload = function () {
    // show the meteor4 image
    met4Ready = true;
  };
  met4Image.src = "images/meteor4.png";

  // show the alien4 image
  ali4Image = new Image();
  ali4Image.onload = function () {
    // show the alien4 image
    ali4Ready = true;
  };
  ali4Image.src = "images/alien4.png";

  // show the satellite4 image
  sat4Image = new Image();
  sat4Image.onload = function () {
    // show the satellite4 image
    sat4Ready = true;
  };
  sat3Image.src = "images/satellite4.png";
}

let score = 0;
document.getElementById("score").innerHTML = score;

let shipX = canvas.width / 2;
let shipY = canvas.height / 2;

// start point of top to bttm
let metX = Math.floor(Math.random() * (canvas.width - 50));
let metY = -350;

let aliX = Math.floor(Math.random() * (canvas.width - 50));
let aliY = -50;

let satY = Math.floor(Math.random() * (canvas.width - 50));
let satX = -250;

// start point of left to right
let met2Y = Math.floor(Math.random() * (canvas.height - 50));
let met2X = -350;

let ali2Y = Math.floor(Math.random() * (canvas.height - 50));
let ali2X = -50;

let sat2Y = Math.floor(Math.random() * (canvas.height - 50));
let sat2X = -250;

// start point of right to left
let met3Y = Math.floor(Math.random() * (canvas.height - 50));
let met3X = 350 + canvas.width;

let ali3Y = Math.floor(Math.random() * (canvas.height - 50));
let ali3X = 50 + canvas.width;

let sat3Y = Math.floor(Math.random() * (canvas.height - 50));
let sat3X = 250 + canvas.width;

// start point of bttm to top
let met4X = Math.floor(Math.random() * (canvas.width - 50));
let met4Y = 350 + canvas.height;

let ali4X = Math.floor(Math.random() * (canvas.width - 50));
let ali4Y = 50 + canvas.height;

let sat4Y = Math.floor(Math.random() * (canvas.width - 50));
let sat4X = 250 + canvas.height;

/**
 * Keyboard Listeners
 * You can safely ignore this part, for now.
 *
 * This is just to let JavaScript know when the user has pressed a key.
 */
let keysDown = {};
function setupKeyboardListeners() {
  // Check for keys pressed where key represents the keycode captured
  // For now, do not worry too much about what's happening here.
  addEventListener(
    "keydown",
    function (key) {
      keysDown[key.keyCode] = true;
    },
    false
  );

  addEventListener(
    "keyup",
    function (key) {
      delete keysDown[key.keyCode];
    },
    false
  );
}

/**
 *  Update game objects - change player position based on key pressed
 *  and check to see if the met has been caught!
 *
 *  If you change the value of 5, the player will move at a different rate.
 */
let update = function () {
  //   // Update the time.
  //   elapsedTime = Math.floor((Date.now() - startTime) / 1000);

  if (38 in keysDown) {
    // Player is holding up key
    shipY -= 5;
  }
  if (40 in keysDown) {
    // Player is holding down key
    shipY += 5;
  }
  if (37 in keysDown) {
    // Player is holding left key
    shipX -= 5;
  }
  if (39 in keysDown) {
    // Player is holding right key
    shipX += 5;
  }

  metY += 1;
  aliY += 2;
  satY += 1;
  met2X += 1;
  ali2X += 1;
  sat2X += 2;
  met3X -= 1;
  ali3X -= 3;
  sat3X -= 1;
  met4Y -= 4;
  ali4Y -= 2;
  sat4Y -= 1;

  if (shipX + 50 > canvas.width) {
    shipX = canvas.width - 50;
  } else if (shipX < 0) {
    shipX = 0;
  }
  if (shipY + 50 > canvas.height) {
    shipY = canvas.height - 50;
  } else if (shipY < 0) {
    shipY = 0;
  }

  // Check if player and met collided. Our images
  // are about 32 pixels big.
  //   if obstacle meet canvas limit:
  //   top to bttm
  if (metY == canvas.height) {
    metX = Math.floor(Math.random() * (canvas.width - 50));
    metY = -50;
  }

  if (aliY == canvas.height) {
    aliX = Math.floor(Math.random() * (canvas.width - 50));
    aliY = -60;
  }

  if (satY == canvas.height) {
    satX = Math.floor(Math.random() * (canvas.width - 50));
    satY = -70;
  }

  //   left to right
  if (met2X == canvas.width) {
    met2Y = Math.floor(Math.random() * (canvas.height - 50));
    met2X = -60;
  }

  if (ali2X == canvas.width) {
    ali2Y = Math.floor(Math.random() * (canvas.height - 50));
    ali2X = -60;
  }

  if (sat2Y == canvas.height) {
    sat2X = Math.floor(Math.random() * (canvas.height - 50));
    sat2Y = -50;
  }

  //   right to left
  if (met3X == 0) {
    met3Y = Math.floor(Math.random() * (canvas.height - 50));
    met3X = 50 + canvas.width;
  }

  if (ali3X == 0) {
    ali3Y = Math.floor(Math.random() * (canvas.height - 50));
    ali3X = 70 + canvas.width;
  }

  if (sat3Y == 0) {
    sat3X = Math.floor(Math.random() * (canvas.height - 50));
    sat3Y = 60 + canvas.width;
  }

  //   bttm to top
  if (met4Y == 0) {
    met4X = Math.floor(Math.random() * (canvas.width - 50));
    met4Y = 60 + canvas.height;
  }

  if (ali4Y == 0) {
    ali4X = Math.floor(Math.random() * (canvas.width - 50));
    ali4Y = 50 + canvas.height;
  }

  if (sat4Y == 0) {
    sat4X = Math.floor(Math.random() * (canvas.width - 50));
    sat4Y = 50 + canvas.height;
  }

  //   if ship collide meteor
  //   top to bttm
  if (
    shipX <= metX + 50 &&
    shipX + 50 >= metX &&
    shipY <= metY + 50 &&
    shipY + 50 >= metY &&
    shipY + 50 >= metY
  ) {
    metX = Math.floor(Math.random() * (canvas.width - 50));
    metY = -50;
    score += 1;
    document.getElementById("score").innerHTML = score;
    document.getElementById("pointSound").play();
  }

  //   left to right
  if (
    shipX <= met2X + 50 &&
    shipX + 50 >= met2X &&
    shipY <= met2Y + 50 &&
    shipY + 50 >= met2Y &&
    shipY + 50 >= met2Y
  ) {
    met2Y = Math.floor(Math.random() * (canvas.height - 50));
    met2X = -50;
    score += 2;
    document.getElementById("score").innerHTML = score;
    document.getElementById("pointSound").play();
  }

  //   right to left
  if (
    shipX <= met3X + 50 &&
    shipX + 50 >= met3X &&
    shipY <= met3Y + 50 &&
    shipY + 50 >= met3Y &&
    shipY + 50 >= met3Y
  ) {
    met3Y = Math.floor(Math.random() * (canvas.height - 50));
    met3X = 50 + canvas.width;
    score += 3;
    document.getElementById("score").innerHTML = score;
    document.getElementById("pointSound").play();
  }
  //   bttm to top
  if (
    shipX <= met4X + 50 &&
    shipX + 50 >= met4X &&
    shipY <= met4Y + 50 &&
    shipY + 50 >= met4Y &&
    shipY + 50 >= met4Y
  ) {
    met4X = Math.floor(Math.random() * (canvas.width - 50));
    met4Y = 50 + canvas.height;
    score += 4;
    document.getElementById("score").innerHTML = score;
    document.getElementById("pointSound").play();
  }

  //   if ship collide object
  //   alien 1
  if (
    shipX <= aliX + 50 &&
    shipX + 50 >= aliX &&
    shipY <= aliY + 50 &&
    shipY + 50 >= aliY
  ) {
    finished = true;
    time = 0;
    // hide monster and hero
    metReady = false;
    aliReady = false;
    satReady = false;
    met2Ready = false;
    ali2Ready = false;
    sat2Ready = false;
    met3Ready = false;
    ali3Ready = false;
    sat3Ready = false;
    met4Ready = false;
    ali4Ready = false;
    sat4Ready = false;
    shipReady = false;
    // move hero out of canvas
    shipX = -600;
    shipY = -600;
    document.getElementById("loseSound").play();
    pause();
  }
  //   alien 2
  if (
    shipX <= ali2X + 50 &&
    shipX + 50 >= ali2X &&
    shipY <= ali2Y + 50 &&
    shipY + 50 >= ali2Y
  ) {
    finished = true;
    time = 0;
    // hide monster and hero
    metReady = false;
    aliReady = false;
    satReady = false;
    met2Ready = false;
    ali2Ready = false;
    sat2Ready = false;
    met3Ready = false;
    ali3Ready = false;
    sat3Ready = false;
    met4Ready = false;
    ali4Ready = false;
    sat4Ready = false;
    shipReady = false;
    // move hero out of canvas
    shipX = -600;
    shipY = -600;
    document.getElementById("loseSound").play();
    pause();
  }
  //   alien 3
  if (
    shipX <= ali3X + 50 &&
    shipX + 50 >= ali3X &&
    shipY <= ali3Y + 50 &&
    shipY + 50 >= ali3Y
  ) {
    finished = true;
    time = 0;
    // hide monster and hero
    metReady = false;
    aliReady = false;
    satReady = false;
    met2Ready = false;
    ali2Ready = false;
    sat2Ready = false;
    met3Ready = false;
    ali3Ready = false;
    sat3Ready = false;
    met4Ready = false;
    ali4Ready = false;
    sat4Ready = false;
    shipReady = false;
    // move hero out of canvas
    shipX = -600;
    shipY = -600;
    document.getElementById("loseSound").play();
    pause();
  }
  //   alien 4
  if (
    shipX <= ali4X + 50 &&
    shipX + 50 >= ali4X &&
    shipY <= ali4Y + 50 &&
    shipY + 50 >= ali4Y
  ) {
    finished = true;
    time = 0;
    // hide monster and hero
    metReady = false;
    aliReady = false;
    satReady = false;
    met2Ready = false;
    ali2Ready = false;
    sat2Ready = false;
    met3Ready = false;
    ali3Ready = false;
    sat3Ready = false;
    met4Ready = false;
    ali4Ready = false;
    sat4Ready = false;
    shipReady = false;
    // move hero out of canvas
    shipX = -600;
    shipY = -600;
    document.getElementById("loseSound").play();
    pause();
  }
  //   satellite 1
  if (
    shipX <= satX + 50 &&
    shipX + 50 >= satX &&
    shipY <= satY + 50 &&
    shipY + 50 >= satY
  ) {
    finished = true;
    time = 0;
    // hide monster and hero
    metReady = false;
    aliReady = false;
    satReady = false;
    met2Ready = false;
    ali2Ready = false;
    sat2Ready = false;
    met3Ready = false;
    ali3Ready = false;
    sat3Ready = false;
    met4Ready = false;
    ali4Ready = false;
    sat4Ready = false;
    shipReady = false;
    // move hero out of canvas
    shipX = -600;
    shipY = -600;
    document.getElementById("loseSound").play();
    pause();
  }
  //   satellite 2
  if (
    shipX <= sat2X + 50 &&
    shipX + 50 >= sat2X &&
    shipY <= sat2Y + 50 &&
    shipY + 50 >= sat2Y
  ) {
    finished = true;
    time = 0;
    // hide monster and hero
    metReady = false;
    aliReady = false;
    satReady = false;
    met2Ready = false;
    ali2Ready = false;
    sat2Ready = false;
    met3Ready = false;
    ali3Ready = false;
    sat3Ready = false;
    met4Ready = false;
    ali4Ready = false;
    sat4Ready = false;
    shipReady = false;
    // move hero out of canvas
    shipX = -600;
    shipY = -600;
    document.getElementById("loseSound").play();
    pause();
  }
  //   satellite 3
  if (
    shipX <= sat3X + 50 &&
    shipX + 50 >= sat3X &&
    shipY <= sat3Y + 50 &&
    shipY + 50 >= sat3Y
  ) {
    finished = true;
    time = 0;
    // hide monster and hero
    metReady = false;
    aliReady = false;
    satReady = false;
    met2Ready = false;
    ali2Ready = false;
    sat2Ready = false;
    met3Ready = false;
    ali3Ready = false;
    sat3Ready = false;
    met4Ready = false;
    ali4Ready = false;
    sat4Ready = false;
    shipReady = false;
    // move hero out of canvas
    shipX = -600;
    shipY = -600;
    document.getElementById("loseSound").play();
    pause();
  }
  //   satellite 4
  if (
    shipX <= sat4X + 50 &&
    shipX + 50 >= sat4X &&
    shipY <= sat4Y + 50 &&
    shipY + 50 >= sat4Y
  ) {
    finished = true;
    time = 0;
    // hide monster and hero
    metReady = false;
    aliReady = false;
    satReady = false;
    met2Ready = false;
    ali2Ready = false;
    sat2Ready = false;
    met3Ready = false;
    ali3Ready = false;
    sat3Ready = false;
    met4Ready = false;
    ali4Ready = false;
    sat4Ready = false;
    shipReady = false;
    // move hero out of canvas
    shipX = -600;
    shipY = -600;
    document.getElementById("loseSound").play();
    pause();
  }
};

function gameOver() {
  ctx.fillStyle = "white";
  ctx.font = "30px Verdana";
  ctx.fillText("Game Over", 260, 400);
  pause();
}

/**
 * This function, render, runs as often as possible.
 */

let time = 60;
document.getElementById("time").innerHTML = time;
let finished = false;
let timer = function () {
  time -= 1;
  if (time <= 0) {
    clearInterval(timer);
    //set game to finished
    time = 0;
    finished = true;
    // hide monster and hero
    metReady = false;
    aliReady = false;
    satReady = false;
    met2Ready = false;
    ali2Ready = false;
    sat2Ready = false;
    met3Ready = false;
    ali3Ready = false;
    sat3Ready = false;
    met4Ready = false;
    ali4Ready = false;
    sat4Ready = false;
    shipReady = false;

    // move hero out of canvas
    shipX = -600;
    shipY = -600;

    gameOver();
    pause();
  }

  document.getElementById("time").innerHTML = time;
};

var render = function () {
  if (time > 40 && bgReady) {
    ctx.drawImage(bgImage, 0, 0);
  } else if (time <= 40 && time > 20 && bg2Ready) {
    ctx.drawImage(bg2Image, 0, 0);
  } else if (time <= 20 && bg3Ready) {
    ctx.drawImage(bg3Image, 0, 0);
  }
  if (shipReady) {
    ctx.drawImage(shipImage, shipX, shipY);
  }
  if (metReady) {
    ctx.drawImage(metImage, metX, metY);
  }
  if (aliReady) {
    ctx.drawImage(aliImage, aliX, aliY);
  }
  if (satReady) {
    ctx.drawImage(satImage, satX, satY);
  }

  if (met2Ready) {
    ctx.drawImage(met2Image, met2X, met2Y);
  }
  if (ali2Ready) {
    ctx.drawImage(ali2Image, ali2X, ali2Y);
  }
  if (sat2Ready) {
    ctx.drawImage(sat2Image, sat2X, sat2Y);
  }

  if (met3Ready) {
    ctx.drawImage(met3Image, met3X, met3Y);
  }
  if (ali3Ready) {
    ctx.drawImage(ali3Image, ali3X, ali3Y);
  }
  if (sat3Ready) {
    ctx.drawImage(sat3Image, sat3X, sat3Y);
  }

  if (met4Ready) {
    ctx.drawImage(met4Image, met4X, met4Y);
  }
  if (ali4Ready) {
    ctx.drawImage(ali4Image, ali4X, ali4Y);
  }
  if (sat4Ready) {
    ctx.drawImage(sat4Image, sat4X, sat4Y);
  }

  if (finished == true) {
    gameOver();
  }
};
/**
 * The main game loop. Most every game will have two distinct parts:
 * update (updates the state of the game, in this case our ship and met)
 * render (based on the state of our game, draw the right things)
 */

var main = function () {
  update();
  render();
  // Request to do this again ASAP. This is a special method
  // for web browsers.
  requestAnimationFrame(main);
};

function startGame() {
  setInterval(timer, 1000);
  loadImages();
  setupKeyboardListeners();
  main();
  document.getElementById("reset").disabled = false;
  document.getElementById("start").disabled = true;
  play();
}

function resetGame() {
  score = 0;
  document.getElementById("score").innerHTML = score;

  shipX = canvas.width / 2;
  shipY = canvas.height / 2;

  // start point of top to bttm
  metX = Math.floor(Math.random() * (canvas.width - 50));
  metY = -350;

  aliX = Math.floor(Math.random() * (canvas.width - 50));
  aliY = -50;

  satY = Math.floor(Math.random() * (canvas.width - 50));
  satX = -250;

  // start point of left to right
  met2Y = Math.floor(Math.random() * (canvas.height - 50));
  met2X = -350;

  ali2Y = Math.floor(Math.random() * (canvas.height - 50));
  ali2X = -50;

  sat2Y = Math.floor(Math.random() * (canvas.height - 50));
  sat2X = -250;

  // start point of right to left
  met3Y = Math.floor(Math.random() * (canvas.height - 50));
  met3X = 350 + canvas.width;

  ali3Y = Math.floor(Math.random() * (canvas.height - 50));
  ali3X = 50 + canvas.width;

  sat3Y = Math.floor(Math.random() * (canvas.height - 50));
  sat3X = 250 + canvas.width;

  // start point of bttm to top
  met4X = Math.floor(Math.random() * (canvas.width - 50));
  met4Y = 350 + canvas.height;

  ali4X = Math.floor(Math.random() * (canvas.width - 50));
  ali4Y = 50 + canvas.height;

  sat4Y = Math.floor(Math.random() * (canvas.width - 50));
  sat4X = 250 + canvas.height;

  time = 60;
  document.getElementById("time").innerHTML = time;
  finished = false;
  loadImages();
  setupKeyboardListeners();
  main();
  play();
}

function play() {
  document.getElementById("bgMusic").play();
}
function pause() {
  document.getElementById("bgMusic").pause();
}
