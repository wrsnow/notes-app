import { useState } from "react";

function FloatingInput(props) {
  const [inputState, setInputState] = useState({
    hasContent: false,
    isFocused: false,
  });

  const checkInputState = () => {
    return inputState.hasContent || inputState.isFocused;
  };

  const labelGroupClass = `${
    checkInputState()
      ? "bg-transparent text-[10px] top-[2px] left-[6px] opacity-50"
      : "top-[0.6rem] left-2"
  }`;

  const setAllToTrue = () => {
    setInputState({
      hasContent: true,
      isFocused: true,
    });
  };
  const setAllToFalse = (e) => {
    const inputIsNotEmpty = e.target.value.trim().length > 0;

    if (inputIsNotEmpty) {
      setInputState({
        hasContent: true,
        isFocused: false,
      });
      return;
    }

    setInputState({
      hasContent: false,
      isFocused: false,
    });
  };

  return (
    <div
      className={`my-3 relative border-[1px] border-[black]  ${
        props.className ?? "w-fit bg-white text-black"
      }`}
    >
      <input
        name={props.name}
        id={props.id}
        value={props.value}
        onFocus={setAllToTrue}
        onBlur={setAllToFalse}
        onChange={props.onChange}
        type={props.type ?? "text"}
        className={`px-2 pb-1 pt-4 w-full bg-transparent outline-none`}
      />
      <label
        htmlFor={props.id}
        className={`absolute pointer-events-none ${labelGroupClass} duration-300`}
      >
        {props.label}
      </label>
    </div>
  );
}

export default FloatingInput;
