import { clerkClient } from "@clerk/nextjs/server";

export async function getUsers(query?: string) {
  const client = await clerkClient();
  const users = query ? (await client.users.getUserList({ query })).data : [];
  return users;
}
