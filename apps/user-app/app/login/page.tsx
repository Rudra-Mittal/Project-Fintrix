"use client";
import { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function LoginPage(props:any) {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [error,setError]=useState('');
    const [signin,setsignin]=useState(true);
    const handleSubmit = () => {
       if((!name&&!signin) || !phoneNumber || !password) setError(`${!name ? 'Name is required' : !phoneNumber ? 'Phone number is required' : 'Password is required'}`);
        else signIn('credentials', {
            name,
            phone: phoneNumber,
            password,
            redirect:true,
            callbackUrl:props.searchParams.callbackUrl
        });
    };

    return (
    <div className="container px-4 mx-auto">
  <div className="max-w-lg mx-auto">
    <div className="text-center mb-6">
      <h2 className="text-3xl md:text-4xl font-extrabold">{(signin)?"Sign in":"Sign Up"}</h2>
    </div>
    {(error)?<div className="mb-6 text-red-500">{error}</div>:null}
      {(signin)?null:<div className="mb-6">
        <label className="block mb-2 font-extrabold" htmlFor="">Name</label>
        <input className="inline-block w-full p-4 leading-6 text-lg font-extrabold placeholder-indigo-900 bg-white shadow border-2 border-indigo-900 rounded" type="text" placeholder="name" onChange={(e)=>setName(e.target.value)}/>
      </div>}
      <div className="mb-6">
        <label className="block mb-2 font-extrabold" htmlFor="">Mobile Number</label>
        <input onChange={(e)=>setPhoneNumber(e.target.value)} className="inline-block w-full p-4 leading-6 text-lg font-extrabold placeholder-indigo-900 bg-white shadow border-2 border-indigo-900 rounded" type="text" placeholder="Number"/>
      </div>
      <div className="mb-6">
        <label className="block mb-2 font-extrabold" htmlFor="">Password</label>
        <input onChange={(e)=>setPassword(e.target.value)} className="inline-block w-full p-4 leading-6 text-lg font-extrabold placeholder-indigo-900 bg-white shadow border-2 border-indigo-900 rounded" type="password" placeholder="**********"/>
      </div>
      <div className="flex flex-wrap -mx-4 mb-6 items-center justify-between">
        
        <div className="w-full lg:w-auto px-4"><a className="inline-block font-extrabold hover:underline" href="#">Forgot your
            password?</a></div>
      </div>
      <button type='submit'  onClick={handleSubmit} className="inline-block w-full py-4 px-6 mb-6 text-center text-lg leading-6 text-white font-extrabold bg-indigo-800 hover:bg-indigo-900 border-3 border-indigo-900 shadow rounded transition duration-200">{(signin)?"Sign In":"Sign Up"}</button>
      <p className="text-center font-extrabold">{(signin)?"Don't have an account ":"Already have an account"} <p className="text-red-500 hover:underline"
          onClick={()=>setsignin((prev)=>!prev)}>{(signin)?"Sign Up":"Sign In"}</p></p>
  </div>
</div>
        
    );
}