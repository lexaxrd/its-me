import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { User } from "../models/User";
import connectDB from "@/lib/mongodb";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "All fields are required." });
        }

        try {
            await connectDB();

            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ error: "User not found." });
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(400).json({ error: "Invalid password." });
            }

            return res.status(200).json({
                error: "User logged in successfully", user: {
                    id: user._id,
                    username: user.username,
                    email: user.email
                }
            });
        }
        catch (e) {
            return res.status(500).json({ error: `Database connection failed: ${e}` })
        }
    }
    else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}