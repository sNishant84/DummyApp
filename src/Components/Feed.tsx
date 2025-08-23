import { useState, type FC, type JSX } from 'react';
import { feedData } from '../Data/data.ts';
import FeedCard from './FeedCard.tsx';
import { Login } from './Login.tsx';
import Modal from './Modal.tsx';
import Post from './Post.tsx'
import SignUp from './SignUp.tsx'
import { type FeedDataItems } from './types.ts';

const Feed:FC=():JSX.Element=> {
    
const [openModal,setModalOpen]=useState<boolean>(false);
const [clickedElement,setClickedElement]=useState<string>('signin');
const [cardData,setCardData]=useState<FeedDataItems[]>(feedData);


  return (
   <div className='bg-[#FFFFFF] h-screen font-sans overflow-scroll relative'> 
    <div className='flex justify-center my-5'>
      <div className='max-w-[714px] p-[14px]'>
        <Post cardData={cardData} setModalOpen={setModalOpen} setCardData={setCardData} />
        <FeedCard feedData={cardData} setModalOpen={setModalOpen}  />
      </div>
    </div>
    {openModal && <div className='flex justify-center fixed top-0 right-0 bottom-0 left-0 w-[100%] h-[100%] z-1 backdrop-blur-[3px] transition-opacity duration-300'>
     <Modal setModalOpen={setModalOpen} setClickedElement={setClickedElement} Children={clickedElement ==='signup' ? <SignUp setClickedElement={setClickedElement} isModel={true} setModalOpen={setModalOpen} /> : <Login setClickedElement={setClickedElement} isModel={true} setModalOpen={setModalOpen} />} />
    </div>}
    </div>
  )
}

export default Feed
