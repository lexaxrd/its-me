"use client"
import Footer from "@/app/home/components/Footer";
import Navbar from "@/app/home/components/Navbar";
import { Profile, User } from "@/pages/api/models/user";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie"
import { FaBehance, FaDiscord, FaGithub, FaInstagram, FaLink, FaLinkedin, FaPinterest, FaReddit, FaSkype, FaSnapchat, FaSoundcloud, FaSpotify, FaSteam, FaTelegram, FaTiktok, FaTwitch, FaTwitter, FaYoutube } from "react-icons/fa6";
import { MdOutlineTitle } from "react-icons/md";
import { IoText } from "react-icons/io5";
import { TbSeparator } from "react-icons/tb";
import ColorPicker from "../../../components/Elements/ColorPicker";

const components = [
    {
        title: "Link",
        description: "A component to add a link to your profile",
        icon: <FaLink />,
        redirect: "link"
    },
    {
        title: "Title",
        description: "A component to add a title to your profile",
        icon: <MdOutlineTitle />,
        redirect: "heading"
    },
    {
        title: "Text",
        description: "A component to add a text to your profile",
        icon: <IoText />,
        redirect: "text"
    },
    {
        title: "Separator",
        description: "A component to separate your contents",
        icon: <TbSeparator />,
        redirect: "separator"
    },
    {
        title: "Instagram",
        description: "A component to link your Instagram to your profile",
        icon: <FaInstagram />,
        redirect: "instagram"
    },
    {
        title: "X (Twitter)",
        description: "A component to link your X (Twitter) to your profile",
        icon: <FaTwitter />,
        redirect: "twitter"
    },
    {
        title: "YouTube",
        description: "A component to link your YouTube to your profile",
        icon: <FaYoutube />,
        redirect: "youtube"
    },
    {
        title: "Twitch",
        description: "A component to link your Twitch to your profile",
        icon: <FaTwitch />,
        redirect: "twitch"
    },
    {
        title: "Discord",
        description: "A component to link your Discord to your profile",
        icon: <FaDiscord />,
        redirect: "discord"
    },
    {
        title: "Steam",
        description: "A component to link your Steam to your profile",
        icon: <FaSteam />,
        redirect: "steam"
    },
    {
        title: "Reddit",
        description: "A component to link your Reddit to your profile",
        icon: <FaReddit />,
        redirect: "reddit"
    },
    {
        title: "Tiktok",
        description: "A component to link your Tiktok to your profile",
        icon: <FaTiktok />,
        redirect: "tiktok"
    },
    {
        title: "Github",
        description: "A component to link your Github to your profile",
        icon: <FaGithub />,
        redirect: "github"
    },
    {
        title: "Linkedin",
        description: "A component to link your Linkedin to your profile",
        icon: <FaLinkedin />,
        redirect: "linkedin"
    },
    {
        title: "Pinterest",
        description: "A component to link your Pinterest to your profile",
        icon: <FaPinterest />,
        redirect: "pinterest"
    },
    {
        title: "Soundcloud",
        description: "A component to link your Soundcloud to your profile",
        icon: <FaSoundcloud />,
        redirect: "soundcloud"
    },
    {
        title: "Snapchat",
        description: "A component to link your Snapchat to your profile",
        icon: <FaSnapchat />,
        redirect: "snapchat"
    },
    {
        title: "Skype",
        description: "A component to link your Skype to your profile",
        icon: <FaSkype />,
        redirect: "skype"
    },
    {
        title: "Telegram",
        description: "A component to link your Telegram to your profile",
        icon: <FaTelegram />,
        redirect: "telegram"
    },
    {
        title: "Behance",
        description: "A component to link your Behance to your profile",
        icon: <FaBehance />,
        redirect: "behance"
    },
    {
        title: "Spotify Song",
        description: "A component to add a Spotify Embed to your profile",
        icon: <FaSpotify />,
        redirect: "spotify-song"
    },
    {
        title: "Spotify",
        description: "A component to link your Spotify Account to your profile",
        icon: <FaSpotify />,
        redirect: "spotify"
    },
    {
        title: "Spotify Artist",
        description: "A component to link your Spotify Artist Account to your profile",
        icon: <FaSpotify />,
        redirect: "spotify-artist"
    },
]

export default function AddComponent() {
    const params = useParams();
    const [user, setUser] = useState<User | null>(null);
    const profileUrl = params?.profileUrl as string | undefined;
    const [editingProfile, setEditingProfile] = useState<Profile | null>(null);
    const [profiles, setProfiles] = useState<Profile[]>([]);

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
        <>
            <Navbar />
            <div className="container flex flex-col gap-20 my-24">
                <div className="flex flex-col items-center gap-7">
                    <img src="/itsmelogo.png" alt="" width={100} />
                    <div className="flex items-center gap-2">
                        <a href="/dashboard" className="text-xl"> Dashboard {'>'} My Profiles {'>'} </a>
                        <a href="" className="text-xl flex items-center justify-center gap-2"><span className="font-semibold text-xl">{editingProfile?.profileName}</span> Profile</a>
                    </div>
                </div>
                <div className="flex flex-col gap-20">
                    <h1 className="text-2xl font-semibold text-center"> All Components </h1>

                    <div className="grid grid-cols-6 gap-6">
                        {components.map((component, index) => (
                            <a href={`/dashboard/component/${component.redirect}/${editingProfile?.profileUrl}`} key={index} className="transition duration-300 hover:scale-105 cursor-pointer flex flex-col gap-2 items-center p-4 rounded-3xl shadow-[0_0_15px_0px_rgba(0,0,0,0.13)]">
                                <div className="bg-gray-800 rounded-full p-3 w-max">
                                    <span className="text-3xl text-white">{component.icon}</span>
                                </div>
                                <p className="text-center text-2xl font-bold">{component.title}</p>
                                <p className="text-center font-medium text-[0.8rem]"> {component.description} </p>
                            </a>
                        ))}


                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}