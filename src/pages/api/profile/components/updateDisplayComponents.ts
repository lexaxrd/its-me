import { NextApiRequest, NextApiResponse } from "next";
import { userSchema } from "../../models/user";
import fs from "fs";
import path from "path";

export default async function updateDisplayComponents(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST")
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
            const oldPhoto = profile.profilePhoto.photo; 
            profile.profilePhoto = { ...profile.profilePhoto, ...updateData }; 

            if (updateData.photo !== undefined && updateData.photo !== null && oldPhoto !== updateData.photo) {
                const backgroundDir = path.join(process.cwd(), 'public', 'profilePhotos');
                const files = fs.readdirSync(backgroundDir);
                const oldFileName = path.basename(oldPhoto);

                for (const file of files) {
                    if (file.startsWith(profileId) && file === oldFileName) {
                        try {
                            fs.unlinkSync(path.join(backgroundDir, file));
                            console.log("Eski dosya silindi:", file);
                        } catch (error) {
                            console.error("Dosya silinirken hata:", error);
                        }
                    }
                }
            }
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