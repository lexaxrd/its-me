import { NextApiRequest, NextApiResponse } from "next";
import { userSchema } from "../models/user";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { email, password, profileId } = req.body;

        if (!email || !password || !profileId) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const user = await userSchema.findOne({ email })
        if (!user) {
            return res.status(400).json({ error: "User not found." })
        }

        if (password !== user.password) {
            return res.status(400).json({ error: "Invalid password." })
        }

        const initialLength = user.profiles.length;
        user.profiles = user.profiles.filter(
            (profile: any) => profile._id.toString() !== profileId
        );

        if (user.profiles.length === initialLength) {
            return res.status(404).json({ error: "Profile not found." });
        }

        await user.save();

        return res.status(200).json({ message: "Profile deleted successfully." });

    }
    else {
        res.setHeader("Allows", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}