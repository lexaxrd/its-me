import connectDB from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { userSchema } from "../models/user";
import { Profile } from "../models/profile";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { email, password, name, url } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "All fields are required." });
        }

        try {
            await connectDB();

            const profile = new Profile({ name, url });
            await profile.save();

            const user = await userSchema.findOne({ email });
            if (!user) {
                return res.status(400).json({ error: "User not found." })
            }
            user.profiles.push(profile._id);
            await user.save() 

            return res.status(200).json({ 
                message: "Profile added successfully!",
                profile: { name, url }
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