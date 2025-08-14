import { NextApiRequest, NextApiResponse } from "next";
import { Profile, ProfileComponent, userSchema } from "../../models/user";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST")
        return res.status(405).end(`Method ${req.method} Not Allowed`);

    const { email, password, componentId, profileId } = req.body;

    const user = await userSchema.findOne({ email })
    if (!user)
        return res.status(400).json({ error: "User not found." })

    if (password !== user.password)
        return res.status(400).json({ error: "Invalid password." });

    const profileIndex = user.profiles.findIndex(p => p._id.toString() === profileId);
    if (profileIndex === -1)
        return res.status(400).json({ error: "Profile not found." });

    const profile = user.profiles[profileIndex];

    profile.components = profile.components
        .filter((component: ProfileComponent) => {
            if (component.id === componentId) return false;

            if (Array.isArray(component.socialMedias)) {
                component.socialMedias = component.socialMedias.filter(
                    sm => sm.id !== componentId
                );

                if (component.socialMedias.length === 0) return false;
            }

            return true; 
        });

    user.markModified(`profiles.${profileIndex}.components`);
    await user.save();



    return res.status(200).json({ message: "Component deleted successfully.", components: profile.components });

}