import { createPortal } from "react-dom";
import AddNewNote from "./AddNewNote";

const Backdrop = ({ setIsModalOpened }) => {
  return (
    <div
      onClick={() => setIsModalOpened(false)}
      className="w-full h-screen fixed bg-black/50 top-0 left-0 z-40"
    ></div>
  );
};

function Modal({ isModalOpened, setIsModalOpened, setNewData }) {
  return (
    <>
      {isModalOpened &&
        createPortal(
          <Backdrop setIsModalOpened={setIsModalOpened} />,
          document.getElementById("backdrop")
        )}
      {isModalOpened && (
        <div className="modal absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-black w-[400px] aspect-square z-50 rounded-md">
          <div className="modal-content">
            <header className="flex justify-between items-center px-3 bg-neutral-700 text-white w-full h-14 text-center text-3xl rounded-t-sm">
              HEADER
              <button
                onClick={() => setIsModalOpened(false)}
                className="px-4 py-1 bg-neutral-400 rounded-md"
              >
                X
              </button>
            </header>
            <AddNewNote
              setIsModalOpened={setIsModalOpened}
              setNewData={setNewData}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
