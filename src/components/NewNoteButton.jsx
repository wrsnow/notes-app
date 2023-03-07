import React from "react";
import Pen from "./Icons/Pen";

function NewNoteButton(props) {
  return (
    <button
      onClick={() => props.setIsModalOpened(true)}
      className="fixed bottom-2 right-2 w-fit  rounded-full bg-black hover:bg-blue-900 text-white flex justify-center items-center p-3"
    >
      <Pen />
    </button>
  );
}

export default NewNoteButton;
