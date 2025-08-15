"use client"
import { useEffect, useState } from "react"
import Cookies from "js-cookie";
import Navbar from "../home/components/Navbar";
import { FcStatistics } from "react-icons/fc";
import { ImStatsDots } from "react-icons/im";
import { FiUsers } from "react-icons/fi";
import { FaEnvelope, FaLink } from "react-icons/fa6";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { TbInfoTriangleFilled } from "react-icons/tb";
import Footer from "../home/components/Footer";
import { IoClose, IoText } from "react-icons/io5";
import { MdDelete, MdEdit } from "react-icons/md";
import { Profile, User } from "@/pages/api/models/user";
import { HiCursorClick } from "react-icons/hi";


export default function Dashboard() {
    const [openMenu, setOpenMenu] = useState<boolean>(false)
    const [user, setUser] = useState<User>();
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [origin, setOrigin] = useState<string>("");
    const [newProfileName, setNewProfileName] = useState<string | null>(null);
    const [newProfileUrl, setNewProfileUrl] = useState<string | null>(null);
    const [creationPageError, setCreationPageError] = useState<string | null>(null);
    const [totalViews, setTotalViews] = useState<number>(0);
    const [totalProfiles, setTotalProfiles] = useState<number>(0);
    const [totalLinkClicks, setTotalLinkClicks] = useState<number>(0);
    const [totalReferences, setTotalReferences] = useState<number>(0);

    async function handleCreateNewProfile() {
        setCreationPageError(null);
        try {
            const response = await fetch("/api/profile/createProfile", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: user?.email,
                    password: user?.password,
                    name: newProfileName,
                    url: newProfileUrl
                })
            })
            const data = await response.json()
            if (!response.ok) {
                setCreationPageError(data.error || "Creation failed");
            }
            else {
                alert("Creation successful!");
                setOpenMenu(false);

                if (data.newProfile) {
                    setProfiles(prev => [...prev, data.newProfile])
                }
            }
        }
        catch (e) {
            setCreationPageError("An error occurred during creation: " + e);
        }
    }

    async function handleDeleteProfile(profileId: string) {
        try {
            const response = await fetch("/api/profile/deleteProfile", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: user?.email,
                    password: user?.password,
                    profileId: profileId
                })
            })
            const data = await response.json()
            if (!response.ok) {
                alert(data.error || "Deletion failed");
            }
            else {
                setProfiles(prev => prev.filter(profile => profile._id !== profileId));
                alert("Deletion successful!");
            }
        }
        catch (e) {
            alert("En error occurred while deleting: " + e)
        }
    }

    async function handleFetchProfiles() {
        const email = Cookies.get("user_email");
        const password = Cookies.get("user_password");
        if (!email || !password) return;

        try {
            const res = await fetch("/api/profile/fetchProfiles", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            })

            const data = await res.json();
            if (!res.ok) {
                return { status: "error", message: data.error || "Creation failed" };
            }
            else {
                if (data.status === "error") return;
                setProfiles(data.profiles);
            }
        }
        catch (e) {
            return { status: "error", message: "An error occurred during fetch: " + e };
        }

    }

    async function handleCalculateStatistics() {
        setTotalProfiles(profiles.length)

        const totalViews = profiles.reduce((sum, profile) => sum + (profile.views || 0), 0);

        setTotalViews(totalViews);

        const totalLinkClicks = profiles.reduce((sum, profile) => sum + (profile.linkClicks || 0), 0);

        setTotalLinkClicks(totalLinkClicks);
    }

    useEffect(() => {
        handleCalculateStatistics();
    }, [profiles])

    useEffect(() => {
        setOrigin(window.location.origin);

        const cookies = Cookies.get("username")
        if (!cookies) {
            alert(JSON.stringify(cookies))
            window.location.href = "/";
            return
        }

        const newUser: User = {
            username: Cookies.get("username") ?? "",
            _id: Cookies.get("user_id") ?? "",
            email: Cookies.get("user_email") ?? "",
            password: Cookies.get("user_password") ?? "",
        }

        setUser(newUser)

        handleFetchProfiles();
    }, []);

    return (
        <div className="min-h-screen flex flex-col gap-28">
            {/* --- Modal --- */}
            <div className={`fixed left-0 top-0 z-10 w-full min-h-full backdrop-blur-xs bg-black/50 transition duration-300 ${openMenu ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}>
                <div className="bg-white w-full max-w-md mx-auto rounded-2xl p-6 md:p-8 border border-[rgba(0,0,0,0.3)] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                        <h1 className="font-bold text-xl">Create a new profile</h1>
                        <IoClose onClick={() => setOpenMenu(false)} className="text-2xl cursor-pointer transition duration-500 hover:rotate-[360deg] hover:text-gray-500" />
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <p>Profile Name</p>
                            <input onChange={(e) => setNewProfileName(e.target.value)} type="text" className="p-2 rounded-lg bg-[#F9F9F9] outline-none border border-[rgba(0,0,0,0.14)] focus:border-blue-500" />
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <p>Url Name</p>
                            <div className="flex w-full">
                                <div className="text-center p-2 min-h-max bg-[#F9F9F9] border border-[rgba(0,0,0,0.14)] text-black/60">
                                    {origin}/
                                </div>
                                <input onChange={(e) => setNewProfileUrl(e.target.value)} type="text" className="rounded-l-none border-l-0 w-full p-2 rounded-lg bg-[#F9F9F9] outline-none border border-[rgba(0,0,0,0.14)] focus:border-blue-500" />
                            </div>
                        </div>
                    </div>
                    <button onClick={handleCreateNewProfile} className="cursor-pointer transition duration-300 bg-blue-600 text-white rounded-lg p-2 hover:bg-blue-700">Create</button>
                    {creationPageError && (
                        <p className="text-red-500 text-center"> {creationPageError} </p>
                    )}
                </div>
            </div>

            <Navbar />

            {/* --- Statistics Section --- */}
            <div className="container mx-auto px-4 py-8 flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                    <h1 className="text-4xl md:text-5xl font-black text-[#424242]">Welcome to the Dashboard, {user?.username || ""}! 👋</h1>
                    <p className="text-lg md:text-2xl">The dashboard allows you to create new profiles and view your statistics.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                    <div className="border border-[rgba(0,0,0,0.14)] bg-gradient-to-r from-[#F9F9F9] to-[#FFFFFF] flex items-center gap-4 rounded-lg p-6">
                        <ImStatsDots className="text-5xl md:text-6xl" />
                        <div>
                            <p className="text-lg md:text-2xl">Total Views</p>
                            <p className="font-bold text-3xl md:text-5xl">{totalViews}</p>
                        </div>
                    </div>
                    <div className="border border-[rgba(0,0,0,0.14)] bg-gradient-to-r from-[#F9F9F9] to-[#FFFFFF] flex items-center gap-4 rounded-lg p-6">
                        <FiUsers className="text-5xl md:text-6xl" />
                        <div>
                            <p className="text-lg md:text-2xl">Total Profiles</p>
                            <p className="font-bold text-3xl md:text-5xl">{totalProfiles}</p>
                        </div>
                    </div>
                    <div className="border border-[rgba(0,0,0,0.14)] bg-gradient-to-r from-[#F9F9F9] to-[#FFFFFF] flex items-center gap-4 rounded-lg p-6">
                        <HiCursorClick className="text-5xl md:text-6xl" />
                        <div>
                            <p className="text-lg md:text-2xl">Total Link Clicks</p>
                            <p className="font-bold text-3xl md:text-5xl">{totalLinkClicks}</p>
                        </div>
                    </div>
                </div>

                {/* --- Profiles Section --- */}
                <div className="flex flex-col gap-3 mt-10">
                    <div className="flex flex-row  gap-4 items-center">
                        <p className="text-xl font-semibold">My Profiles</p>
                        <div className="flex-1 h-[3px] bg-gradient-to-r from-black to-transparent"></div>
                        <button onClick={() => setOpenMenu(!openMenu)} className="bg-blue-600 rounded-lg text-white p-2 px-6 cursor-pointer hover:bg-blue-700 transition duration-300">New Profile</button>
                    </div>

                    {profiles.length === 0 ? (
                        <p className="font-medium text-lg md:text-xl mt-3">Profile not found. You can easily create your profile by clicking New Profile button.</p>
                    ) : (
                        <div className="flex flex-col gap-3 mt-3">
                            {profiles.map((profile) => (
                                <div key={profile._id} className="p-4 py-6 border border-[rgba(0,0,0,0.14)] bg-gradient-to-r from-[#F9F9F9] to-[#FFFFFF] rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                    <div className="flex items-center gap-4">
                                        <img src="/itsmelogo.png" alt="" className="w-12 h-12 md:w-14 md:h-14" />
                                        <div>
                                            <div className="flex flex-col md:flex-row md:items-end gap-1">
                                                <h2 className="text-lg md:text-xl"><span className="font-bold">{profile.profileName}</span> Profile</h2>
                                                <p className="text-sm md:text-base">({profile.views} {profile.views > 1 ? "views" : "view"})</p>
                                            </div>
                                            <p className="text-sm md:text-base">Creation date: {new Date(profile.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-3xl md:text-4xl mt-3 md:mt-0">
                                        <a href={`/dashboard/edit-profile/${profile.profileUrl}`} className="text-[#4E4E4E] hover:text-blue-600 cursor-pointer transition duration-500">
                                            <MdEdit />
                                        </a>
                                        <a href={`/${profile.profileUrl}`} className="text-[#4E4E4E] hover:text-blue-600 cursor-pointer transition duration-500">
                                            <FaLink />
                                        </a>
                                        <a onClick={() => handleDeleteProfile(profile._id)} className="text-[#4E4E4E] hover:text-blue-600 cursor-pointer transition ">
                                            <MdDelete />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    )
}