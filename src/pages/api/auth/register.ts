
import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcrypt";
import { userSchema } from "../models/user";
import connectDB from "@/lib/mongodb";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ error: "All fields are required." });
        }

        try {
            await connectDB();

            const existingUser = await userSchema.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ error: "User already exists." });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new userSchema({
                username,
                email,
                password: hashedPassword,
            })

            await newUser.save();

            return res.status(200).json({ message: "User registered successfully" });
        } catch (error) {
            return res.status(500).json({ error: `Database connection failed: ${error}` });
        }
    }
    else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}