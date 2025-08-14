import connectDB from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { userSchema } from "../models/user";
import bcrypt from "bcrypt";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { email, password } = req.body;

        try {
            await connectDB();

            const user = await userSchema.findOne({ email });
            if (!user) {
                return res.status(400).json({ error: "User not found." });
            }
           
            if (password !== user.password) {
                return res.status(400).json({ error: "Invalid password." });
            }

            return res.status(200).json({
                message: "Fetched user's profiles successfully.",
                profiles: user.profiles
            })
        }
        catch (e) {
            return res.status(500).json({ error: `Database connection failed: ${e}` })
        }
    }
    else {
        res.setHeader("Allows", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}