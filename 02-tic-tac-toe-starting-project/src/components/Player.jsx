import { useState } from "react";

export default function Player({ initialName, symbol, isActive, onNameSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initialName);
  let btnCaption = "Edit";
  let editablePlayerName = <span className="player-name">{playerName}</span>;

  if (isEditing) {
    editablePlayerName = (
      <input
        type="text"
        required
        value={playerName}
        onChange={handleNameChange}
      />
    );
    btnCaption = "Save";
  }

  function handleEditClick() {
    setIsEditing((editing) => !editing);
  }
  function handleNameChange(event) {
    setPlayerName(event.target.value);
    onNameSave(symbol, event.target.value);
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{btnCaption}</button>
    </li>
  );
}
