import ColorPicker from "@/app/components/Elements/ColorPicker";
import { Profile, ProfileComponent } from "@/pages/api/models/user";
import { useEffect, useRef, useState } from "react";
import { FaBorderAll, FaFont, FaKeyboard, FaLine, FaLink } from "react-icons/fa6";
import { IoMdColorPalette } from "react-icons/io";
import { MdOutlineAddPhotoAlternate, MdOutlineFormatSize } from "react-icons/md";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";

type props = {
    componentType: string;
    editingProfile: Profile;
    component: ProfileComponent;
}

const sizes = ["75px", "100px", "125px", "150px"]
const borderStyles = ["Round", "Square", "Soft Edges"]

export default function ProfilePhotoComponent({ componentType, component, editingProfile }: props) {
    const [username, setUsername] = useState("");
    const [selectedSize, setSelectedSize] = useState(sizes[0]);
    const [borderStyle, setBorderStyle] = useState(borderStyles[0]);

    const [selectedImg, setSelectedImg] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    function handleSelectImageClick() {
        fileInputRef.current?.click();
    }

    async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (!allowedTypes.includes(file.type)) {
            alert("Only .jpg, .jpeg, .png formats are supported");
            return;
        }
        setUploading(true);
        const formData = new FormData();
        const ext = file.name.split('.').pop();
        const uniqueName = `${editingProfile._id || "profile"}-${uuidv4()}.${ext}`;
        formData.append("file", file, uniqueName);
        formData.append("fileName", uniqueName);

        try {
            const res = await fetch("/api/profile/components/uploadProfilePhoto", {
                method: "POST",
                body: formData
            });
            const data = await res.json();
            if (!res.ok) {
                alert(data.error || "Upload failed");
            } else {
                setSelectedImg(data.fileName);
                alert("Image uploaded successfully!");
            }
        } catch (err) {
            alert("An error occurred during upload.");
        } finally {
            setUploading(false);
        }
    }

    async function updateComponent() {
        const email = Cookies.get("user_email");
        const password = Cookies.get("user_password");
        if (!email || !password) return;

        try {
            const res = await fetch("/api/profile/components/updateDisplayComponents", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    password,
                    profileId: editingProfile._id,
                    type: "profilePhoto",
                    updateData: {
                        photo: selectedImg,
                        photoSize: selectedSize,
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
        setSelectedImg(component.photo)
        setSelectedSize(component.photoSize)
        setBorderStyle(component.borderStyle);
    }, []);
    return (
        <div className="flex flex-col gap-6 w-md max-w-md mx-auto">





            <div className="flex flex-col gap-2">
                <div className="flex gap-1 items-center text-2xl">
                    <MdOutlineAddPhotoAlternate />
                    <p> Profile Photo </p>
                </div>
                <div
                    className="flex justify-center items-center w-full h-20 border border-black/20 rounded-lg cursor-pointer"
                    onClick={handleSelectImageClick}
                >
                    <p className="px-4 font-semibold text-2xl text-gray-500 truncate">
                        {uploading ? "Uploading..." : selectedImg ? selectedImg : "Select Image File"}
                    </p>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </div>
                <p className="text-center text-black/50">Only .jpg, .jpeg, .png formats are supported</p>

            </div>

            <div className="flex flex-col gap-1">
                <span className="flex gap-2 items-center text-xl"> <FaBorderAll className="text-2xl" /> Photo Size </span>
                <select
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="transition duration-200 border border-black/20 hover:border-blue-600 focus:shadow-[0_0_0px_3px_rgba(66,108,245,0.25)] rounded p-2 outline-none"
                >
                    {sizes.map((style) => (
                        <option key={style} value={style}>
                            {style}
                        </option>
                    ))}
                </select>
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