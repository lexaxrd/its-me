import ColorPicker from "@/app/components/Elements/ColorPicker";
import { Profile, ProfileComponent } from "@/pages/api/models/user";
import { useEffect, useState } from "react";
import { FaBorderAll, FaFont, FaKeyboard, FaLine, FaLink } from "react-icons/fa6";
import { IoMdColorPalette } from "react-icons/io";
import { MdOutlineFormatSize } from "react-icons/md";
import Cookies from "js-cookie";
type props = {
    componentType: string;
    editingProfile: Profile;
    component: ProfileComponent;
}
const borderStyles = ["Square", "Soft Edges"];
const fonts = [
    { name: 'Lato', class: 'var(--font-lato)' },
    { name: 'Raleway', class: 'var(--font-raleway)' },
    { name: 'Fredoka', class: 'var(--font-fredoka)' },
    { name: 'Kanit', class: 'var(--font-kanit)' },
    { name: 'Ubuntu', class: 'var(--font-ubuntu)' },
    { name: 'Roboto Condensed', class: 'var(--font-roboto-condensed)' },
];


export default function TextComponent({ componentType, component, editingProfile }: props) {
    const [username, setUsername] = useState("");
    const [fontSize, setFontSize] = useState(15);
    const [backgroundColor, setBackgroundColor] = useState("#0f3057");
    const [innerColor, setInnerColor] = useState("#ffd60a");
    const [borderStyle, setBorderStyle] = useState(borderStyles[1]);

    const [selectedFont, setSelectedFont] = useState(fonts[0].class);

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
                    type: "normal",
                    componentId: component.id,
                    updateData: {
                        backgroundColor,
                        innerColor,
                        fontType: selectedFont,
                        text: username,
                        fontSize: fontSize,
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
        setUsername(component.text);
        setSelectedFont(component.fontType);
        setBorderStyle(component.borderStyle);
        setFontSize(component.fontSize);
        setBackgroundColor(component.backgroundColor);
        setInnerColor(component.innerColor)
    }, []);
    return (
        <div className="flex flex-col gap-6 w-md max-w-md mx-auto">



            {componentType == "link" ? (
                <div className="flex flex-col gap-2 w-full">
                    <span className="flex gap-2 items-center text-xl">
                        <FaLink className="text-2xl" /> Link
                    </span>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="http://example.com"
                        required
                        className="focus:shadow-[0_0_0px_3px_rgba(66,108,245,0.25)] w-full border border-black/30 rounded p-2 outline-none"
                    />
                </div>
            ) : componentType == "title" ? (
                <div className="flex flex-col gap-2 w-full">
                    <span className="flex gap-2 items-center text-xl">
                        <FaFont className="text-2xl" /> Title
                    </span>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter title"
                        required
                        className="focus:shadow-[0_0_0px_3px_rgba(66,108,245,0.25)] w-full border border-black/30 rounded p-2 outline-none"
                    />
                </div>
            ) : (
                <div className="flex flex-col gap-2 w-full">
                    <span className="flex gap-2 items-center text-xl">
                        <FaKeyboard className="text-2xl" /> Profile Name
                    </span>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Text"
                        required
                        className="focus:shadow-[0_0_0px_3px_rgba(66,108,245,0.25)] w-full border border-black/30 rounded p-2 outline-none"
                    />
                </div>
            )}


            <div>
                <span className="flex gap-2 items-center text-xl"> <IoMdColorPalette className="text-2xl" /> Background Color </span>
                <ColorPicker color={backgroundColor} onChange={setBackgroundColor} />
            </div>

            <div>
                <span className="flex gap-2 items-center text-xl"> <IoMdColorPalette className="text-2xl" /> Inner Color </span>
                <ColorPicker color={innerColor} onChange={setInnerColor} />
            </div>
            <div className="flex flex-col gap-2">
                <span className="flex gap-2 items-center text-xl"> <FaFont className="text-2xl" /> Font Type </span>
                <select
                    value={selectedFont}
                    onChange={(e) => setSelectedFont(e.target.value)}
                    className="focus:shadow-[0_0_0px_3px_rgba(66,108,245,0.25)] w-full border border-black/30 rounded p-2 outline-none"
                >
                    {fonts.map((font) => (
                        <option key={font.name} value={font.class} style={{ fontFamily: font.class }}>
                            {font.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex flex-col gap-2">
                <span className="flex gap-2 items-center text-xl"> <MdOutlineFormatSize className="text-2xl" /> Font Size </span>

                <input type="number" value={fontSize} onChange={(e) => setFontSize(+e.target.value)} min={5} max={50} name="" id="" className="focus:shadow-[0_0_0px_3px_rgba(66,108,245,0.25)] w-full border border-black/30 rounded p-2 outline-none" />
                <p className="text-black/40 text-[0.9rem]"> Min: 5, Max: 50 </p>
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