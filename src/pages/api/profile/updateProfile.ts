import { NextApiRequest, NextApiResponse } from "next";
import { userSchema } from "../models/user";
import bcrypt from "bcrypt";
import fs from "fs";
import path from "path";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { email, password, profileId, stockBackground, backgroundImg } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "E-mail and Password are required." });
        }

        try {
            const user = await userSchema.findOne({ email });
            if (!user) {
                return res.status(400).json({ error: "User not found." });
            }

            if (password != user.password) {
                return res.status(401).json({ error: "Invalid password." });
            }

            const profileIndex = user.profiles.findIndex((p: any) => p._id.toString() === profileId);
            if (profileIndex === -1) {
                return res.status(404).json({ error: "Profile not found." });
            }

            if (stockBackground) {
                user.profiles[profileIndex].selectedStockBackground = stockBackground;
            }
            else {
                user.profiles[profileIndex].selectedStockBackground = "";
            }

             if (backgroundImg) {
                const backgroundDir = path.join(process.cwd(), 'public', 'backgroundImages');

                const files = fs.readdirSync(backgroundDir);


                const bgFileName = path.basename(backgroundImg);

                for (const file of files) {
                    if (file.startsWith(user.username) && file !== bgFileName) {
                        try {
                            fs.unlinkSync(path.join(backgroundDir, file));
                        } catch (error) {
                            console.error("Dosya silinirken hata:", error);
                        }
                    }
                }

                user.profiles[profileIndex].backgroundImg = backgroundImg;
            } else {
                user.profiles[profileIndex].backgroundImg = "";
            }
            user.markModified("profiles");

            await user.save();

            return res.status(200).json({
                message: "Profile updated successfully.",
                updatedProfile: user.profiles[profileIndex]
            });
        } catch (e) {
            return res.status(500).json({ error: `Database connection failed: ${e}` });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
