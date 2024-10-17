import { useState } from "react"
export default function Player({ player, onHandlePlayerChange }) {
    const [playerName, setPlayerName] = useState(player.name);
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        //setIsEditing(!isEditing); // toggle state based on previous state is not recommended becouse it is not predictable it schedule the state change for future. to replicate this issues copy paste the same code and its not work
        setIsEditing( (isEditing) => !isEditing);
        onHandlePlayerChange(player.symbol, playerName);
    }

    const handleChnage = (event) => {
        setPlayerName(event.target.value);
    }

    let editablePlayerName = <span className="player-name">{playerName}</span>;
    let btnlebel = "Edit";
    if (isEditing) {
        editablePlayerName = <input type="text" defaultValue={playerName} required onChange={handleChnage} />;
        btnlebel = "Save";
    }
    return (
        <li className={`player ${player.isActive ? 'active' : ''}`}>
            <span className="player-info">
                {editablePlayerName}
                <span className="player-symbol">{player.symbol}</span>
                <button className="edit" onClick={handleEditClick}>{btnlebel}</button>
            </span>
        </li>
    )
}