
"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { IoIosArrowDown, IoMdExit } from "react-icons/io";
import { MdSpaceDashboard } from "react-icons/md";
import { IoExitOutline } from "react-icons/io5";

export default function UserButton() {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const [username, serUsername] = useState<string | null>(null);

    const dropdownButtons = [
        {
            text: "Dashboard",
            icon: <MdSpaceDashboard />,
            function: () => {
                window.location.href = "/dashboard"
            },
        },
        {
            text: "Log out",
            icon: <IoMdExit />,
            function: () => {
                Cookies.remove("username")
                Cookies.remove("user_email")
                Cookies.remove("user_id")
                window.location.href = "/"
            }
        }
    ]

    useEffect(() => {
        const email = Cookies.get("user_email") || null;
        const username = Cookies.get("username") || null;

        if (email && username) {
            setLoggedIn(true);
            serUsername(username);
        }
    }, []);

    if (username) {
        return (
            <div className="relative min-w-[150px] z-50">
                <button onClick={() => setOpenMenu(!openMenu)} className={`bg-[#f3f3f3] rounded-full text-black px-5 py-2 font-medium w-full cursor-pointer flex items-center justify-between gap-3 transition duration-200 border ${openMenu ? "border-black" : "border-transparent"}`}>
                    <div>
                        <img src="/itsmelogo.png" alt="" className="w-[25px]" />
                    </div>
                    <div className="flex gap-2 items-center">
                        <p>{username}</p>
                        <IoIosArrowDown className="" />
                    </div>
                </button>

                {openMenu && (
                    <div className="absolute top-full left-0 mt-2 bg-[#f3f3f3] w-max min-w-[150px] rounded-xl shadow-lg z-50">
                        <span
                            className="absolute -top-2 left-5 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-[#f3f3f3]"
                        />
                        <div className="p-2 flex flex-col gap-1">
                            {dropdownButtons.map((btn, index) => (
                                <button
                                    key={index}
                                    onClick={() => btn.function()}
                                    className="flex items-center gap-2 px-3 py-2 hover:bg-[#FFFFFF] rounded-lg transition-colors duration-150 text-lg cursor-pointer w-full text-left"
                                >
                                    {btn.icon}
                                    <span>{btn.text}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

        );
    }
    return (
        <a href="/login" className="bg-[#3273FF] text-white px-7 py-2 font-medium rounded-lg hover:bg-blue-700 transition-all duration-300 cursor-pointer">
            Log in
        </a>
    );
}