"use client"

import Image from "next/image"
import { useState } from "react"

export default function FileUpload() {
  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleUpload = async () => {
    if (!image) return

    setUploading(true)
    const formData = new FormData()
    formData.append("file", image)

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify({ file: await toBase64(image) }),
        headers: { "Content-Type": "application/json" },
      })

      const data = await response.json()
      if (data.url) {
        setUploadedUrl(data.url)
      }
    } catch (error) {
      console.error("Upload error:", error)
    } finally {
      setUploading(false)
    }
  }

  // Convert File to Base64
  const toBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = reject
    })

  return (
    <div className="space-y-4">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {preview && <Image src={preview} alt="Preview" className="w-32 h-32 object-cover" />}
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
      {uploadedUrl && (
        <div>
          <p>Uploaded Image:</p>
          <Image src={uploadedUrl} alt="Uploaded" className="w-32 h-32 object-cover" />
        </div>
      )}
    </div>
  )
}
