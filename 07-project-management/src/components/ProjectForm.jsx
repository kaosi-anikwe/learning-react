import { useRef } from "react";
import Input from "./Input";
import Modal from "./Modal";

export default function ProjectForm({ onProjectSave, onProjectCreateCancel }) {
  const modal = useRef();
  const title = useRef();
  const description = useRef();
  const dueDate = useRef();

  function handleSave() {
    const newProject = {
      title: title.current.value,
      description: description.current.value,
      dueDate: dueDate.current.value,
      tasks: [],
    };
    if (
      newProject.title.trim() === "" ||
      newProject.description.trim() === "" ||
      newProject.dueDate.trim() === ""
    ) {
      modal.current.open();
      return;
    }
    onProjectSave(newProject);
  }
  return (
    <>
      <Modal ref={modal} buttonCaption="Okay">
        <h2 className="text-xl font-bold text-stone-700 my-4">Invalid Input</h2>
        <p className="text-stone-600 mb-4">
          Oops... looks like you forgot to enter a value.
        </p>
        <p className="text-stone-600 mb-4">
          Please make sure you provide a valid value for every input field.
        </p>
      </Modal>
      <div className="w-[35rem] mt-16">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button
              onClick={onProjectCreateCancel}
              className="text-stone-800 hover:text-stone-950"
            >
              Cancel
            </button>
          </li>
          <li>
            <button
              onClick={handleSave}
              className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
            >
              Save
            </button>
          </li>
        </menu>
        <div className="mt-4 text-left">
          <Input ref={title} label="Title" type="text" />
          <Input ref={description} label="Description" textarea />
          <Input ref={dueDate} label="Due Date" type="date" />
        </div>
      </div>
    </>
  );
}
