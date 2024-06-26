import React from 'react'
import { createPortal } from 'react-dom';
import { AiOutlineClose } from 'react-icons/ai'

export const Modal = ({isOpen,onClose,children}) => {
  return createPortal(
    <>
      {isOpen && (
        <div className=" grid place-items-center absolute backdrop-blur h-screen w-screen top-0 z-40">
          <div
             className="m-auto relative z-50 min-h-[200px] min-w-[80%] bg-white p-4"
          >
            <div className="flex justify-end">
              <AiOutlineClose onClick={onClose} className=" text-2xl" />
            </div>
            {children}
          </div>
        </div>
      )}
    </>,
    document.getElementById("modal-root")
  );
};

export default Modal