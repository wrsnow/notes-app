import { useState } from "react";
import Input from "../UI/Input";
import { push, ref } from "firebase/database";
import { db } from "../../services/firebaseConfig";
import { useContext } from "react";
import UserAuthContext from "../Auth/UserAuthContext";

function AddNewNote(props) {
  const authContext = useContext(UserAuthContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [chosenColor, setChosenColor] = useState("");
  const availableColors = [
    "#da8f8f",
    "#f882b1",
    "#c36ee2",
    "#6158db",
    "#ac6ee2",
    "#e2cf6e",
    "#91e26e",
    "#ffffff",
    "#131313",
  ];

  const checkInputs = (e) => {
    e.preventDefault();
    if (title.trim().length > 0 && content.trim().length > 0) {
      createNewNote();
      return;
    }
    alert("You cannot add an empty note.");
  };

  function createNewNote() {
    if (authContext.userUID) {
      push(ref(db, "users_notes/" + authContext.userUID), {
        title: title,
        content: content,
        noteColor: chosenColor,
      })
        .then(() => {
          setTitle("");
          setContent("");
          setChosenColor("");
          props.setNewData((prev) => !prev);
          props.setIsModalOpened(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <form
      className="flex flex-col justify-center w-full px-7 pb-7"
      onSubmit={checkInputs}
    >
      <Input
        placeholder="Title"
        name="title"
        value={title}
        className="border-[1px] border-black px-2 py-2"
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="border-[1px] border-black p-2 max-h-[400px]"
        name="content"
        id="content"
        cols="30"
        rows="10"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <div className="w-full flex gap-3 my-2 justify-center items-center">
        {availableColors.map((color) => {
          return (
            <div
              key={color}
              style={{ backgroundColor: `${color}` }}
              className={`${
                chosenColor === color
                  ? "w-7 h-7 border shadow-sm shadow-black scale-125"
                  : "w-7 h-7 border shadow-sm shadow-black"
              }`}
            >
              <input
                onChange={(e) => setChosenColor(color)}
                type="radio"
                name="color"
                className="w-full h-full appearance-none cursor-pointer"
              />
            </div>
          );
        })}
      </div>
      <button
        type="submit"
        className="w-full bg-slate-700 my-2 py-4 text-white rounded-md"
      >
        Add
      </button>
    </form>
  );
}

export default AddNewNote;
