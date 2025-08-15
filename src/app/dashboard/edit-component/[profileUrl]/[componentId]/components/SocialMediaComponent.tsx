"use client"
import ColorPicker from "@/app/components/Elements/ColorPicker";
import { Profile, ProfileComponent } from "@/pages/api/models/user";
import { useEffect, useState } from "react";
import { FaBorderAll } from "react-icons/fa6";
import { IoMdColorPalette } from "react-icons/io";
import Cookies from "js-cookie"
type props = {
    componentType: string;
    editingProfile: Profile;
    component: ProfileComponent;
}
const borderStyles = ["Square", "Soft Edges"];
const baseUrls: Record<string, string> = {
    instagram: "https://instagram.com/",
    twitter: "https://twitter.com/",
    linkedin: "https://linkedin.com/in/",
    youtube: "https://youtube.com/",
    tiktok: "https://tiktok.com/@",
    pinterest: "https://pinterest.com/",
    snapchat: "https://snapchat.com/",
    reddit: "https://reddit.com/user/",
    github: "https://github.com/",
    soundcloud: "https://soundcloud.com/",
    behance: "https://behance.net/",
    discord: "https://discord.com/users/",
    medium: "https://medium.com/@",
    twitch: "https://twitch.tv/",
    tumblr: "https://tumblr.com/blog/",
    skype: "https://skype.com/",
    whatsapp: "https://wa.me/",
    spotify: "https://open.spotify.com/user/",
    telegram: "https://telegram.com/",
    steam: "https://steamcommunity.com/id/",
    "spotify-artist": "https://open.spotify.com/artist/",
};


export default function SocialMediaComponent({ componentType, editingProfile, component }: props) {
    const [username, setUsername] = useState("");
    const [backgroundColor, setBackgroundColor] = useState("#0f3057");
    const [innerColor, setInnerColor] = useState("#ffd60a");
    const [borderStyle, setBorderStyle] = useState(borderStyles[1]);

    async function updateComponent() {
        const email = Cookies.get("user_email");
        const password = Cookies.get("user_password");
        if (!email || !password) return;

        try {
            const res = await fetch("/api/profile/components/updateComponent", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    password,
                    profileId: editingProfile._id,
                    type: "social",
                    componentId: component.id,
                    updateData: {
                        backgroundColor,
                        innerColor,
                        text: username,
                        borderStyle: borderStyle
                    }
                })
            })

            const data = await res.json();
            if (!res.ok) {
                return { status: "error", message: data.error || "Creation failed" };
            }
            else {
                if (data.status === "error") return;
                alert("Component updated successfully!")
                window.location.href = "/dashboard/edit-profile/" + editingProfile.profileUrl
            }
        }
        catch (e) {
            return { status: "error", message: "An error occurred during fetch: " + e };
        }
    }


    useEffect(() => {
        setUsername(component.username);
        setBorderStyle(component.borderStyle);
        setBackgroundColor(component.backgroundColor);
        setInnerColor(component.innerColor)
    }, []);
    return (
        <div className="flex flex-col gap-6 w-md max-w-md mx-auto">

            <div className="flex w-full">
                <div className="flex justify-center items-center border border-black/30 rounded-l-lg p-2 text-black/60 bg-gray-100">
                    {baseUrls[componentType] || "http://example.com/"}
                </div>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Your username"
                    required
                    className="focus:shadow-[0_0_0px_3px_rgba(66,108,245,0.25)] w-full border-l-0 border border-black/30 rounded p-2 outline-none"
                />
            </div>

            <div>
                <span className="flex gap-2 items-center text-xl"> <IoMdColorPalette className="text-2xl" /> Background Color </span>
                <ColorPicker color={backgroundColor} onChange={setBackgroundColor} />
            </div>

            <div>
                <span className="flex gap-2 items-center text-xl"> <IoMdColorPalette className="text-2xl" /> Inner Color </span>
                <ColorPicker color={innerColor} onChange={setInnerColor} />
            </div>

            <div className="flex flex-col gap-1">
                <span className="flex gap-2 items-center text-xl"> <FaBorderAll className="text-2xl" /> Border Styles </span>
                <select
                    value={borderStyle}
                    onChange={(e) => setBorderStyle(e.target.value)}
                    className="transition duration-200 border border-black/20 hover:border-blue-600 focus:shadow-[0_0_0px_3px_rgba(66,108,245,0.25)] rounded p-2 outline-none"
                >
                    {borderStyles.map((style) => (
                        <option key={style} value={style}>
                            {style}
                        </option>
                    ))}
                </select>
            </div>

            <button
                onClick={updateComponent}
                className="transition duration-200 bg-blue-600 text-white p-3 rounded-lg cursor-pointer hover:bg-blue-700"
            >
                Update
            </button>
        </div>
    );

}