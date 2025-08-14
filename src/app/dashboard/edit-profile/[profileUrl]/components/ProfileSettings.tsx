"use client"
import { Profile, User } from "@/pages/api/models/user";
import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { AiOutlinePicture } from "react-icons/ai";
import { FaCheck, FaLink } from "react-icons/fa6";
import { MdOutlineAddPhotoAlternate, MdOutlineInsertPhoto } from "react-icons/md";

type params = {
    user: User,
    editingProfile: Profile
}

export default function ProfileSettings({ user, editingProfile }: params) {
    const [selectedBg, setSelectedBg] = useState<string | null>(null);
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
        const uniqueName = `${user.username || "user"}-${uuidv4()}.${ext}`;
        formData.append("file", file, uniqueName);
        formData.append("fileName", uniqueName);

        try {
            const res = await fetch("/api/profile/uploadBackground", {
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
    const backgrounds = [
        "linear-gradient(90deg, #8a2387 0%, #e94057 52.21%, #f27121 100%)",
        "linear-gradient(90deg, #11998e 0%, #38ef7d 100%)",
        "linear-gradient(90deg, #4e54c8 0%, #8f94fb 100%)",
        "linear-gradient(90deg, #f12711 0%, #f5af19 100%)",
        "linear-gradient(90deg, #4568dc 0%, #b06ab3 100%)",
        "linear-gradient(90deg, #8e2de2 0%, #4a00e0 100%)",
        "linear-gradient(90deg, #a770ef 0%, #cf8bf3 53.12%, #fdb99b 100%)",
        "linear-gradient(90deg, #141e30 0%, #243b55 100%)",
    ];

    useEffect(() => {
        if (selectedBg != "") {
            setSelectedImg("");
        }
    }, [selectedBg])

    useEffect(() => {
        if (selectedImg != "" && selectedImg != null) {
            setSelectedBg("")
        }
    }, [selectedImg])

    async function handleUpdateProfile() {
        const res = await fetch("/api/profile/updateProfile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: user.email,
                password: user.password,
                profileId: editingProfile._id,
                stockBackground: selectedBg,
                backgroundImg: selectedImg
            })
        })

        const data = await res.json();
        if (!res.ok) {
            alert(data.error || "Update failed")
        }
        else {
            alert("Profile Settings changed successfully!");
        }
    }

    useEffect(() => {
        setSelectedBg(editingProfile.selectedStockBackground || "");
        setSelectedImg(editingProfile.backgroundImg)
    }, [])
    return (
        <>
            <div className="bg-[#FFFFFF] shadow-[0_0_30px_0px_rgba(0,0,0,0.15)] border border-[rgba(0,0,0,0.14)] p-8 w-[550px] rounded-lg flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <div className="flex gap-1 items-center text-2xl">
                        <FaLink />
                        <p> Profile Link </p>
                    </div>
                    <div className="flex">
                        <div className="text-black/50 bg-gray-200 border border-[rgba(0,0,0,0.14)] p-2 rounded-lg rounded-r-none">
                            <p> {origin}/ </p>
                        </div>
                        <div className="text-black/50 bg-gray-200 border border-[rgba(0,0,0,0.14)] border-l-0 p-2 rounded-lg rounded-l-none w-full">
                            <p> {editingProfile?.profileUrl} </p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex gap-1 items-center text-2xl">
                        <MdOutlineInsertPhoto />
                        <p> Stock Backgrounds </p>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        {backgrounds.map((bg, i) => (
                            <div
                                key={i}
                                onClick={() => setSelectedBg(bg)}
                                className={`flex justify-center items-center w-full h-20 rounded-lg cursor-pointer  
                                ${selectedBg === bg ? " scale-105" : "border-transparent"}`}
                                style={{ background: bg }}
                            >
                                {selectedBg === bg && (
                                    <FaCheck className="bg-white rounded-full p-1 text-2xl text-blue-500" />

                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex gap-1 items-center text-2xl">
                        <MdOutlineAddPhotoAlternate />
                        <p> Background Photo </p>
                    </div>
                    <p>{selectedImg}</p>
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
                <button onClick={() => handleUpdateProfile()} className="bg-blue-500 hover:bg-blue-700 cursor-pointer transition duration-200 text-white rounded-lg p-4"> Update </button>
            </div>

        </>
    );
}