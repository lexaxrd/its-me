import connectDB from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { userSchema } from "../models/user";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { profileUrl } = req.body;

        if (!profileUrl) {
            return res.status(400).json({ error: "profileUrl is required." });
        }

        try {
            await connectDB();

            const user = await userSchema.findOne({ "profiles.profileUrl": profileUrl });
            if (!user) {
                return res.status(404).json({ error: "Profile not found." });
            }

            const profile = user.profiles.find(p => p.profileUrl === profileUrl);

            if (!profile) {
                return res.status(404).json({ error: "Profile not found." });
            }

            return res.status(200).json({
                message: "Fetched profile successfully.",
                profile
            });

        } catch (e) {
            return res.status(500).json({ error: `Database connection failed: ${e}` });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
