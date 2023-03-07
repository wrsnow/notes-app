import Card from "./Card";
import { remove, ref } from "firebase/database";
import { db } from "../../services/firebaseConfig";
import { useContext } from "react";
import UserAuthContext from "../Auth/UserAuthContext";

function CardsWrapper(props) {
  const authContext = useContext(UserAuthContext);

  function deleteNote(card_id) {
    remove(ref(db, `users_notes/${authContext.userUID}/${card_id}`))
      .then(() => {})
      .catch((err) => {})
      .finally(() => {
        props.setNewData((prev) => !prev);
      });
  }

  return (
    <div className="flex w-[min(1920px,100%)] flex-wrap mx-auto items-center">
      {props.notes.length > 0 ? (
        props.notes?.map((note) => {
          return (
            <Card
              key={note[0]}
              id={note[0]}
              title={note[1].title}
              content={note[1].content}
              color={note[1].noteColor}
              deleteNote={() => deleteNote(note[0])}
            />
          );
        })
      ) : (
        <h1 className="mx-auto text-3xl mt-20"> No notes... </h1>
      )}
    </div>
  );
}

export default CardsWrapper;
