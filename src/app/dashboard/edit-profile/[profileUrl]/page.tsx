"use client";
import Navbar from "@/app/home/components/Navbar";
import { Profile, User } from "@/pages/api/models/user";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { FaLink } from "react-icons/fa6";
import { AiOutlinePicture } from "react-icons/ai";
import ProfileSettings from "./components/ProfileSettings";
import ProfileCustomization from "./components/ProfileCustomization";
import Footer from "@/app/home/components/Footer";
export default function EditProfile() {
    const params = useParams();
    const [user, setUser] = useState<User | null>(null);
    const profileUrl = params?.profileUrl as string | undefined;
    const [editingProfile, setEditingProfile] = useState<Profile | null>(null);
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [editPage, setEditPage] = useState("settings")
    const [origin, setOrigin] = useState<string>("");

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

    useEffect(() => {
        if (!profileUrl || profiles.length === 0) return;
        const profile = profiles.find(p => p.profileUrl === profileUrl) || null;
        setEditingProfile(profile);
    }, [profileUrl, profiles]);

 useEffect(() => {
  if (!profileUrl || profiles.length === 0 || !user) {
    setEditingProfile(null);
    return;
  }

  const profile = profiles.find(p => p.profileUrl === profileUrl) || null;

  if (profile && profile.profileUrl === profileUrl) {
    setEditingProfile(profile);
  } else {
    window.location.href = "/dashboard"
  }
}, [profileUrl, profiles, user]);


    useEffect(() => {
        setOrigin(window.location.origin);

        handleFetchProfiles();

        const newUser: User = {
            username: Cookies.get("username") ?? "",
            _id: Cookies.get("user_id") ?? "",
            email: Cookies.get("user_email") ?? "",
            password: Cookies.get("user_password") ?? "",
        }

        setUser(newUser)
    }, []);

    return (
        <div className="flex flex-col gap-28">
            <Navbar />
            <div className="container flex flex-col gap-20 justify-center items-center">
                <div className="flex flex-col items-center gap-7">
                    <img src="/itsmelogo.png" alt="" width={100} />
                    <div className="flex items-center gap-2">
                        <a href="/dashboard" className="text-xl"> Dashboard {'>'} My Profiles {'>'} </a>
                        <a href="" className="text-xl flex items-center justify-center gap-2"><span className="font-semibold text-xl">{editingProfile?.profileName}</span> Profile</a>
                    </div>
                </div>
                <div className="flex flex-col gap-4 w-full">
                    <div className="flex items-center justify-center gap-22 w-full">
                        <button onClick={() => setEditPage("settings")} className={`cursor-pointer transition duration-300 text-2xl ${editPage == "settings" && "font-bold "}`}> Settings </button>
                        <button onClick={() => setEditPage("customization")} className={`cursor-pointer transition duration-300 text-2xl ${editPage == "customization" && " font-bold"}`}> Customization </button>
                    </div>

                    {editingProfile && user && (
                        <>
                            {editPage === "settings" ? (
                                <div className="w-full flex justify-center items-center">
                                    <ProfileSettings user={user} editingProfile={editingProfile} />

                                </div>
                            ) : (
                                <ProfileCustomization editingProfile={editingProfile} />
                            )}
                        </>
                    )}

                </div>
            </div>
            <Footer />
        </div>
    )
}