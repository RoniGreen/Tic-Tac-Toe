const TABLE_WIDTH = 3;

let trackMoves = 0;
let boardState = generateEmptyBoardState();
let currentPlayer = 1;

const gameHeader = document.getElementById('game-heading');
const gameSquares = document.querySelectorAll('.game-square');
const resetButton = document.getElementById('restart-button');


gameSquares.forEach((gameSquare, i)=> {
  gameSquare.addEventListener('click', () => {
    const row = Math.floor(i / TABLE_WIDTH); // 0 0 0 1 1 1 2 2 2
    const col = i % TABLE_WIDTH; // 0 1 2 0 1 2 0 1 2 
    makeMove(gameSquare, row, col)
  });
});

resetButton.addEventListener('click', restartGame);

function makeMove(gameSquare, row, col){
  gameSquare.textContent = currentPlayer === 1 ? 'X' : 'O';
  gameSquare.disabled = true;
  trackMoves++;
  boardState[row][col] = currentPlayer;

  if (playerWin()){
    gameHeader.textContent = `Player ${currentPlayer} Won!`;
    endGame();
  } else if(trackMoves >= (TABLE_WIDTH * TABLE_WIDTH)){
     gameHeader.textContent = `Tie Game!`;
    endGame();
  }else {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    setCurrentPlayerHeading();
  }
}

function playerWin(){
  const rows = [0,1,2];
  const horizontalWin = rows.some(row => {
    return (
      boardState[row][0] === currentPlayer &&
      boardState[row][1] === currentPlayer &&
      boardState[row][2] === currentPlayer
    );
  });

  const cols = [0, 1, 2];
  const verticalWin = cols.some(col => {
    return (
      boardState[0][col] === currentPlayer &&
      boardState[1][col] === currentPlayer &&
      boardState[2][col] === currentPlayer
    );
  });

  const topLeftToBottomRightWin =
      boardState[0][0] === currentPlayer &&
      boardState[1][1] === currentPlayer &&
      boardState[2][2] === currentPlayer;

  const bottomLeftToTopRightWin =
      boardState[2][0] === currentPlayer &&
      boardState[1][1] === currentPlayer &&
      boardState[0][2] === currentPlayer;

  return horizontalWin || verticalWin || topLeftToBottomRightWin ||bottomLeftToTopRightWin;
  
}

function setCurrentPlayerHeading(){
    gameHeader.textContent = `Player ${currentPlayer}'s Turn`;
}

function endGame(){
  gameSquares.forEach((gameSquare) => {
    gameSquare.disabled = true;
  });
  resetButton.style.display = 'inline-block';
}

function generateEmptyBoardState(){
  return new Array(TABLE_WIDTH).fill().map(()=> new Array(TABLE_WIDTH).fill());
}

function restartGame(){
  boardState = generateEmptyBoardState();
  currentPlayer = 1;
  trackMoves = 0;
  setCurrentPlayerHeading();
  gameSquares.forEach((gameSquare) => {
    gameSquare.textContent = '';
    gameSquare.disabled = false;
  });
   resetButton.style.display = 'none';
}
