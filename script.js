class position {
  // to store the current state and position of the cell
  pos = "";
  state = "";
  constructor(pos, state) {
    this.pos = pos;
    this.state = state;
  }
}
// it the actual board with current state and position id
var board = [
  [new position("_1", " "), new position("_2", " "), new position("_3", " ")],
  [new position("_4", " "), new position("_5", " "), new position("_6", " ")],
  [new position("_7", " "), new position("_8", " "), new position("_9", " ")],
];

var current_turn = "O"; // it is used to denote current turn
highlight_turn("O-score-warpper", 1.1);

var xPlayerName = "Player O";
var oPlayerName = "Player X";

var Oscore = 0;
var Xscore = 0;

var Oscoreout = document.getElementById("Oscore");
var Xscoreout = document.getElementById("Xscore");

function refreshboard() {
  // it is used to refresh the board
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      document.getElementById(board[i][j].pos).innerHTML = board[i][j].state;
    }
  }
  Oscoreout.innerHTML = "Score: " + Oscore;
  Xscoreout.innerHTML = "Score: " + Xscore;
}

function cleanboard() {
  // it is used to reset the game
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      board[i][j].state = " ";
    }
  }
  refreshboard();
}

function checkwinner() {
  // to check if anyone is win or not
  let Owin;
  let Xwin;
  for (let i = 0; i < 3; i++) {
    // to check every rows
    Owin = true;
    Xwin = true;
    for (let j = 0; j < 3; j++) {
      if (board[i][j].state != "O") {
        Owin = false;
      }
      if (board[i][j].state != "X") {
        Xwin = false;
      }
    }

    if (Owin) {
      Oscore++;
      alert("O is the Winner");
      cleanboard();
      return;
    }
    if (Xwin) {
      Xscore++;
      alert("X is the Winner");
      cleanboard();
      return;
    }
  }
  for (let i = 0; i < 3; i++) {
    // to check every column
    Owin = true;
    Xwin = true;
    for (let j = 0; j < 3; j++) {
      if (board[j][i].state != "O") {
        Owin = false;
      }
      if (board[j][i].state != "X") {
        Xwin = false;
      }
    }

    if (Owin) {
      Oscore++;
      alert("O is the Winner");
      cleanboard();
      return;
    }
    if (Xwin) {
      Xscore++;
      alert("X is the Winner");
      cleanboard();
      return;
    }
  }

  // to check leading diagnol
  Owin = true;
  Xwin = true;
  for (let i = 0; i < 3; i++) {
    // to check leading diagnol
    if (board[i][i].state != "O") {
      Owin = false;
    }
    if (board[i][i].state != "X") {
      Xwin = false;
    }
  }
  if (Owin) {
    Oscore++;
    alert("O is the Winner");
    cleanboard();
    return;
  }
  if (Xwin) {
    Xscore++;
    alert("X is the Winner");
    cleanboard();
    return;
  }

  // to check other diagnol
  Owin = true;
  Xwin = true;
  for (let i = 2; i >= 0; i--) {
    // to check other diagnol
    if (board[i][2 - i].state != "O") {
      Owin = false;
    }
    if (board[i][2 - i].state != "X") {
      Xwin = false;
    }
  }
  if (Owin) {
    Oscore++;
    alert("O is the Winner");
    cleanboard();
    return;
  }
  if (Xwin) {
    Xscore++;
    alert("X is the Winner");
    cleanboard();
    return;
  }

  // to check if all cells are occupied in the board
  let fullBoard = true;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j].state == " ") {
        fullBoard = false;
        break;
      }
    }
  }
  if (fullBoard) {
    alert("It's a draw");
    cleanboard();
  }

  // end of the check win function
}

function press(x, y) {
  // to handle every click on board

  if (board[x][y].state == " ") {
    // if board is unoccupied it can be occupied
    const cell = document.getElementById(board[x][y].pos);
    cell.innerHTML = current_turn; // to occupy the board on display
    board[x][y].state = current_turn; //to occupy the board in js
    if (current_turn == "O") {
      // if current turn is O it is turned to X and vice versa
      current_turn = "X";
      highlight_turn("X-score-warpper", 1.1);
      highlight_turn("O-score-warpper", 1);
    } else {
      current_turn = "O";
      highlight_turn("O-score-warpper", 1.1);
      highlight_turn("X-score-warpper", 1);
    }
    refreshboard();
    checkwinner();
  }

  //end of press function
}

function highlight_turn(id_name, Scale) {
  // it is used to highlight the turn which convert it to  bigger size when its turn comes
  const player_box = document.getElementById(id_name);
  player_box.style.transform = "scale(" + Scale.toString() + ")";
}

function start_Game(event) {
  // it is used to change the window from login page to actual game
  event.preventDefault();
  window.location.href = "gameskeleton.html";
}
