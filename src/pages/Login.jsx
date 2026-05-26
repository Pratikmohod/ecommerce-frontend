import React, { useState } from 'react'
import {useNavigate} from "react-router-dom";
import { saveTokens } from '../utils/auth';



const Login = () => {
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
    const [form,setForm]= useState({username:"",password:""});
    const [message,setMessage] = useState("");
    const nav = useNavigate();

    const handleChange = (e) =>{
        setForm({...form,[e.target.name]: e.target.value});

        
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setMessage("");
        try{
            const response = await fetch(`${BASEURL}/api/token/`,{
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(form),
            });
            const data = await response.json();
            if (response.ok){
                saveTokens(data);
                setMessage("Login Successful!");
                setTimeout(()=>nav("/"),800);

            }else{
                if (data.detail){
                    setMessage("Wrong username or password");
                } else {
                    setMessage("Login failed")
                }

            }

        }catch(error) {
            console.error(error);
            setMessage("Login Failed");
        }
    };
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white p-6 rounded shadow flex items-center justify-center flex-col">
            <h2 className="text-2xl font-bold mb-4 ">Login</h2 >
            <form onSubmit={handleSubmit} className="space-y-3" >
                <input type='text' name='username' onChange={handleChange} value={form.username} placeholder="Username" required className="w-full p-2 m-2 border rounded" />
                <input type="password" name='password' onChange={handleChange} value={form.password} placeholder='Password' className="w-full p-2 m-2 border rounded" />
                <button className="w-full bg-blue-600 text-white py-2 m-2 rounded">Login</button>
            </form>
            <p className={`mt-3 text-lg ${message.includes("Successful") ?"text-green-600"  : "text-red-600"}`}>{message}</p>
            <div className="mt-4 text-sm">
                Don't have an account?{" "}
                <Link to="/signup" className='text-base font-bold text-blue-600'>
                    Sign up
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Login;