import {  type JSX } from 'react'

import type {  FeedDataItems } from './types.ts'
import { useAuth } from '../Context/AuthProvider.tsx';
import { showAlert } from '../Utils/showAlert.ts'

interface FeedCardProps{
    feedData:FeedDataItems[];
    setModalOpen:(val:boolean)=>void;
    
}


const FeedCard=({feedData,setModalOpen}:FeedCardProps):JSX.Element=> {
  
    const {isLogin}=useAuth()
    

    const handleClick=()=>{
        if(!isLogin){
            setModalOpen(true)
        }
        return
    }

  return (
    <div onClick={handleClick}>
     {feedData && feedData.length > 0 && feedData.map((feedValue:FeedDataItems,index:number)=>{
        return(
            <div className='flex flex-col gap-3 mt-6 cursor-pointer border-solid border-2 bg-[#F4F4F4] border-[#F4F4F4] rounded-[21px]' key={index}>
            <div className='px-3 py-4 border-solid border-2 border-[#FFFFFF] rounded-[18px] mt-1 ml-1 mr-1 bg-[#FFFFFF] flex flex-col gap-2'>
                <div className='flex justify-between items-center'>
                <div className='flex gap-3'>
                    <div>
                    <img src={feedValue.imgUrl} />
                    </div>
                    <div>
                        <p className='text-[13px] text-[#000000]'>{feedValue.name}</p>
                        <p className='text-xs text-[#0000005E] font-medium'>{`${feedValue.timeStamp} mins ago`}</p>
                    </div>
                </div>
                    </div>
                <div className='border-solid border border-[#FFFFFF] rounded-[18px] bg-[#FFFFFF] flex gap-3'>
                    <div className='border-solid border-[0.5px] w-[8px] h-[8px]  md:w-10 md:h-10 border-[#FFFFFF] bg-[#F2F2F2] rounded-full items-center flex place-content-center min-w-[9%] sm:min-w-[0] leading-[21px]'>{feedValue.emoji}</div>
                    <p className='text-sm text-[#000000D4] max-w-[91%]'>{feedValue.postText}</p>
                </div>
            </div>
            <div className='flex gap-6 px-3 pb-3'>
                <img src='/assets/comment-text.svg' onClick={()=> isLogin && showAlert()} />
                <img src='/assets/heart.svg' onClick={()=> isLogin && showAlert()} />
                <img src='/assets/send-2.svg' onClick={()=> isLogin && showAlert()} />
                </div>
        </div>
        )
     })}
    </div>
  )
}

export default FeedCard
