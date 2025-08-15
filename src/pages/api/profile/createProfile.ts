import connectDB from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { userSchema } from "../models/user";
import Cookies from "js-cookie";
import ObjectId from 'bson-objectid';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { email, password, name, url } = req.body;

        if (!email || !password || !name || !url) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const urlRegex = /^[a-zA-Z0-9-_]+$/;
        if (!urlRegex.test(url)) {
            return res.status(400).json({ error: "Profile URL can only contain letters, numbers, '-' and '_'. No spaces or special characters allowed." });
        }
        try {
            await connectDB();

            const user = await userSchema.findOne({ email });
            if (!user) {
                return res.status(400).json({ error: "User not found." })
            }

            if (password !== user.password) {
                return res.status(400).json({ error: "Invalid password." })
            }

            const existingProfile = await userSchema.findOne({
                "profiles.profileUrl": url
            });

            if (existingProfile) {
                return res.status(400).json({ error: "This profile URL is already taken." });
            }

            const createdAt = new Date().toLocaleString("tr-TR", { hour12: false });

            const newProfile = {
                _id: new ObjectId().toHexString(),
                profileName: name,
                profileUrl: url,
                createdAt,
                views: 0,
                linkClicks: 0,
                selectedStockBackground: "linear-gradient(90deg, #8a2387 0%, #e94057 52.21%, #f27121 100%)",
                backgroundImg: "",
                displayName: {
                    text: name,
                    backgroundColor: "#0f3057",
                    innerColor: "#ffd60a",
                    fontType: "var(--font-lato)",
                    fontSize: 15,
                    borderStyle: "Square"
                },
                profilePhoto: {
                    enabled: true,
                    photo: "",
                    photoSize: "75px",
                    borderStyle: "Round"
                }
            };

            user.profiles.push(newProfile);
            await user.save()

            return res.status(200).json({
                message: "Profile added successfully!",
                newProfile
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