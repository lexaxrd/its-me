import { NextApiRequest, NextApiResponse } from "next";
import { ProfileComponent, userSchema } from "../../models/user";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "PATCH") 
        return res.status(405).end(`Method ${req.method} Not Allowed`);

    try {
        const { email, password, profileId, componentId, direction, type } = req.body; 
        // isSocial: boolean, component’in social mi normal mi olduğunu belirtir

        const user = await userSchema.findOne({ email });
        if (!user) return res.status(404).json({ error: "User not found" });

        if (password !== user.password) return res.status(400).json({ error: "Invalid password" });

        const profileIndex = user.profiles.findIndex(p => p._id.toString() === profileId);
        if (profileIndex === -1) return res.status(404).json({ error: "Profile not found" });

        const profile = user.profiles[profileIndex];

        if (type == "social") {
            // Social media componentleri kendi içinde taşı
            const socialWrapper = profile.components.find((c: ProfileComponent) => c.socialMedias);
            if (!socialWrapper) return res.status(404).json({ error: "Social medias not found" });

            const idx = socialWrapper.socialMedias.findIndex((s: ProfileComponent) => s.id === componentId);
            if (idx === -1) return res.status(404).json({ error: "Social media not found" });

            const swapIdx = direction === "up" ? idx - 1 : idx + 1;
            if (swapIdx >= 0 && swapIdx < socialWrapper.socialMedias.length) {
                [socialWrapper.socialMedias[idx], socialWrapper.socialMedias[swapIdx]] =
                    [socialWrapper.socialMedias[swapIdx], socialWrapper.socialMedias[idx]];
            }

        } else {
            // Normal componentleri profile.components dizisi içinde taşı
            const idx = profile.components.findIndex((c: ProfileComponent) => c.id === componentId);
            if (idx === -1) return res.status(404).json({ error: "Component not found" });

            const swapIdx = direction === "up" ? idx - 1 : idx + 1;
            if (swapIdx >= 0 && swapIdx < profile.components.length) {
                [profile.components[idx], profile.components[swapIdx]] =
                    [profile.components[swapIdx], profile.components[idx]];
            }
        }

        user.markModified(`profiles.${profileIndex}.components`);
        await user.save();

        return res.status(200).json({ message: "Component reordered", components: profile.components });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error" });
    }
}
