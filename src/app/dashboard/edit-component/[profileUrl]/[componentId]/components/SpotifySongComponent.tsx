"use client"
import ColorPicker from "@/app/components/Elements/ColorPicker";
import { useEffect, useState } from "react";
import { FaBorderAll, FaFont, FaKeyboard, FaLine, FaLink } from "react-icons/fa6";
import { IoMdColorPalette } from "react-icons/io";
import { MdOutlineFormatSize } from "react-icons/md";
import Cookies from "js-cookie"
import { Profile, ProfileComponent } from "@/pages/api/models/user";
type props = {
    componentType: string;
    editingProfile: Profile;
    component: ProfileComponent;
}


export default function SpotifySongComponent({ componentType, editingProfile, component }: props) {
    const [username, setUsername] = useState("");

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
                        link: username,
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
        setUsername(component.link);
    }, []);

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
                onClick={updateComponent}
                className="transition duration-200 bg-blue-600 text-white p-3 rounded-lg cursor-pointer hover:bg-blue-700"
            >
                Update
            </button>
        </div>
    );

}