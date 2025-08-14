//TODO: COMPONENT EKLEME SİSTEMİ YAPILDI SIRADA LİSTELETME / SIRASINI DEĞİŞTİRME GİBİ FONKSİYONLARI VE PREVİEW MODUNU YAPMAK VAR ARDINDAN EDİT KISMINA GEÇERİZ.

import { NextApiRequest, NextApiResponse } from "next";
import { userSchema } from "../../models/user";

const allComponents = ["heading", "text", "separator", "spotify-song", "link", "instagram", "twitter", "youtube", "twitch", "discord", "steam", "reddit", "tiktok", "github", "linkedin", "pinterest", "soundcloud", "snapchat", "skype", "telegram", "behance", "spotify", "spotify-artist"]
const textComponents = ["heading", "link", "text"]
const socialMediaComponents = ["instagram", "twitter", "youtube", "twitch", "discord", "steam", "reddit", "tiktok", "github", "linkedin", "pinterest", "soundcloud", "snapchat", "skype", "telegram", "behance", "spotify", "spotify-artist"]

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method != "POST")
        return res.status(405).end(`Method ${req.method} Not Allowed`);

    const {
        profileUrl,
        email,
        password,
        componentName,
        backgroundColor,
        innerColor,
        borderStyle,
        username,
        text,
        fontType,
        fontSize,
        space
    } = req.body;

    const user = await userSchema.findOne({ email });
    if (!user) {
        return res.status(400).json({ error: "User not found." });
    }

    if (password !== user.password) {
        return res.status(400).json({ error: "Invalid password." });
    }

    const profileIndex = user.profiles.findIndex(
        (p: any) => p.profileUrl === profileUrl
    );
    if (profileIndex === -1) {
        return res.status(404).json({ error: "Profile not found." });
    }

    const profile = user.profiles[profileIndex];

    if (!Array.isArray(profile.components)) {
        profile.components = [];
    }

    let newComponent: any;
    if (socialMediaComponents.includes(componentName)) {
        // socialMedias array’ini bul veya oluştur
        let socialMediasGroup = profile.components.find((c: any) => Array.isArray(c.socialMedias));
        if (!socialMediasGroup) {
            socialMediasGroup = { socialMedias: [] };
            profile.components.push(socialMediasGroup);
        }

        newComponent = {
            id: new Date().getTime().toString(),
            type: componentName,
            backgroundColor,
            innerColor,
            borderStyle,
            createdAt: new Date().toISOString(),
            username: username || ""
        };

        socialMediasGroup.socialMedias.push(newComponent);
    }
    else {
        // normal component ekleme
        newComponent = {
            enabled: true,
            id: new Date().getTime().toString(),
            type: componentName,
            backgroundColor,
            innerColor,
            borderStyle,
            createdAt: new Date().toISOString()
        };

        if (componentName === "separator") {
            newComponent.space = space || "5px";
        } else if (componentName === "spotify-song") {
            newComponent.link = username || "";
        } else if (textComponents.includes(componentName)) {
            newComponent.text = text || "";
            newComponent.fontType = fontType || "Arial";
            newComponent.fontSize = fontSize || 16;
        }

        profile.components.push(newComponent);
    }



    user.profiles[profileIndex] = profile;

    await user.save();

    return res.status(200).json({
        success: true,
        message: "Component added successfully.",
        component: newComponent
    });
}
