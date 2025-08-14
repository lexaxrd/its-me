import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { userSchema } from "../models/user";
import connectDB from "@/lib/mongodb";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "All fields are required." });
        }

        try {
            await connectDB();

            const user = await userSchema.findOne({ email });
            if (!user) {
                return res.status(400).json({ error: "User not found." });
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(400).json({ error: "Invalid password." });
            }

            return res.status(200).json({
                message: "User logged in successfully", user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    password: user.password
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