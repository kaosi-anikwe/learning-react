import { useRef, useState } from "react";
import Modal from "./Modal";

export default function Tasks({ tasks, title, onTaskSave, onTaskDelete }) {
  const modal = useRef();
  const [enteredValue, setEnteredValue] = useState("");

  function handleInput(event) {
    setEnteredValue(event.target.value);
  }
  function handleClick() {
    if (enteredValue.trim() === "") {
      modal.current.open();
      return;
    }
    onTaskSave(title, enteredValue);
    setEnteredValue("");
  }
  return (
    <section>
      <Modal ref={modal} buttonCaption="Okay">
        <h2 className="text-xl font-bold text-stone-700 my-4">Invalid Input</h2>
        <p className="text-stone-600 mb-4">
          Oops... looks like you forgot to enter a value.
        </p>
        <p className="text-stone-600 mb-4">You cannot add an empty task.</p>
      </Modal>
      <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
      <div className="flex items-center gap-4">
        <input
          value={enteredValue}
          onChange={handleInput}
          className="w-64 px-2 py-1 rounded-sm bg-stone-200"
        />
        <button
          onClick={handleClick}
          className="text-stone-700 hover:text-stone-950"
        >
          Add Task
        </button>
      </div>
      {tasks.length === 0 && (
        <p className="text-stone-800 my-4">
          This project does not have any tasks yet.
        </p>
      )}
      {tasks.length > 0 && (
        <ul className="p-4 mt-8 rounded-md bg-stone-100">
          {tasks.map((task, idx) => (
            <li key={idx} className="flex justify-between my-4">
              <span>{task}</span>
              <button
                onClick={() => onTaskDelete(title, task)}
                className="text-stone-700 hover:text-red-500"
              >
                Clear
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
