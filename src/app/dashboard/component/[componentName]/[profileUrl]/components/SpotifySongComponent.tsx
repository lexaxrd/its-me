import ColorPicker from "@/app/components/Elements/ColorPicker";
import { useState } from "react";
import { FaBorderAll, FaFont, FaKeyboard, FaLine, FaLink } from "react-icons/fa6";
import { IoMdColorPalette } from "react-icons/io";
import { MdOutlineFormatSize } from "react-icons/md";

type props = {
    componentType: string;
    onAdd: (data: {
        username: string;
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
const fonts = [
    { name: 'Lato', class: 'var(--font-lato)' },
    { name: 'Raleway', class: 'var(--font-raleway)' },
    { name: 'Fredoka', class: 'var(--font-fredoka)' },
    { name: 'Kanit', class: 'var(--font-kanit)' },
    { name: 'Ubuntu', class: 'var(--font-ubuntu)' },
    { name: 'Roboto Condensed', class: 'var(--font-roboto-condensed)' },
];


export default function SpotifySongComponent({ onAdd, componentType }: props) {
    const [username, setUsername] = useState("");

    function handleSubmit() {
        onAdd({
            username: username,
            componentType: componentType
        });

    }

    return (
        <div className="flex flex-col gap-6 w-md max-w-md mx-auto">

            <div className="flex flex-col gap-2 w-full">
                <span className="flex gap-2 items-center text-xl"> <FaLink className="text-2xl" /> Link </span>

                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="https://open.spotify.com/intl-tr/track/2H7jZg2HliuQhZjfBblLrZ?si=eff0d77561164b76"
                    required
                    className="focus:shadow-[0_0_0px_3px_rgba(66,108,245,0.25)] w-full border border-black/30 rounded p-2 outline-none"
                />
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