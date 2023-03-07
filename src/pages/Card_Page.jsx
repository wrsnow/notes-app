import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import EditMode from "../components/Card/EditMode";
import ReadMode from "../components/Card/ReadMode";
import File_Pen from "../components/Icons/File_Pen";

function Card_Page() {
  const [isBeingEditted, setIsBeingEditted] = useState(false);
  let location = useLocation();
  let props = location.state?.props;
  const cardStyle = {
    backgroundColor: props.color ? props.color : "",
  };
  //

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-slate-800 to-slate-600 flex justify-center items-start p-10">
      <div style={cardStyle} className="flex flex-col w-[800px] min-h-[400px]">
        <header className="h-20 bg-inherit brightness-75 p-4 flex justify-between items-center text-3xl">
          <Link
            to="/"
            className="bg-inherit hover:brightness-110 active:brightness-125 w-10 aspect-square text-center duration-200 rounded-full"
          >
            <ArrowBackwards />
          </Link>
          <button
            onClick={() => setIsBeingEditted(true)}
            className="bg-inherit hover:brightness-125 active:brightness-150 duration-200 rounded-full p-2 flex- justify-center items-center"
          >
            <File_Pen />
          </button>
        </header>
        {isBeingEditted ? (
          <EditMode cardDetails={props} setIsBeingEditted={setIsBeingEditted} />
        ) : (
          <ReadMode content={props.content} title={props.title} />
        )}
      </div>
    </div>
  );
}

export default Card_Page;

const ArrowBackwards = () => {
  return <i className="fa-solid fa-arrow-left"></i>;
};
