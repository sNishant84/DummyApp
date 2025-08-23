import {useEffect, useState, type JSX} from 'react'
import { useAuth } from '../Context/AuthProvider.tsx';
import { retrievedData } from '../Utils/retrieveData.ts';
import type { LoginErrorType, LoginFormType } from './types.ts';
import { useNavigate } from "react-router-dom";

interface LoginProps{
    setClickedElement?:(val:string)=>void;
    setModalOpen?:(openModal:boolean)=>void;
    isModel?:boolean;
}


export const Login =({setClickedElement,setModalOpen,isModel}:LoginProps):JSX.Element=>{

    const intialValues:LoginFormType={
        email: "",
        password: ""
    }

    const navigate = useNavigate();
    
    const [formData, setFormData] = useState<LoginFormType>(intialValues);
    const [errors,setErrorData]=useState<LoginErrorType | {}>({});
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const {isLogin,setLogin,login}=useAuth();
   

    const handleChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
       const {name,value}=event.target;
       setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
       if(!value && isSubmit){
        setErrorData({...errors,[name]:`${name} is Required`})
       }else{
        setErrorData({...errors,[name]:''})
       }
    }

    useEffect(()=>{
           if(isLogin){
            navigate('/home')
           }
    },[isLogin])

    const validate = (values:LoginFormType) => {
        const errors = {} as LoginErrorType;
        if (!values.email) {
          errors.email = "Email is required!";
        }
        if (!values.password) {
          errors.password = "Password is required";
        }
        return errors;
      };

    const handleSubmit=(event:any)=>{
        event.preventDefault();
        let errors=validate(formData)
        setErrorData(errors);
        setIsSubmit(true);
        if(errors && Object.keys(errors).length === 0){
        const valid=login(formData.email,formData.password)
          const loginState=retrievedData(formData)
          if(valid || loginState){
            setLogin(true);
            setModalOpen?.(false)
          }else{
            const errors = {} as LoginErrorType;
            errors.loginError="email or username doesn't exist";
            setErrorData(errors)
          }
        }
    }

    const handleClick=()=>{
        if(isModel){
            setClickedElement?.('signup');
        }else{
            navigate('/signup');
        }
    }



  return(
    <div className='border-solid border-2 border-[#F4F4F4] bg-[#F4F4F4]  rounded-[30px] max-w-lg md:max-h-[570px] h-auto  w-[460px]'>
<div className='border-solid border-2 border-[#F4F4F4] bg-[#fff] rounded-[30px] mt-1 ml-1 mr-1  h-auto px-9 pt-9 pb-9'>
    <div className='flex flex-col items-center'>
        <div className='border-solid border-[1px] h-[50px] w-[50px] border-[#F8F8F8] rounded-[50%] bg-[#F8F8F8] flex justify-center items-center'><img src="/assets/log-in-2.svg" alt="logo" /></div>
        <p className='text-[#000000] text-xl text-center font-bold mt-2.5'>Sign in to continue</p>
        <h1 className='text-[#0000007A] text-sm text-center'>Sign in to access all the features on this app</h1>
    </div>
    <div className='mt-12'>
        <form onSubmit={handleSubmit}>
            <div>
                <div>
                <label className='text-sm text-[#000000] font-medium'>
                    Email Or Username
                </label>
                </div>
                <div>
                <input className={`bg-[#F4F4F4] border-[1.5px] border-[#F4F4F4] w-[100%] placeholder-[#0000007A] text-[#000000] text-sm p-2 rounded-[11px] mt-1 h-11 font-normal outline-none ${(errors as LoginErrorType).email ? 'border-red-500' : '' }`}  name="email" onChange={handleChange} type="text" placeholder='Enter your email or username' autoComplete="off" />
                {<p className='text-[12px] h-2 text-red-500'>{(errors as LoginErrorType).email}</p>}
                </div>
            </div>
                      <div className='mt-2'>
                <div className='flex justify-between'>
                <label className='text-sm text-[#000000] font-medium'>
                    Password
                </label>
                </div>
                <div className='relative'>
                <input className={`bg-[#F4F4F4] border-[1.5px] border-[#F4F4F4] w-[100%] placeholder-[#7F8084] text-sm p-2 rounded-[11px] mt-1 h-11 font-normal outline-none text-[#000000] ${(errors as LoginErrorType).password ? 'border-red-500' : '' }`} type='password' name="password" onChange={handleChange}  placeholder='Enter your password' autoComplete="off" />
                <p className='text-[12px]  h-2 text-red-500'>{(errors as LoginErrorType).password}</p>
                </div>
            </div>
            <p className="text-[12px] h-2 text-red-500">{(errors as LoginErrorType).loginError && `Username or email doesn't exist`}</p>
            <div>
               <button className='size-full bg-[#5057EA] mt-4 mb-2.5 p-2 text-sm text-white rounded-[11px] cursor-pointer' type="submit">Sign in</button>
            </div>
        </form>
    </div>
    </div>
    <div className='mt-4 mb-4'>
    <p className='text-[#0000007A] text-sm text-center'>Do not have and account? <a className='text-[#5057EA] text-sm text-center cursor-pointer' onClick={handleClick}>Sign up</a></p>
    </div>
 </div>
  )
}

export const LoginPage=({isModel}:LoginProps):JSX.Element=> {
    
  return (
   <div className='h-screen grid font-sans place-content-center'>
    <div className='mt-8'>
   <Login isModel={isModel} />
   </div>
    </div> 

  )
}
