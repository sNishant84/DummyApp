import {type ReactElement, type JSX} from 'react'
import { useClickOutside } from '../hooks/useClickOutside.ts';

interface ModalProps{
    Children:ReactElement;
    setModalOpen:(openModal:boolean)=>void;
    setClickedElement:(val:string)=>void;
}

const Modal=({Children,setModalOpen,setClickedElement}:ModalProps):JSX.Element=> {

    const handleClose=()=>{
        setModalOpen(false);
        setClickedElement('signin');
    }

    const modalRef = useClickOutside({
        callback: handleClose,
        enabled: true
    });

  return (
    <div ref={modalRef} className='flex flex-col justify-center absolute self-center shadow-2xl rounded-[30px]'>
        <div>
          {Children}
        </div>
    </div>
  )
}

export default Modal
