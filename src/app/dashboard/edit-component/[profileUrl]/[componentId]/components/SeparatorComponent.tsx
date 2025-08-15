"use client";
import ColorPicker from "@/app/components/Elements/ColorPicker";
import { Profile, ProfileComponent } from "@/pages/api/models/user";
import { useEffect, useState } from "react";
import { FaBorderAll } from "react-icons/fa6";
import { IoMdColorPalette } from "react-icons/io";
import { PiX } from "react-icons/pi";
import Cookies from "js-cookie"
type props = {
    componentType: string;
    editingProfile: Profile;
    component: ProfileComponent;
}

const spaces = ["5px", "10px", "15px", "20px", "25px"]

export default function SeparatorComponent({ componentType, editingProfile, component }: props) {
    const [backgroundColor, setBackgroundColor] = useState("#0f3057");
    const [selectedSpace, setSelectedSpace] = useState("5px");

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
                        space: selectedSpace
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
        setBackgroundColor(component.backgroundColor);
        setSelectedSpace(component.space);
    }, []);

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
                onClick={updateComponent}
                className="transition duration-200 bg-blue-600 text-white p-3 rounded-lg cursor-pointer hover:bg-blue-700"
            >
                Update
            </button>
        </div>
    );

}