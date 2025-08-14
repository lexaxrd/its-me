import ColorPicker from "@/app/components/Elements/ColorPicker";
import { useState } from "react";
import { FaBorderAll } from "react-icons/fa6";
import { IoMdColorPalette } from "react-icons/io";
import { PiX } from "react-icons/pi";

type props = {
    componentType: string;
    onAdd: (data: {
        backgroundColor: string;
        space: string;
        componentType: string;
    }) => void
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

const spaces = ["5px", "10px", "15px", "20px", "25px"]

export default function SeparatorComponent({ onAdd, componentType }: props) {
    const [backgroundColor, setBackgroundColor] = useState("#0f3057");
    const [selectedSpace, setSelectedSpace] = useState("5px");

    function handleSubmit() {
        onAdd({ backgroundColor, space: selectedSpace, componentType });
    }

    return (
        <div className="flex flex-col gap-6 w-md max-w-md mx-auto">



            <div>
                <span className="flex gap-2 items-center text-xl"> <IoMdColorPalette className="text-2xl" /> Background Color </span>
                <ColorPicker color={backgroundColor} onChange={setBackgroundColor} />
            </div>

            <div className="flex flex-col gap-1">
                <span className="flex gap-2 items-center text-xl"> <FaBorderAll className="text-2xl" /> Border/Top Gap </span>
                <select
                    value={selectedSpace}
                    onChange={(e) => setSelectedSpace(e.target.value)}
                    className="transition duration-200 border border-black/20 hover:border-blue-600 focus:shadow-[0_0_0px_3px_rgba(66,108,245,0.25)] rounded p-2 outline-none"
                >
                    {spaces.map((style) => (
                        <option key={style} value={style}>
                            {style}
                        </option>
                    ))}
                </select>
            </div>

            <button
                onClick={handleSubmit}
                className="transition duration-200 bg-blue-600 text-white p-3 rounded-lg cursor-pointer hover:bg-blue-700"
            >
                Add
            </button>
        </div>
    );

}