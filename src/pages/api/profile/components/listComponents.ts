import { NextApiRequest, NextApiResponse } from "next";
import { userSchema } from "../../models/user";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST")
        return res.status(405).end(`Method ${req.method} Not Allowed`);

    const { email, password, profileUrl } = req.body;

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

    return res.status(200).json({ message: "Profile components fetched", components:  })

}