import {Player} from "./components/Player.jsx";
import {GameBoard} from "./components/GameBoard.jsx";
import {useState} from "react";
import Log from "./components/Log.jsx";
import { WINNING_COMBINATIONS } from './winning-combinations.js'
import GameOver from "./components/GameOver.jsx";

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]

function deriveActivePlayer (gameTurns) {
    let currentPlayer = 'X';
    if (gameTurns.length && gameTurns[0].player === 'X') {
        currentPlayer = 'O';
    }
    return currentPlayer
}

function App() {
    const [gameTurns, setGameTurns] = useState([])
    const activePlayer = deriveActivePlayer(gameTurns)

    const [players, setPlayers] = useState({
        'X': 'Player 1',
        'O': 'Player 2',
    })

    let gameBoard = [...initialGameBoard.map(box => [...box])]
    for (const turn of gameTurns) {
        const { square, player } = turn
        const { row, col } = square
        gameBoard[row][col] = player
    }

    let winner = null

    let draw = gameTurns.length >= 9 && !winner

    for (const combination of WINNING_COMBINATIONS) {
        const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
        const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
        const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]

        if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
            console.log(players[firstSquareSymbol])
            winner = players[firstSquareSymbol]
        }
    }

    function handleSelectSquare (rowIndex, colIndex) {
        setGameTurns(prevGameTurns => {
            let currentPlayer = deriveActivePlayer(prevGameTurns)

            return [
                {
                    square: {
                        row: rowIndex,
                        col: colIndex
                    },
                    player: currentPlayer
                },
                ...prevGameTurns
            ]
        })
    }

    function handleSelectRematch () {
        setGameTurns([])
    }

    function handleUpdatePlayerName (symbol, newName) {
        setPlayers(prevPlayers => ({
            ...prevPlayers,
            [symbol]: newName
        }))
    }

    return (
        <main>
            <div id="game-container">
                <ol id="players" className="highlight-player">
                    <Player name={'Player 1'} symbol={'X'} isActive={activePlayer === 'X'} onUpdatePlayerName={handleUpdatePlayerName} />
                    <Player name={'Player 2'} symbol={'O'} isActive={activePlayer === 'O'} onUpdatePlayerName={handleUpdatePlayerName} />
                </ol>
                { (winner || draw) && <GameOver winner={winner} onSelectRematch={handleSelectRematch} />}
                <GameBoard
                    board={gameBoard}
                    onSelectSquare={handleSelectSquare}
                />
            </div>
            <Log turns={gameTurns} />
        </main>
    )
}

export default App
