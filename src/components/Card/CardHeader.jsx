import React from "react";
import { Link } from "react-router-dom";
import Expand from "../Icons/Expand";
import Trash from "../Icons/Trash";
import Button from "../UI/Button";

function CardHeader(props) {
  return (
    <header
      style={props.headerStyle}
      className="min-h-[40px] w-full bg-inherit brightness-[90%] text-black text-xl flex items-center justify-between px-4  py-2"
    >
      <Button onClick={props.deleteNote}>
        <Trash />
      </Button>
      <Button>
        <Link
          to={`card/${props.cardContent.id}`}
          state={{ props: props.cardContent }}
        >
          <Expand />
        </Link>
      </Button>
    </header>
  );
}

export default CardHeader;
