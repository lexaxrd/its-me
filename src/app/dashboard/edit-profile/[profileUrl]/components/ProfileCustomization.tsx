"use client";
import Checkbox from "@/app/components/Elements/Checkbox";
import { Profile, ProfileComponent } from "@/pages/api/models/user";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaAddressCard, FaBehance, FaChevronDown, FaChevronUp, FaDiscord, FaGithub, FaInstagram, FaLink, FaLinkedin, FaPinterest, FaReddit, FaSkype, FaSnapchat, FaSoundcloud, FaSpotify, FaSteam, FaTelegram, FaTiktok, FaTwitch, FaTwitter, FaYoutube } from "react-icons/fa6";
import { IoText } from "react-icons/io5";
import { MdDelete, MdEdit, MdOutlineTitle } from "react-icons/md";
import { TbSeparator } from "react-icons/tb";
import Cookies from "js-cookie"
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
function getIconByRedirect(name: string) {
    const comp = components.find(c => c.redirect === name);
    return comp ? comp.icon : null;
}
function capitalizeAndReplaceDash(str: string) {
    return str
        .split('-')
        .map(word =>
            word.charAt(0).toUpperCase() +
            word.slice(1).toLowerCase()
        )
        .join(' ');
}
type params = {
    editingProfile: Profile
}

export default function ProfileCustomization({ editingProfile }: params) {
    const [displayName, setDisplayName] = useState({})
    const [profilePhoto, setProfilePhoto] = useState({})
    const [components, setComponents] = useState<ProfileComponent>()

    useEffect(() => {
        setDisplayName(editingProfile.displayName);
        setProfilePhoto(editingProfile.profilePhoto);
        setComponents(editingProfile.components);
    }, []);

    async function deleteComponent(componentId: string) {
        const email = Cookies.get("user_email");
        const password = Cookies.get("user_password");
        if (!email || !password) return;

        try {
            const res = await fetch("/api/profile/components/deleteComponent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, componentId, profileId: editingProfile._id })
            })

            const data = await res.json();
            if (!res.ok) {
                return { status: "error", message: data.error || "Creation failed" };
            }
            else {
                if (data.status === "error") return;
                alert(data.message);
                setComponents(data.components);
            }
        }
        catch (e) {
            return { status: "error", message: "An error occurred during fetch: " + e };
        }
    }
    async function reorderComponent(componentId: string, direction: string /*up | down*/, type: string /*normal | social*/) {
        const email = Cookies.get("user_email");
        const password = Cookies.get("user_password");
        if (!email || !password) return;

        try {
            const res = await fetch("/api/profile/components/reorderComponent", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    password,
                    profileId: editingProfile._id,
                    type,
                    componentId,
                    direction
                })
            })

            const data = await res.json();
            if (!res.ok) {
                return { status: "error", message: data.error || "Creation failed" };
            }
            else {
                if (data.status === "error") return;
                setComponents(data.components);
            }
        }
        catch (e) {
            return { status: "error", message: "An error occurred during fetch: " + e };
        }
    }
    async function updateComponentsEnabled(componentId: string, enabled: boolean, type: string /*normal | social*/) {
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
                    type,
                    componentId,
                    updateData: {
                        enabled
                    }
                })
            })

            const data = await res.json();
            if (!res.ok) {
                return { status: "error", message: data.error || "Creation failed" };
            }
            else {
                if (data.status === "error") return;
                setComponents(data.components);
            }
        }
        catch (e) {
            return { status: "error", message: "An error occurred during fetch: " + e };
        }
    }
    async function updateDisplayComponentsEnabled(enabled: boolean, type: string /*normal | social*/) {
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
                    type,
                    updateData: {
                        enabled
                    }
                })
            })

            const data = await res.json();
            if (!res.ok) {
                return { status: "error", message: data.error || "Creation failed" };
            }
            else {
                if (data.status === "error") return;
                
            }
        }
        catch (e) {
            return { status: "error", message: "An error occurred during fetch: " + e };
        }
    }
    return (
        <div className="w-full flex mt-10">
            {/*PREVIEW*/}
            <div>

            </div>

            <div className="w-full flex flex-col gap-6">
                <div className="w-full flex justify-between items-center">
                    <h1 className="font-semibold text-2xl">Page Components</h1>
                    <a href={`/dashboard/add-component/${editingProfile.profileUrl}`} className="bg-blue-500 rounded-lg text-white px-6 py-3 cursor-pointer hover:bg-blue-700 transition duration-200"> Add a Component </a>
                </div>
                <div className="flex flex-col gap-4">
                    <div className=" shadow-[0_0_10px_0_rgba(0,0,0,0.1)] rounded-lg p-5 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div className="bg-gray-700 rounded-full p-3 text-white w-max text-4xl">
                                <FaUserCircle />
                            </div>

                            <h2 className="font-semibold text-2xl text-gray-700">Profile Photo</h2>

                        </div>
                        <div className="flex gap-4 items-center">
                            {/*<Checkbox value={editingProfile.profilePhoto.enabled} onChanged={(data) => updateDisplayComponentsEnabled(data.checked, "profilePhoto")} />*/}
                            <a href={`/dashboard/edit-component/${editingProfile.profileUrl}/profile-photo`} className="text-[#4E4E4E] hover:text-blue-600 cursor-pointer transition duration-500 text-3xl">
                                <MdEdit />
                            </a>


                        </div>
                    </div>
                    <div className="shadow-[0_0_10px_0_rgba(0,0,0,0.1)] rounded-lg p-5 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div className="bg-gray-700 rounded-full p-3 text-white w-max text-4xl">
                                <FaAddressCard />
                            </div>

                            <h2 className="font-semibold text-2xl text-gray-700">Profile Name</h2>

                        </div>
                        <div className="flex gap-4 items-center">
                            {/*                            <Checkbox value={editingProfile.displayName.enabled} onChanged={(data) => updateDisplayComponentsEnabled(data.checked, "displayName")} />
 */}
                            <a href={`/dashboard/edit-component/${editingProfile.profileUrl}/display-name`} className="text-[#4E4E4E] hover:text-blue-600 cursor-pointer transition duration-500 text-3xl">
                                <MdEdit />
                            </a>


                        </div>
                    </div>
                    {components?.map((comp: ProfileComponent, index: number) => (
                        <div key={index} className="flex flex-col gap-4">
                            {comp.socialMedias ? (
                                <>
                                    <div className="w-full h-[1px] bg-black/10" />
                                    {comp.socialMedias?.map((social, i) => (
                                        <div key={i} className="shadow-[0_0_10px_0_rgba(0,0,0,0.1)] rounded-lg p-5 flex justify-between items-center">
                                            <div className="flex gap-4">
                                                <div className="flex flex-col justify-between ">
                                                    <a onClick={() => reorderComponent(social.id, "up", "social")} className="text-[#4E4E4E] hover:text-blue-600 cursor-pointer transition duration-500 text-3xl">
                                                        <FaChevronUp />
                                                    </a>
                                                    <a onClick={() => reorderComponent(social.id, "down", "social")} className="text-[#4E4E4E] hover:text-blue-600 cursor-pointer transition duration-500 text-3xl">
                                                        <FaChevronDown />
                                                    </a>

                                                </div>
                                                <div className="flex gap-2 items-center">
                                                    <div className="bg-gray-700 rounded-full p-3 text-white w-max text-4xl">
                                                        <span>{getIconByRedirect(social.type)}</span>
                                                    </div>
                                                    <h2 className="font-semibold text-2xl text-gray-700">{capitalizeAndReplaceDash(social.type)}</h2>
                                                </div>
                                            </div>
                                            <div className="flex gap-4 items-center">
                                                <Checkbox value={social.enabled} onChanged={(data) => updateComponentsEnabled(social.id, data.checked, "social")} />
                                                <a href={`/dashboard/edit-component/${editingProfile.profileUrl}/${social.id}`} className="text-[#4E4E4E] hover:text-blue-600 cursor-pointer transition duration-500 text-3xl">
                                                    <MdEdit />
                                                </a>
                                                <a onClick={() => deleteComponent(social.id)} className="text-[#4E4E4E] hover:text-blue-600 cursor-pointer transition duration-500 text-3xl">
                                                    <MdDelete />
                                                </a>
                                            </div>

                                        </div>
                                    ))
                                    }
                                    <div className="w-full h-[1px] bg-black/10" />

                                </>
                            ) : (
                                <div className="shadow-[0_0_10px_0_rgba(0,0,0,0.1)] rounded-lg p-5 flex justify-between items-center">
                                    <div className="flex gap-4">
                                        <div className="flex flex-col justify-between ">
                                            <a onClick={() => reorderComponent(comp.id, "up", "normal")} className="text-[#4E4E4E] hover:text-blue-600 cursor-pointer transition duration-500 text-3xl">
                                                <FaChevronUp />
                                            </a>
                                            <a onClick={() => reorderComponent(comp.id, "down", "normal")} className="text-[#4E4E4E] hover:text-blue-600 cursor-pointer transition duration-500 text-3xl">
                                                <FaChevronDown />
                                            </a>

                                        </div>
                                        <div className="flex gap-2 items-center">
                                            <div className="bg-gray-700 rounded-full p-3 text-white w-max text-4xl">
                                                <span>{getIconByRedirect(comp.type)}</span>
                                            </div>
                                            <h2 className="font-semibold text-2xl text-gray-700">{capitalizeAndReplaceDash(comp.type)}</h2>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 items-center">
                                        <Checkbox value={comp.enabled} onChanged={(data) => updateComponentsEnabled(comp.id, data.checked, "normal")} />
                                        <a href={`/dashboard/edit-component/${editingProfile.profileUrl}/${comp.id}`} className="text-[#4E4E4E] hover:text-blue-600 cursor-pointer transition duration-500 text-3xl">
                                            <MdEdit />
                                        </a>
                                        <a onClick={() => deleteComponent(comp.id)} className="text-[#4E4E4E] hover:text-blue-600 cursor-pointer transition duration-500 text-3xl">
                                            <MdDelete />
                                        </a>
                                    </div>

                                </div>
                            )}
                        </div>
                    ))}



                </div>

            </div>
        </div>
    );
}