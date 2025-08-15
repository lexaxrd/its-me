"use client"
import { Profile, ProfileComponent, User } from "@/pages/api/models/user";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie"
import Navbar from "@/app/home/components/Navbar";
import Footer from "@/app/home/components/Footer";
import { FaBehance, FaDiscord, FaGithub, FaInstagram, FaLink, FaLinkedin, FaPinterest, FaReddit, FaSkype, FaSnapchat, FaSoundcloud, FaSpotify, FaSteam, FaTelegram, FaTiktok, FaTwitch, FaTwitter, FaYoutube } from "react-icons/fa6";
import { TbSeparator } from "react-icons/tb";
import { IoText } from "react-icons/io5";
import { MdOutlineTitle } from "react-icons/md";
import ColorPicker from "@/app/components/Elements/ColorPicker";
import SocialMediaComponent from "./components/SocialMediaComponent";
import TextComponent from "./components/TextComponent";
import SeparatorComponent from "./components/SeparatorComponent";
import SpotifySongComponent from "./components/SpotifySongComponent";
import ProfileNameComponent from "./components/ProfileNameComponent";
import ProfilePhotoComponent from "./components/ProfilePhotoComponent";

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

const allComponents = ["heading", "text", "separator", "spotify-song", "link", "instagram", "twitter", "youtube", "twitch", "discord", "steam", "reddit", "tiktok", "github", "linkedin", "pinterest", "soundcloud", "snapchat", "skype", "telegram", "behance", "spotify", "spotify-artist"]
const textComponents = ["heading", "link", "text"]
const socialMediaComponents = ["instagram", "twitter", "youtube", "twitch", "discord", "steam", "reddit", "tiktok", "github", "linkedin", "pinterest", "soundcloud", "snapchat", "skype", "telegram", "behance", "spotify", "spotify-artist"]

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
function findComponentAndType(profiles: Profile[], profileId: string, componentId: string) {
    const profile = profiles.find(p => p._id.toString() === profileId);
    if (!profile) return null;

    const directComponent = profile.components.find(c => c.id === componentId);
    if (directComponent) {
        return {
            component: directComponent,
            type: directComponent.type
        };
    }

    for (const comp of profile.components) {
        if (Array.isArray(comp.socialMedias)) {
            const socialMediaComp = comp.socialMedias.find(sm => sm.id === componentId);
            if (socialMediaComp) {
                return {
                    component: socialMediaComp,
                    type: socialMediaComp.type ?? comp.type
                };
            }
        }
    }

    return null; // bulunamadı
}

export default function Component() {
    const params = useParams();
    const [user, setUser] = useState<User | null>(null);
    const [component, setComponent] = useState<ProfileComponent | null>(null);
    const [displayComponents, setDisplayComponents] = useState<any>(null);
    const componentId = params?.componentId as string | undefined;
    const profileUrl = params?.profileUrl as string | undefined;
    const [editingProfile, setEditingProfile] = useState<Profile | null>(null);
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [componentName, setComponentName] = useState("");

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

                return { status: "error", message: data.error || "Fetch failed" };
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
    async function handleFetchComponent() {


        const email = Cookies.get("user_email");
        const password = Cookies.get("user_password");
        if (!email || !password) return;

        try {
            const res = await fetch("/api/profile/components/fetchComponent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, profileUrl, componentId })
            })

            const data = await res.json();
            if (!res.ok) {
                return { status: "error", message: data.error || "Fetch failed" };
            }
            else {
                if (data.status === "error") return;
                setComponent(data.component);
            }
        }
        catch (e) {
            return { status: "error", message: "An error occurred during fetch: " + e };
        }

    }
    async function handleFetchDisplayComponents() {


        const email = Cookies.get("user_email");
        const password = Cookies.get("user_password");
        if (!email || !password) return;

        try {
            const res = await fetch("/api/profile/components/fetchDisplayComponents", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, profileId: editingProfile?._id })
            })

            const data = await res.json();
            if (!res.ok) {
                return { status: "error", message: data.error || "Fetch failed" };
            }
            else {
                if (data.status === "error") return;
                setDisplayComponents({ displayName: data.displayName, profilePhoto: data.profilePhoto });
            }
        }
        catch (e) {
            return { status: "error", message: "An error occurred during fetch: " + e };
        }

    }

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

    useEffect(() => {
        if (componentId == "display-name" || componentId == "profile-photo" && editingProfile) {
            handleFetchDisplayComponents();
        }
        else if (editingProfile) {
            handleFetchComponent();

        }
    }, [editingProfile]);

    useEffect(() => {
        if (!profiles.length || !profileUrl || !componentId) return;

        const profile = profiles.find(p => p.profileUrl === profileUrl);
        if (!profile) return;

        setEditingProfile(profile);

        if (componentId == "display-name") {
            setComponentName("display-name")
            return
        } else if (componentId == "profile-photo") {
            setComponentName("profile-photo");
            return
        }

        const result = findComponentAndType(profiles, profile._id.toString(), componentId);


        if (result) {
            setComponentName(result.type);
        } else {
            console.warn("Component not found");
        }
    }, [profiles, profileUrl, componentId]);

    useEffect(() => {
        if (componentId == "display-name" && editingProfile) {
            setComponent({
                text: displayComponents.displayName.text,
                backgroundColor: displayComponents.displayName.backgroundColor,
                innerColor: displayComponents.displayName.innerColor,
                fontType: displayComponents.displayName.fontType,
                fontSize: displayComponents.displayName.fontSize,
                borderStyle: displayComponents.displayName.borderStyle,
                enabled: displayComponents.displayName.enabled,

            })
        }
        else if (componentId == "profile-photo" && editingProfile) {
            setComponent({
                photo: displayComponents.profilePhoto.photo,
                photoSize: displayComponents.profilePhoto.photoSize,
                borderStyle: displayComponents.profilePhoto.borderStyle,
                enabled: displayComponents.profilePhoto.enabled,

            })
        }
    }, [displayComponents])

    return (
        <div>
            <Navbar />
            <div className="container flex flex-col gap-20 my-24">
                <div className="flex flex-col max-sm:text-[0.9rem] text-xl items-center gap-7">
                    <img src="/itsmelogo.png" alt="" width={100} />
                    <div className="flex items-center gap-2">
                        <a href="/dashboard" className=""> Dashboard {'>'} My Profiles {'>'} </a>
                        <a href={`/dashboard/edit-profile/${editingProfile?.profileUrl}`} className=" flex items-center justify-center gap-2"><span className="font-semibold">{editingProfile?.profileName}</span> Profile</a>
                    </div>
                </div>
                <div className="flex flex-col gap-10 px-4">
                    <div className="flex items-center justify-center gap-2">
                        <span className="text-4xl"> {getIconByRedirect(componentName!!)} </span>

                        <h1 className="text-2xl text-center"> Editing a element called <span className="font-bold">{capitalizeAndReplaceDash(componentName!!)}</span> </h1>
                    </div>
                    <div className="flex items-center justify-center">
                        {component && editingProfile && (
                            <>
                                {componentName == "display-name" && (
                                    <ProfileNameComponent componentType={componentName!!} editingProfile={editingProfile} component={component} />
                                )}
                                {componentName == "profile-photo" && (
                                    <ProfilePhotoComponent componentType={componentName!!} editingProfile={editingProfile} component={component} />
                                )}
                                {componentName == "separator" && (
                                    <SeparatorComponent componentType={componentName!!} editingProfile={editingProfile} component={component} />
                                )}
                                {componentName == "spotify-song" && (
                                    <SpotifySongComponent componentType={componentName!!} editingProfile={editingProfile} component={component} />
                                )}
                                {textComponents.includes(componentName) && (
                                    <TextComponent componentType={componentName!!} editingProfile={editingProfile} component={component} />
                                )}

                                {socialMediaComponents.some(socialComp => componentName?.trim() === socialComp) && (
                                    <SocialMediaComponent componentType={componentName!!} editingProfile={editingProfile} component={component} />
                                )}
                            </>
                        )}

                    </div>


                </div>
            </div>

            <Footer />

        </div>
    );
}