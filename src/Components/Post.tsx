import {  useState, type JSX } from 'react'
import { showAlert } from '../Utils/showAlert'
import { useAuth } from '../Context/AuthProvider';
import type {  FeedDataItems } from './types.ts'


interface PostProps{
    setModalOpen:(val:boolean)=>void;
    setCardData:(val:FeedDataItems[])=>void;
    cardData:FeedDataItems[];
}

const Post=({setModalOpen,setCardData,cardData}:PostProps):JSX.Element=>{

    const {isLogin}=useAuth();
    const [textAreaValue,setTextAreaValue]=useState<string>('');

    const handleClick=()=>{
        if(!isLogin){
            setModalOpen(true)
        }
        return
    }
    const hasEmoji = (text:string) => {
        return /\p{Emoji}/u.test(text);
      };

      const extractEmojis = (text:string) => {
        const emojiRegex = /\p{Emoji}/gu;
        return text.match(emojiRegex) || [];
      };

    const handlePost=()=>{
        if(!isLogin){
            return
        }
        if(textAreaValue.length===0){
            alert('Please enter a post');
            return
        }
       
        const newPost:FeedDataItems={
            id:cardData.length+1,
            name: 'User',
            imgUrl: '/assets/profile1.png',
            timeStamp: Date.now(),
            postText:  hasEmoji(textAreaValue) && extractEmojis(textAreaValue)[0] ? textAreaValue.replace(extractEmojis(textAreaValue)[0]!,'') : textAreaValue,
            emoji: (hasEmoji(textAreaValue) && extractEmojis(textAreaValue)[0])|| '😊',
        }
        setCardData([...cardData, newPost])
        setTextAreaValue('');
    }

  return (
    <>
    <div className='flex flex-col gap-3 mt-8 cursor-pointer' onClick={handleClick}>
        <div className='border-[1px] border-[#00000008] rounded-[21px] bg-[#F4F4F4]'>
            <div className='px-4 m-1  border-solid border-[1px] border-[#00000021] rounded-[18px] bg-[#FFFFFF] flex flex-col gap-3 '>
                <div className='flex justify-between pt-2 items-center'>
                    <div className='flex items-center gap-5 bg-[#00000008] rounded-[10px] border-solid border-[1px] border-[#00000008] pb-1 pl-1 pt-1 pr-5'>
                    <select className='text-sm font-medium h-[32px] text-[#000000CF] p-1 bg-[#FFFFFF] border-[#FFFFFF] rounded-[7px]' value="Paragraph" id="select"  onChange={()=>showAlert()}>
                    <option value="Paragraph">Paragraph</option>
                    </select>
                    <div className='flex justify-center items-center h-[30px] w-[30px] border-solid border-[1px] border-[#FFFFFF] bg-[#FFFFFF] rounded-[7px]' onClick={()=>showAlert()}>
                    <img src="/assets/text-bold.svg" className='h-[12px] w-[12px]' />
                    </div>
                    <img src="/assets/text-italic.svg" onClick={()=> isLogin && showAlert()} />
                    <img src="/assets/text-underline.svg" onClick={()=> isLogin && showAlert()} />
                    <div className="border-r-[1px] h-[30px] border-[#0000001A]"></div>
                    <img src="/assets/list-ordered.svg" onClick={()=> isLogin && showAlert()} />
                    <img src="/assets/list-unordered.svg" onClick={()=> isLogin && showAlert()} />
                    <div className="border-r-[1px] h-[30px] border-[#0000001A]"></div>
                    <img src="/assets/quotes.svg" onClick={()=> isLogin && showAlert()} />
                    <img src="/assets/script.svg" onClick={()=> isLogin && showAlert()} />
                    </div>
                    <div className="flex h-[40px] w-[40px] justify-center items-center rounded-[10px] border-solid border-[1px] border-[#FF000026] bg-[#FF000026]" onClick={()=>showAlert()}>
                        <img src="/assets/trash.svg" />
                    </div>
                </div>
                <div className='flex h-[100px] items-start'>
                   {!textAreaValue && <div className='w-[18px] h-[18px] flex items-center justify-center pt-[3px]'>
                        <img src="/assets/emotion-smile.svg" className="w-[18px] h-[18px]" />
                    </div>}
                    <textarea className='text-sm h-[100%] text-[#000000D4] font-medium w-[100%] border-none bg-[#FFFFFF] resize-none outline-none pb-2 px-2 cursor-pointer placeholder:text-[#00000066]' name='post' placeholder={'How are you feeling today?'} value={textAreaValue} onChange={(e)=>setTextAreaValue(e.target.value)} />
                </div>
                <div className='flex p-3 border-t-[1px] border-[#D9D9D9] -mx-4 gap-3 relative'>
                    <div className='border-solid border border-[#D9D9D9] rounded-[4px] bg-[#F2F2F2] flex'>
                    <img src='/assets/plus.svg' onClick={()=> isLogin && showAlert()} />
                    </div>
                    <img src='/assets/mic.svg' onClick={()=> isLogin && showAlert()} />
                    <img src='/assets/video-camera.svg' onClick={()=> isLogin && showAlert()} />
                    <div className='absolute right-[18px] bottom-[10px]' onClick={handlePost}>
                    <img src='/assets/send.svg' />
                    </div>
                </div>
            </div>
        </div>
        </div>
        </>
  )
}

export default Post
