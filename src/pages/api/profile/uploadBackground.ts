import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs";
import type { Fields, Files, File } from "formidable";

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const formidable = (await import("formidable")).default;
    const form = formidable({ multiples: false, uploadDir: ".", keepExtensions: true });

    form.parse(req, async (err: any, fields: Fields, files: Files) => {
        if (err) {
            return res.status(500).json({ error: "File upload error" });
        }
        let file: File | File[] | undefined = files.file;
        if (Array.isArray(file)) file = file[0];
        if (!file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        
        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (!allowedTypes.includes(file.mimetype || "")) {
            return res.status(400).json({ error: "Invalid file type" });
        }

          let fileName: string;
        if (fields.fileName) {
            fileName = Array.isArray(fields.fileName) ? fields.fileName[0] : fields.fileName;
        } else {
            fileName = file.newFilename; 
        }

        const destDir = path.join(process.cwd(), "public", "backgroundImages");
        if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
        const destPath = path.join(destDir, fileName);
        fs.renameSync(file.filepath, destPath);
        return res.status(200).json({ fileName });
    });
}
