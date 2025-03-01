"use server";

import { checkRole } from "@/utils/roles";
import { clerkClient } from "@clerk/nextjs/server";

export async function setRole(formData: FormData): Promise<void> {
  const userId = formData.get("id") as string;
  const role = formData.get("role") as string;
  const client = await clerkClient();
  if (!checkRole("admin")) {
    throw new Error("Not Authorized");
  }

  try {
    await client.users.updateUserMetadata(userId, {
      publicMetadata: { role },
    });
  } catch (err) {
    console.error("Error setting role:", err);
    throw new Error("Failed to update user role");
  }
}

export async function removeRole(formData: FormData): Promise<void> {
  const userId = formData.get("id") as string;
  const role = formData.get("role") as string;
  const client = await clerkClient();
  if (!checkRole("admin")) {
    throw new Error("Not Authorized");
  }
  try {
    await client.users.updateUserMetadata(userId, {
      publicMetadata: { role: null },
    });
  } catch (err) {
    console.error("Error removing role:", err);
    throw new Error("Failed to remove user role");
  }
}
