import React, { useContext, useState } from "react";
import Confirm from "../Icons/Confirm";
import Cross from "../Icons/Cross";
import { db } from "../../services/firebaseConfig";
import { ref, set } from "firebase/database";
import { useNavigate } from "react-router-dom";
import UserAuthContext from "../Auth/UserAuthContext";

function EditMode(props) {
  const authContext = useContext(UserAuthContext);
  const navigate = useNavigate();

  const cardDetails = props.cardDetails;
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  function updateNote() {
    set(ref(db, `users_notes/${authContext.userUID}/${cardDetails.id}`), {
      title: newTitle ? newTitle : cardDetails.title,
      content: newContent ? newContent : cardDetails.content,
      noteColor: cardDetails.color,
    })
      .then(() => {
        setNewTitle("");
        setNewContent("");
        navigate("/");
        props.setIsBeingEditted(false);
      })
      .catch((error) => {
        // The write failed...
      });
  }

  return (
    <div className="p-7">
      <div className="text-center text-4xl font-semibold mb-10">
        <input
          onChange={(e) => setNewTitle(e.target.value)}
          type="text"
          className="w-full p-3 border-2 border-black/75"
          placeholder={cardDetails.title}
        />
      </div>
      <div className="text-xl">
        <textarea
          onChange={(e) => setNewContent(e.target.value)}
          name=""
          id=""
          rows="10"
          className="w-full border-2 border-black/75 p-3"
          placeholder={cardDetails.content}
        ></textarea>
      </div>
      <div className="w-full flex justify-center items-center gap-2 mt-7 text-2xl">
        <button
          onClick={() => props.setIsBeingEditted(false)}
          className="w-1/2 p-4 bg-red-400 hover:bg-red-500 active:bg-red-600 border-2 border-black"
        >
          <Cross />
        </button>
        <button
          onClick={updateNote}
          className="w-1/2 p-4 bg-white hover:bg-green-200 active:bg-green-400 border-2 border-black"
        >
          <Confirm />
        </button>
      </div>
    </div>
  );
}

export default EditMode;
