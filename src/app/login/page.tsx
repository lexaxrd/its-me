"use client"
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { redirect } from "next/dist/server/api-utils";

export default function LoginPage() {
    const [error, setError] = useState<string | null>(null);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    useEffect(() => {
        const cookies = Cookies.get("user_email");
        if (cookies) {
            window.location.href = "/dashboard"
        }
    }, []);
    async function handleLogin(email: string, password: string) {
        setError(null)
        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            })
            const data = await response.json()
            if (!response.ok) {
                setError(data.error || "Login failed");
            }
            else {
                if (data.user) {
                    const forever = { expires: 365 * 20 };
                    Cookies.set("user_id", data.user._id, forever);
                    Cookies.set("username", data.user.username, forever);
                    Cookies.set("user_email", data.user.email, forever);
                    Cookies.set("user_password", data.user.password, forever);
                }
                alert("Login successful!");
                window.location.href = "/dashboard"
            }
        }
        catch (e) {
            setError("An error occurred during login: " + e);
        }
    }

    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <div className="flex items-center gap-3">
                <img src="/itsmelogo.png" alt="" width={55} />
                <h1 className="font-bold text-4xl">ITS.ME</h1>
            </div>
            <div className="mt-8 mb-4 flex flex-col gap-4 p-6 px-10 rounded-lg border border-[rgb(0,0,0,0.14)] bg-gradient-to-r from-[#F9F9F9] to-[#FFFFFF] max-w-[400px]">
                <h1 className="font-bold text-4xl">Log In to ITS.ME</h1>
                <div className="mt-4 flex flex-col gap-1 w-[300px]">
                    <p className="font-medium">Mail Address</p>
                    <input onChange={e => setEmail(e.target.value)} type="text" placeholder="yourmail@its.me" className="bg-[#F3F3F3] transition duration-200 outline-none border-2 border-transparent focus:border-blue-600 rounded-lg w-full p-3" />
                </div>
                <div className=" flex flex-col gap-1 w-[300px]">
                    <p className="font-medium">Password</p>
                    <input onChange={e => setPassword(e.target.value)} type="password" placeholder="Your Password" className="bg-[#F3F3F3] transition duration-200 outline-none border-2 border-transparent focus:border-blue-600 rounded-lg w-full p-3" />
                </div>
                <button onClick={() => handleLogin(email, password)} className="rounded-lg bg-[#3273FF] hover:bg-blue-700 transition duration-300 text-white py-3 cursor-pointer text-[1.10rem] mb-4"> Log in </button>
                {error && (
                    <>
                        <p className="text-red-500 text-center">{error}</p>
                    </>
                )}
                <a className="text-center" href="/forgot-password">Forgot Password? <span className="cursor-pointer text-blue-600 hover:underline">Click!</span></a>

            </div>
            <div>
                <a href="/register"> Don't you have an account? <span className="cursor-pointer text-blue-600 hover:underline">Sign Up</span> </a>
            </div>
        </div>
    );
}
