import {Player} from "./components/Player.jsx";
import {GameBoard} from "./components/GameBoard.jsx";
import {useState} from "react";
import Log from "./components/Log.jsx";

function App() {
    const [gameTurns, setGameTurns] = useState([])
    const [activePlayer, setActivePlayer] = useState('X')

    function handleSelectSquare (rowIndex, colIndex) {
        setActivePlayer(currActivePlayer => currActivePlayer === 'X' ? 'O' : 'X')
        setGameTurns(prevGameTurns => {
            let currentPlayer = 'X';
            if (prevGameTurns.length && prevGameTurns[0].player === 'X') {
                currentPlayer = 'O';
            }
            const updatedGameTurns = [
                {
                    square: {
                        row: rowIndex,
                        col: colIndex
                    },
                    player: currentPlayer
                },
                ...prevGameTurns
            ]
            return updatedGameTurns
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
