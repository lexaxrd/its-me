"use client"
import { useEffect, useState } from "react";
import Cookies from "js-cookie"
export default function RegisterPage() {
    const [error, setError] = useState<string | null>(null)
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

     useEffect(() => {
        const cookies = Cookies.get("user_email");
        if (cookies) {
            window.location.href = "/dashboard"
        }
    }, []);
    async function handleRegister(username: string, email: string, password: string) {
        setError(null);

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password })
            })
            const data = await response.json();
            if (!response.ok) {
                setError(data.error || "Register failed")
            }
            else {
                alert("Register successful!");
            }
        }
        catch (e) {
            setError("An error occurred during register: " + e)
        }
    }


    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <div className="flex items-center gap-3">
                <img src="/itsmelogo.png" alt="" width={55} />
                <h1 className="font-bold text-4xl">ITS.ME</h1>
            </div>
            <div className="mt-8 mb-4 flex flex-col gap-4 p-6 px-10 rounded-lg border border-[rgb(0,0,0,0.14)] bg-gradient-to-r from-[#F9F9F9] to-[#FFFFFF] max-w-[400px]">
                <h1 className="font-bold text-4xl">Register to ITS.ME</h1>
                 <div className="mt-4 flex flex-col gap-1 w-[300px]">
                    <p className="font-medium">Username</p>
                    <input onChange={e => setUsername(e.target.value)} type="text" placeholder="Your Username" className="bg-[#F3F3F3] transition duration-200 outline-none border-2 border-transparent focus:border-blue-600 rounded-lg w-full p-3" />
                </div>
                <div className="flex flex-col gap-1 w-[300px]">
                    <p className="font-medium">Mail Address</p>
                    <input onChange={e => setEmail(e.target.value)} type="text" placeholder="yourmail@its.me" className="bg-[#F3F3F3] transition duration-200 outline-none border-2 border-transparent focus:border-blue-600 rounded-lg w-full p-3" />
                </div>
                <div className=" flex flex-col gap-1 w-[300px]">
                    <p className="font-medium">Password</p>
                    <input onChange={e => setPassword(e.target.value)} type="password" placeholder="Your Password" className="bg-[#F3F3F3] transition duration-200 outline-none border-2 border-transparent focus:border-blue-600 rounded-lg w-full p-3" />
                </div>
                <button onClick={() => handleRegister(username, email, password)} className="rounded-lg bg-[#3273FF] hover:bg-blue-700 transition duration-300 text-white py-3 cursor-pointer text-[1.10rem] mb-4"> Register </button>
                {error && (
                    <p className="text-red-500 text-center"> {error} </p>
                )}
            </div>
            <div>
                <a href="/login"> Do you have an account? <span className="cursor-pointer text-blue-600 hover:underline">Log in</span> </a>
            </div>
        </div>
    );
}
