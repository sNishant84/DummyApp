import {useEffect, useState, type JSX} from 'react'
import type { SignUpErrorType, SignUpFormType } from './types.ts';
import { saveData } from '../Utils/saveData.ts';
import { useAuth } from '../Context/AuthProvider.tsx';
import { useNavigate } from "react-router-dom";

interface SignUpProps{
    setClickedElement?:(val:string)=>void;
    setModalOpen?:(openModal:boolean)=>void;
    isModel?:boolean;
}

const SignUp=({setClickedElement,setModalOpen,isModel}:SignUpProps):JSX.Element=> {

    let intialValues={
        email: "",
        password:'',
        repeatedPassword: ""
    }
    
    const [formData, setFormData] = useState<SignUpFormType>(intialValues);
    const [errors,setErrorData]=useState<SignUpErrorType | {}>({});
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const navigate = useNavigate();
    const {setLogin,isLogin}=useAuth();
    const handleChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value}=event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
        if(!value && isSubmit){
         setErrorData({...errors,[name]:`${name} is Required`})
        }else{
         setErrorData({...errors,[name]:null})
        }
     }
     useEffect(()=>{
      if(isLogin){
       navigate('/home')
      }
},[isLogin])

     const validate = (values:SignUpFormType) => {
        const errors = {} as SignUpErrorType;
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        
        if (!values.email) {
          errors.email = "Email is required!";
        } else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format!";
        }
        
        if (!values.password) {
          errors.password = "Password is required!";
        } else if (values.password.length < 4) {
            errors.password = "Password must be more than 4 characters";
        } else if (values.password.length > 10) {
            errors.password = "Password cannot exceed more than 10 characters";
        }
        
        if (!values.repeatedPassword) {
          errors.repeatedPassword = "Repeat password is required";
        } else if (values.password !== values.repeatedPassword) {
            errors.repeatedPassword = "Passwords do not match";
        }
        
        return errors;
      };




    const handleSubmit=(event:any)=>{
        event.preventDefault();
        let errors=validate(formData)
        setErrorData(errors);
        setIsSubmit(true);
        if(errors && Object.keys(errors).length === 0){
          saveData(formData)
          setLogin(true);
         setModalOpen?.(false);   
        }
        
    }
    const handleClick=()=>{
      if(isModel){
        setClickedElement?.('signin');
      }else{
        navigate('/signin');
      }
  }

  return (
   <div className='place-content-center'>
    <div className='md:w-[460px] max-w-lg border-solid border-2 border-[#F4F4F4] bg-[#F4F4F4] rounded-[30px] max-h-[670px]'>
    <div className='border-solid border-2 border-[#FFFFFF]  max-h-md   px-8 py-8 mt-1 ml-1 mr-1    bg-[#fff] from-[#969696] to-[#343434] rounded-[21px]'>
        <div className='flex flex-col items-center'>
        <div className='border-solid border-[1px] h-[50px] w-[50px] border-[#F8F8F8] rounded-[50%] bg-[#F8F8F8] flex justify-center items-center'><img src="/assets/log-in-2.svg" alt="logo" /></div>
            <h1 className='text-[#000000] text-lg text-center mt-2.5'>Create an account to continue</h1>
            <p className='text-[#0000007A] text-sm text-center'>Create an account to access all the features on this app</p>
        </div>
        <div className='mt-15'>
            <form onSubmit={handleSubmit}>
                <div>
                    <div>
                    <label className='text-sm text-[#000000] font-semibold'>
                    Email or username 
                    </label>
                    </div>
                    <div>
                    <input className={`bg-[#F4F4F4] border-[1.5px] border-[#F4F4F4] w-[100%] placeholder-[#0000007A] text-sm p-2 rounded-[11px] mt-1 h-11 font-normal text-[#000000] outline-none ${(errors as SignUpErrorType).email ? 'border-red-500' : '' }`} name="email" onChange={handleChange} type="text" placeholder='Enter your email' autoComplete="off" />
                    {<p className=' h-2 text-[12px] text-red-500'>{(errors as SignUpErrorType).email}</p>}
                    </div>
                </div>
                <div className='mt-2'>
                    <div>
                    <label className='text-sm text-[#000000] font-semibold'>
                    Password 
                    </label>
                    </div>
                    <div>
                    <input className={`bg-[#F4F4F4] border-[1.5px] border-[#F4F4F4] w-[100%] placeholder-[#0000007A] text-sm p-2 rounded-[11px] mt-1 h-11 font-normal outline-none text-[#000000] ${(errors as SignUpErrorType).password ? 'border-red-500' : '' }`} name="password" onChange={handleChange} type="password" placeholder='Enter your password' autoComplete="off" />
                    { <p className=' h-2 text-[12px] text-red-500'>{(errors as SignUpErrorType).password}</p>}
                    </div>
                </div>
                <div className='mt-2'>
                    <div>
                    <label className='text-sm text-[#000000] font-semibold'>
                    Repeat password
                    </label>
                    </div>
                    <div className='relative'>
                    <input className={`bg-[#F4F4F4] border-[1.5px] border-[#F4F4F4] w-[100%] placeholder-[#0000007A] text-sm p-2 rounded-[11px] mt-1 h-11 font-normal outline-none text-[#000000] ${(errors as SignUpErrorType).repeatedPassword ? 'border-red-500' : '' }`} onChange={handleChange} name='repeatedPassword' type="password" placeholder='Enter your password again' autoComplete="off" />
                    { <p className='h-2 text-[12px] text-red-500'>{(errors as SignUpErrorType).repeatedPassword}</p>}
                    </div>
                </div>
                <div>
                   <button className='size-full bg-[#5057EA] mt-4 p-2 mb-2.5 font-semibold text-sm h-[50px] text-white rounded-[11px] cursor-pointer' type="submit">Sign Up</button>
                </div>
                
            </form>
        </div>
    </div>
    <div className='mt-4 mb-4'>
    <p className='text-[#0000007A] text-sm text-center'>Do not have and account? <a className='text-[#5057EA] text-sm text-center cursor-pointer' onClick={handleClick}>Sign in</a></p>
    </div>
    </div> 

    </div>

  )
}



export const SignUpPage=({setClickedElement,setModalOpen,isModel}:SignUpProps):JSX.Element=> {
    
  return (
   <div className='grid font-sans place-content-center'>
    <div className={ !isModel ? 'mt-8':''}>
   <SignUp isModel={isModel} setClickedElement={setClickedElement} setModalOpen={setModalOpen} />
   </div>
    </div> 

  )
}

export default SignUpPage;
