import { useState, useEffect } from "react";

function Notification() {
  const [isActive, setIsActive] = useState(true);
  const [isRendered, setIsRendered] = useState(true);

  const notificationClass = `${
    isActive ? "translate-x-[0%] opacity-100" : "translate-x-[150%] opacity-0"
  }`;

  useEffect(() => {
    if (isActive) {
      return;
    }
    const timeout = setTimeout(() => {
      setIsRendered(false);
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [!isActive]);

  return (
    <>
      {isRendered && (
        <div
          className={`aspect-video bg-black/75 backdrop-blur-sm flex flex-col p-3 py-1 duration-200 ${notificationClass} rounded-md `}
        >
          <header className="flex w-full items-center justify-center">
            <button
              onClick={() => setIsActive(false)}
              className="ml-auto w-7 aspect-square hover:bg-neutral-300/25 rounded-md"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </header>
          <div className="px-2">
            <h1 className="text-xl mb-2">Title</h1>
            <p className="pb-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
              quia laborum vero.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default Notification;
