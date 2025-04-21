import { HiOutlineX } from "react-icons/hi";
import useOutsideClick from "../hooks/useOutsideClick";

function AccessModal({ onClose, children, title }) {
  const ref = useOutsideClick(onClose);

  return (
    <div className="backdrop-blur-sm fixed top-0 left-0 w-full h-screen bg-slate-900 bg-opacity-30 z-50">
      <div
        ref={ref}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        rounded-lg bg-slate-900 p-4 shadow-lg transition-all duration-500 ease-out
        w-[calc(100vw-25%)] md:max-w-5xl max-h-[calc(100vh-25%)] overflow-y-auto"
      >
        <div className="flex items-center justify-between border-b border-gray-300 pb-2 mb-6">
          <div className="flex items-center gap-x-2">
            <button className="w-10">
              <img src="./public/logo demo.jpg" alt="" />
            </button>
            <h1 className="text-white font-bold text-2xl">{title}</h1>
          </div>
          <button onClick={onClose}>
            <HiOutlineX className="w-5 h-5 text-white" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default AccessModal;
