"use client"


import { useState } from "react"
import Image from "next/image"
import { Camera, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="bg-black/40 border-green-900/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Profile Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* Profile Picture */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-green-600/20">
                  <Image
                    src="/placeholder.svg?height=128&width=128"
                    alt="Profile picture"
                    width={128}
                    height={128}
                    className="h-full w-full object-cover"
                  />
                </div>
                <Button size="icon" className="absolute bottom-0 right-0 rounded-full bg-green-600 hover:bg-green-500">
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Form */}
            <div className="grid gap-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-gray-300">
                    First name
                  </Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    disabled={!isEditing}
                    className="border-green-900/30 bg-black/30 text-white placeholder:text-gray-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-gray-300">
                    Last name
                  </Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    disabled={!isEditing}
                    className="border-green-900/30 bg-black/30 text-white placeholder:text-gray-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  disabled={!isEditing}
                  className="border-green-900/30 bg-black/30 text-white placeholder:text-gray-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-300">
                  Phone number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  disabled={!isEditing}
                  className="border-green-900/30 bg-black/30 text-white placeholder:text-gray-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="country" className="text-gray-300">
                  Country
                </Label>
                <Select disabled={!isEditing}>
                  <SelectTrigger className="border-green-900/30 bg-black/30 text-white">
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio" className="text-gray-300">
                  Bio
                </Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself"
                  disabled={!isEditing}
                  className="min-h-[100px] border-green-900/30 bg-black/30 text-white placeholder:text-gray-500"
                />
              </div>

              <div className="flex justify-end gap-4">
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(!isEditing)}
                  className="border-amber-400 text-amber-400 hover:bg-amber-400/10"
                >
                  {isEditing ? "Cancel" : "Edit Profile"}
                </Button>
                {isEditing && (
                  <Button onClick={() => setIsEditing(false)} className="bg-green-600 hover:bg-green-500">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

    </div>
  )
}