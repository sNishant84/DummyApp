import  { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Header = () => {
 
    const [currentPath,setCurrentPath]=useState<string>('');

    useEffect(()=>{
        setCurrentPath(window.location.pathname);
    },[window.location.pathname])
    const navigate = useNavigate();

  return (
    <div className='flex justify-between items-center mx-4 mt-3'>
        <div className='flex items-center gap-2'>
            <img className='w-[34px] h-[34px]' src="/assets/mouse.svg" alt="logo" />
            <p className='text-base  font-bold'>foo-rum</p>
        </div>
        
       {currentPath=='/home'   ?
       <div className='flex items-center gap-2 cursor-pointer' onClick={()=>navigate('/signin')}>
        <p className='text-sm font-semibold'>login</p>
            <img className='w-[20px] h-[20px]' src="/assets/log-in-2.svg" alt="login"  />
            </div>
            : 
            <div className='flex items-center gap-2 cursor-pointer' onClick={()=>navigate('/home')}>
            <p className='text-sm font-semibold'>Back to home</p>
            </div>}

    </div>
  )
}

export default Header
