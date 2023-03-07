import React, { lazy, Suspense, useContext, useEffect, useState } from "react";
import { child, get } from "firebase/database";
import { dbRef } from "../services/firebaseConfig";
import UserAuthContext from "./Auth/UserAuthContext";
import CardsWrapper from "./Card/CardsWrapper";
import Navbar from "./Navbar";
import NewNoteButton from "./NewNoteButton";

function MainBody(props) {
  const authContext = useContext(UserAuthContext);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [notes, setNotes] = useState([]);
  const [newData, setNewData] = useState(false);

  const Modal = lazy(() => import("./Modal/Modal"));

  useEffect(() => {
    if (!authContext.userUID) {
      return;
    }
    get(child(dbRef, `users_notes/${authContext.userUID}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setNotes(Object.entries(snapshot.toJSON()));
        } else {
          setNotes([]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [newData]);

  return (
    <>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Navbar />
        <div className="w-full bg-slate-400 min-h-screen text-white p-4">
          <CardsWrapper notes={notes || []} setNewData={setNewData} />
        </div>
        <Modal
          setNewData={setNewData}
          isModalOpened={isModalOpened}
          setIsModalOpened={setIsModalOpened}
        />
        <NewNoteButton setIsModalOpened={setIsModalOpened} />
      </Suspense>
    </>
  );
}

export default MainBody;
