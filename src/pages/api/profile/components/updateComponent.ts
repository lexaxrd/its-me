// pages/api/components/update.ts
import { NextApiRequest, NextApiResponse } from "next";
import { ProfileComponent, userSchema } from "../../models/user";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "PATCH") return res.status(405).end(`Method ${req.method} Not Allowed`);

    try {
        const { email, password, profileId, type, componentId, updateData } = req.body;

        const user = await userSchema.findOne({ email });
        if (!user) return res.status(404).json({ error: "User not found" });

        if (password !== user.password) return res.status(400).json({ error: "Invalid password" })

        const profileIndex = user.profiles.findIndex(p => p._id.toString() === profileId);
        if (profileIndex === -1) return res.status(404).json({ error: "Profile not found" });

        const profile = user.profiles[profileIndex];

        if (type === "normal") {
            const normalComponent = profile.components.find((c: ProfileComponent) => c.id === componentId);
            if (!normalComponent) return res.status(404).json({ error: "Component not found" });
            Object.assign(normalComponent, updateData);
        } else if (type === "social") {
            const socialWrapper = profile.components.find((c: ProfileComponent) => c.socialMedias);
            if (!socialWrapper) return res.status(404).json({ error: "Social medias not found" });
            const socialComponent = socialWrapper.socialMedias.find((s: ProfileComponent) => s.id === componentId);
            if (!socialComponent) return res.status(404).json({ error: "Social media not found" });
            Object.assign(socialComponent, updateData);
        }

        user.markModified(`profiles.${profileIndex}.components`);
        await user.save();

        res.status(200).json({ message: "Component updated", components: profile.components });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}
