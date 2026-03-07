import {Player} from "./components/Player.jsx";
import {GameBoard} from "./components/GameBoard.jsx";
import {useState} from "react";
import Log from "./components/Log.jsx";

function App() {
    const [gameTurns, setGameTurns] = useState([])

    const activePlayer = deriveActivePlayer(gameTurns)

    function deriveActivePlayer (gameTurns) {
        let currentPlayer = 'X';
        if (gameTurns.length && gameTurns[0].player === 'X') {
            currentPlayer = 'O';
        }
        return currentPlayer
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

    return (
        <main>
            <div id="game-container">
                <ol id="players" className="highlight-player">
                    <Player name={'Player 1'} symbol={'X'} isActive={activePlayer === 'X'} />
                    <Player name={'Player 2'} symbol={'O'} isActive={activePlayer === 'O'} />
                </ol>
                <GameBoard
                    turns={gameTurns}
                    onSelectSquare={handleSelectSquare}
                />
            </div>
            <Log turns={gameTurns} />
        </main>
    )
}

export default App
