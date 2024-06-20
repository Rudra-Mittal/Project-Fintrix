"use client";
import { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function LoginPage(props:any) {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [error,setError]=useState('');
    const handleSubmit = async () => {
       if(!name || !phoneNumber || !password) setError(`${!name ? 'Name is required' : !phoneNumber ? 'Phone number is required' : 'Password is required'}`);
        else await signIn('credentials', {
            name,
            phone: phoneNumber,
            password,
            redirect:true,
            callbackUrl:props.searchParams.callbackUrl
        });
    };

    return (
        <div>
            <div className="text-red-500">
                {error}
            </div>
            <h1>Login</h1>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value) }  />
            <input type="number" placeholder="Phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}  />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </div>
    );
}