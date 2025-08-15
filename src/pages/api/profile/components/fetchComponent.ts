import { NextApiRequest, NextApiResponse } from "next";
import { ProfileComponent, userSchema } from "../../models/user";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST")
        return res.status(405).end(`Method ${req.method} Not Allowed`);

    const { email, password, profileUrl, componentId } = req.body;

    const user = await userSchema.findOne({ email })
    if (!user)
        return res.status(400).json({ error: "User not found." })

    if (password != user.password)
        return res.status(400).json({ error: "Invalid password." })

    const profileIndex = user.profiles.findIndex(
        (p: any) => p.profileUrl === profileUrl
    );
    if (profileIndex === -1) {
        return res.status(404).json({ error: "Profile not found." });
    }

    const profile = user.profiles[profileIndex];

    let finalComponent;

    const normalComponent = profile.components.find((c: ProfileComponent) => c.id === componentId);
    if (!normalComponent) {
        const socialWrapper = profile.components.find((c: ProfileComponent) => c.socialMedias);
        if (!socialWrapper) return res.status(404).json({ error: "Component not found" });

        const socialComponent = socialWrapper.socialMedias.find((s: ProfileComponent) => s.id === componentId);
        if (!socialComponent) return res.status(404).json({ error: "Component not found" });

        finalComponent = socialComponent
    }
    else {
        finalComponent = normalComponent
    }

    return res.status(200).json({ message: "Component fetched successfully.", component: finalComponent });
}