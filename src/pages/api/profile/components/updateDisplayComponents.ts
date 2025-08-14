import { NextApiRequest, NextApiResponse } from "next";
import { userSchema } from "../../models/user";

export default async function updateDisplayComponents(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "PATCH")
        return res.status(405).end(`Method ${req.method} Not Allowed`);

    const { email, password, profileId, type, updateData } = req.body

    const user = await userSchema.findOne({ email });
    if (!user)
        return res.status(404).json({ error: "User not found" })

    if (password !== user.password)
        return res.status(400).json({ error: "Invalid password" })

    const profileIndex = user.profiles.findIndex(p => p._id.toString() === profileId);
    if (profileIndex === -1) return res.status(404).json({ error: "Profile not found" });

    const profile = user.profiles[profileIndex];

    switch (type) {
        case "displayName":
            profile.displayName = { ...profile.displayName, ...updateData };
            break;
        case "profilePhoto":
            profile.profilePhoto = { ...profile.profilePhoto, ...updateData };
            break;
        default:
            return res.status(400).json({ error: "Invalid type" });
    }

    user.markModified(`profiles.${profileIndex}`);
    await user.save();

    res.status(200).json({
        message: "Profile component updated",
        displayName: profile.displayName,
        profilePhoto: profile.profilePhoto
    });
}