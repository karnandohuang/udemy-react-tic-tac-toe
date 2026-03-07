import {useState} from "react";

export function Player({ name, symbol, isActive, onUpdatePlayerName }) {
    const [isEditing, setIsEditing] = useState(false)
    const [playerName, setPlayerName] = useState(name)

    const handleEditClick = () => {
        setIsEditing(editing => !editing)

        if (isEditing) {
            onUpdatePlayerName(symbol, playerName)
        }
    }

    const handleChange = (e) => {
        setPlayerName(e.target.value)
    }

    let editablePlayerName = <span className="player-name">{playerName}</span>
    if (isEditing) {
        editablePlayerName = <input type="text" required value={playerName} onChange={handleChange} />
    }

    return (
        <li className={isActive ? 'active' : ''}>
            <span className="player">
                {editablePlayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing ? 'Save': 'Edit'}</button>
        </li>
    )
}