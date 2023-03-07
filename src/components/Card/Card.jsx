import { useState } from "react";
import CardHeader from "./CardHeader";

function Card(props) {
  const { id, title, content, color } = props;
  const [noteColor, setNoteColor] = useState(color);
  const cardStyle = {
    backgroundColor: noteColor ? noteColor : "",
    color: noteColor === "#131313" ? "#fff" : "#000",
  };
  const headerStyle = {
    color: noteColor === "#131313" ? "#fff" : "#000",
  };
  const cardContent = {
    id,
    title,
    content,
    color,
  };

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 2xl:w-1/4 aspect-[4/3] p-4 hover:scale-105 duration-200">
      <div
        style={cardStyle}
        className="relative rounded-sm w-full h-full bg-slate-50 text-black overflow-y-auto"
      >
        <CardHeader
          cardContent={cardContent}
          headerStyle={headerStyle}
          deleteNote={props.deleteNote}
        />
        <div className="px-4 py-2 text-start break-words">
          <h1 className="text-center xl:text-3xl text-2xl pb-7">
            {props.title}
          </h1>
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
