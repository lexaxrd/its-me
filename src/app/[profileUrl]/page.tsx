"use client"
import { Profile } from "@/pages/api/models/user";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBehance, FaDiscord, FaGithub, FaInstagram, FaLink, FaLinkedin, FaPinterest, FaReddit, FaSkype, FaSnapchat, FaSoundcloud, FaSpotify, FaSteam, FaTelegram, FaTiktok, FaTwitch, FaTwitter, FaYoutube } from "react-icons/fa6";
import { TbSeparator } from "react-icons/tb";
import { IoText } from "react-icons/io5";
import { MdOutlineTitle } from "react-icons/md";
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
const allComponents = ["heading", "text", "separator", "spotify-song", "link", "instagram", "twitter", "youtube", "twitch", "discord", "steam", "reddit", "tiktok", "github", "linkedin", "pinterest", "soundcloud", "snapchat", "skype", "telegram", "behance", "spotify", "spotify-artist"]
const textComponents = ["heading", "link", "text"]
const socialMediaComponents = ["instagram", "twitter", "youtube", "twitch", "discord", "steam", "reddit", "tiktok", "github", "linkedin", "pinterest", "soundcloud", "snapchat", "skype", "telegram", "behance", "spotify", "spotify-artist"]
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
function getIconByRedirect(name: string) {
    const comp = components.find(c => c.redirect === name);
    return comp ? comp.icon : null;
}

export default function ProfilePage() {
    const params = useParams();
    const profileUrl = params?.profileUrl as string | undefined;
    const [profile, setProfile] = useState<Profile | null>(null);

    async function increaseProfileViews(profileId: string) {
        const email = Cookies.get("user_email");
        const password = Cookies.get("user_password");

        if (!email || !password) {
            console.warn("Email veya password cookie’de bulunamadı, views artırma atlanıyor.");
            return;
        }

        try {
            const res = await fetch("/api/profile/updateProfile", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    password,
                    profileId,
                    increaseViews: true
                })
            });

            const data = await res.json();
            if (!res.ok) {
                console.error("Views artırma başarısız:", data.error);
            } else {
                console.log("Views artırıldı:", data);
            }
        } catch (err) {
            console.error("Views artırma sırasında hata:", err);
        }
    }
    async function increaseProfileLinkClicks(profileId: string) {
        const email = Cookies.get("user_email");
        const password = Cookies.get("user_password");

        if (!email || !password) {
            console.warn("Email veya password cookie’de bulunamadı, views artırma atlanıyor.");
            return;
        }

        try {
            const res = await fetch("/api/profile/updateProfile", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    password,
                    profileId,
                    increaseClicks: true
                })
            });

            const data = await res.json();
            if (!res.ok) {
                console.error("Clicks artırma başarısız:", data.error);
            } else {
                console.log("Clicks artırıldı:", data);
            }
        } catch (err) {
            console.error("Clicks artırma sırasında hata:", err);
        }
    }

    async function fetchProfile() {
        try {
            const res = await fetch("/api/profile/fetchProfile", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    profileUrl
                })
            })

            const data = await res.json();
            if (!res.ok) {
                window.location.href = "/"
                console.log({ status: "error", message: data.error || "Fetch failed" });
                return
            }
            else {
                if (data.status === "error") return;
                setProfile(data.profile);
                increaseProfileViews(data.profile._id);
            }
        }
        catch (e) {
            window.location.href = "/"
            console.log({ status: "error", message: "An error occurred during fetch: " + e });
            return
        }
    }

    useEffect(() => {
        fetchProfile();
    }, []);


    return (

        <div
            className="w-full px-4 h-screen pt-16 flex justify-center"
            style={{
                backgroundImage: profile?.backgroundImg
                    ? `url(/backgroundImages/${profile.backgroundImg})`
                    : profile?.selectedStockBackground
                        ? profile.selectedStockBackground
                        : undefined,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div className="flex flex-col w-[630px] text-center items-center">
                {profile?.profilePhoto.photo ? (
                    <img
                        src={`/profilePhotos/${profile.profilePhoto.photo}`}
                        alt=""
                        className={`${profile.profilePhoto.borderStyle == "Round" && "rounded-full"} ${profile.profilePhoto.borderStyle == "Soft Edges" && "rounded-lg"}`}
                        style={{
                            width: profile.profilePhoto.photoSize,
                            height: profile.profilePhoto.photoSize,
                            objectFit: "cover",
                        }}
                    />
                ) : (
                    <img src="/itsmelogo.png" alt="" style={{ width: "125px", height: "125px" }} />
                )}

                <p className={`p-3 mt-3 ${profile?.displayName.borderStyle === "Soft Edges" ? "rounded-lg" : "rounded-none"}`}
                    style={{
                        backgroundColor: profile?.displayName.backgroundColor,
                        color: profile?.displayName.innerColor,
                        fontFamily: profile?.displayName.fontType,
                        fontSize: profile?.displayName.fontSize,
                    }}>{profile?.displayName.text}</p>

                {profile?.components
                    .filter(comp => comp.enabled) // sadece aktif componentleri göster
                    .map(comp => {

                        switch (comp.type) {
                            case "text":
                                return (
                                    <div
                                        key={comp.id}
                                        className={`w-full p-3 mt-3 ${comp.borderStyle === "Soft Edges" ? "rounded-lg" : "rounded-none"}`}
                                        style={{
                                            backgroundColor: comp.backgroundColor,
                                            color: comp.innerColor,
                                            fontFamily: comp.fontType,
                                            fontSize: comp.fontSize,
                                        }}
                                    >
                                        {comp.text}
                                    </div>
                                );
                            case "heading":
                                return (
                                    <div
                                        key={comp.id}
                                        className={`w-full p-3 mt-3 ${comp.borderStyle === "Soft Edges" ? "rounded-lg" : "rounded-none"} font-semibold`}
                                        style={{
                                            backgroundColor: comp.backgroundColor,
                                            color: comp.innerColor,
                                            fontFamily: comp.fontType,
                                            fontSize: comp.fontSize,
                                        }}
                                    >
                                        {comp.text}
                                    </div>
                                );
                            case "link":
                                return (
                                    <a
                                        key={comp.id}
                                        href={comp.link || "#"}
                                        className={`p-3 mt-3 ${comp.borderStyle === "Soft Edges" ? "rounded-lg" : "rounded-none"}`}
                                        style={{
                                            backgroundColor: comp.backgroundColor,
                                            color: comp.innerColor,
                                            fontFamily: comp.fontType,
                                            fontSize: comp.fontSize,
                                        }}
                                    >
                                        {comp.text}
                                    </a>
                                );
                            case "separator":
                                return (
                                    <div key={comp.id} className="flex gap-12 p-3 w-full h-[1px]" style={{
                                        marginTop: comp.space,
                                        marginBottom: comp.space
                                    }}>
                                        <div className="bg-white w-full h-[1px]"></div>
                                        <div className="bg-white w-full h-[1px]"></div>
                                    </div>
                                );
                            case "spotify-song":
                                if (!comp.link) return null;

                                const embedLink = comp.link
                                    .replace("https://open.spotify.com/track/", "https://open.spotify.com/embed/track/")
                                    .split("?")[0];

                                return (
                                    <div
                                        key={comp.id}
                                        className={`p-3 mt-3 w-full ${comp.borderStyle === "Soft Edges" ? "rounded-lg" : "rounded-none"}`}
                                    >
                                        <iframe
                                            src={embedLink}
                                            width="300"
                                            height="80"
                                            frameBorder="0"
                                            allow="encrypted-media"
                                            className="w-full"
                                            style={{ borderRadius: comp.borderStyle === "Soft Edges" ? "8px" : "0px" }}
                                        />
                                    </div>
                                );
                            default:
                                return null
                        }

                    })}

                {profile?.components.some(comp => comp.socialMedias?.length) && (
                    <div className="flex flex-wrap gap-2">
                        {profile.components
                            .filter(comp => comp.socialMedias?.length)
                            .flatMap(comp => comp.socialMedias?.map(sm => (
                                <a
                                    onClick={() => increaseProfileLinkClicks(profile._id)}
                                    key={sm.id}
                                    href={sm.username ? baseUrls[sm.type] + sm.username : "#"}
                                    className={`flex items-center gap-2 p-3 mt-3 ${sm.borderStyle === "Soft Edges" ? "rounded-lg" : "rounded-none"}`}
                                    style={{
                                        backgroundColor: sm.backgroundColor,
                                        color: sm.innerColor,
                                    }}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span className="text-5xl">{getIconByRedirect(sm.type)}</span>
                                </a>
                            )))}
                    </div>
                )}



            </div>
        </div>



    );

}