import React from "react";

function ReadMode({ content, title }) {
  return (
    <>
      <div className="p-7">
        <div className="text-center text-4xl font-semibold mb-10">
          <p>{title}</p>
        </div>
        <div className="text-xl">
          <p>{content}</p>
        </div>
      </div>
    </>
  );
}

export default ReadMode;
