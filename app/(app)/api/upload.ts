import type { NextApiRequest, NextApiResponse } from "next"
import cloudinary from "@/lib/cloudinary"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" })
  }

  try {
    const { file } = req.body // ✅ Expecting Base64 string

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" })
    }

    // Upload to Cloudinary
    const uploadedImage = await cloudinary.uploader.upload(file, {
      folder: "your_folder",
      resource_type: "image",
    })

    return res.status(200).json({ url: uploadedImage.secure_url })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Upload failed" })
  }
}
