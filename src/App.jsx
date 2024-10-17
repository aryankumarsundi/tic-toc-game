
import Player from "./components/player";
import GameBoard from "./components/GameBoard";
import { useState } from "react";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combination";
import GameOver from "./components/GameOver";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]

function App() {

  const [players, setPlayers] = useState({
    X: 'Player 1',
    O: 'Player 2',
  });


  function handlePlayersNameChange(symbol, value) {

    console.log(symbol, value);
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: value,
      };
    });    
  }

  const [activePlayer, setActivePlayer] = useState('X');
  const [gameTurn, setGameTurn] = useState([]);

  let gameBoard = [...initialGameBoard.map(row => [...row])];
  for(let turn of gameTurn){
      const {square, player} = turn;
      const {row, col} = square;
      gameBoard[row][col] = player;
  }

  let winner;
  for(const combination of WINNING_COMBINATIONS){
    const firtsBoxVal = gameBoard[combination[0].row][combination[0].col];
    const secondBoxVal = gameBoard[combination[1].row][combination[1].col];
    const thirdBoxVal = gameBoard[combination[2].row][combination[2].col];

    if(
      firtsBoxVal && 
      firtsBoxVal === secondBoxVal && 
      firtsBoxVal === thirdBoxVal){
      winner = players[firtsBoxVal];
    }
  }

  const hasDrow = (gameTurn.length === 9) && !winner;

  console.log(hasDrow);
  function handleSelectSquare(rowIndex , colIndex) {
    setActivePlayer((activePlayer) => (activePlayer === 'X' ? 'O' : 'X'));

    setGameTurn((prevTurn) => {
      let currentPlayer = 'X'
      if(prevTurn.length > 0 && prevTurn[0].player === 'X') {
        currentPlayer = 'O';
      }

      const updatedTurn = [
        {square:{row: rowIndex, col: colIndex}, player: currentPlayer},
        ...prevTurn
      ];
      return updatedTurn;
    });
  }

  function onRestart() {
    setGameTurn([]);
    setActivePlayer('X');
    gameBoard = [...initialGameBoard.map(row => [...row])];
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player player={{ name: "Player 1", symbol: "X" , isActive: activePlayer === 'X'}} onHandlePlayerChange={handlePlayersNameChange}/>
          <Player player={{ name: "Player 2", symbol: "O", isActive: activePlayer === 'O' }} onHandlePlayerChange={handlePlayersNameChange}/>
        </ol>

        {(winner || hasDrow)  && <GameOver winner={winner} onRestart={onRestart}/>}
        <GameBoard  onSelectSquare={handleSelectSquare} gameBoard={gameBoard}/>
        <Log logs={gameTurn}/>
      </div>
      
    </main>
  )
}

export default App