"use client"
import { useEffect, useState } from "react"
import Cookies from "js-cookie";
import Navbar from "../home/components/Navbar";
import { FcStatistics } from "react-icons/fc";
import { ImStatsDots } from "react-icons/im";
import { FiUsers } from "react-icons/fi";
import { FaEnvelope } from "react-icons/fa6";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { TbInfoTriangleFilled } from "react-icons/tb";
type DashboardUser = {
    username: string,
    user_id: string,
    user_email: string
}

export default function Dashboard() {
    const [user, setUser] = useState<DashboardUser | null>(null);

    useEffect(() => {
        const cookies = Cookies.get("username")
        if (!cookies) {
            alert(JSON.stringify(cookies))
            window.location.href = "/";
            return
        }

        const newUser: DashboardUser = {
            username: Cookies.get("username") ?? "",
            user_id: Cookies.get("user_id") ?? "",
            user_email: Cookies.get("user_email") ?? ""
        }

        setUser(newUser)

    }, []);

    return (
        <div className="flex flex-col gap-28">
            <Navbar />
            <div className="container flex flex-col gap-14">
                <div className="flex flex-col gap-1">
                    <h1 className="text-5xl font-black text-[#424242]">Welcome to the dashboard, {user?.username || ""}! 👋</h1>
                    <p className="text-2xl">The dashboard allows you to create new profiles and view your statistics.</p>
                </div>
                <div className="flex flex-col gap-6">
                    <div className="grid grid-cols-3 gap-5">
                        <div className="border border-[rgba(0,0,0,0.14)] bg-gradient-to-r from-[#F9F9F9] to-[#FFFFFF] flex items-center gap-4 rounded-lg p-6 py-9">

                            <ImStatsDots className="text-5xl" />
                            <div>
                                <p className="text-2xl">Total Views</p>
                                <p className="font-bold text-4xl">0</p>
                            </div>
                        </div>
                        <div className="border border-[rgba(0,0,0,0.14)] bg-gradient-to-r from-[#F9F9F9] to-[#FFFFFF] flex items-center gap-4 rounded-lg p-6 py-9">

                            <FiUsers className="text-5xl" />
                            <div>
                                <p className="text-2xl">Total Profiles</p>
                                <p className="font-bold text-4xl">0</p>
                            </div>
                        </div>
                        <div className="border border-[rgba(0,0,0,0.14)] bg-gradient-to-r from-[#F9F9F9] to-[#FFFFFF] flex items-center gap-4 rounded-lg p-6 py-9">

                            <FaEnvelope className="text-5xl" />
                            <div>
                                <p className="text-2xl">Total References</p>
                                <p className="font-bold text-4xl">0</p>
                            </div>
                        </div>
                    </div>
                    <div className="relative p-6 border border-[rgba(0,0,0,0.14)] bg-gradient-to-r from-[#F9F9F9] to-[#FFFFFF] flex items-center justify-center gap-2">
                        <TbInfoTriangleFilled className="text-4xl" />
                        <p className="text-center text-xl">You can invite your friends to the platform with your referral link and earn rewards. Click to copy: link</p>
                    </div>
                </div>
                <div>
                    <div className="flex gap-7 items-center">
                        <p className="text-xl min-w-max"> My Profiles </p>
                        <div className="w-full h-[3px] bg-gradient-to-r from-[#000000] to-transparent"></div>
                        <button className="min-w-max bg-blue-600 rounded-lg text-white p-2 px-6 cursor-pointer hover:bg-blue-700 transition duration-300"> New Profile </button>
                    </div>
                </div>

            </div>
        </div>
    )
}