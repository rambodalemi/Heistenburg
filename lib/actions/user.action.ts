"use server";

import User from "@/models/User";
import { dbConnect } from "../mongodb";

export async function createUser(user: any) {
  try {
    await dbConnect();
    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
  }
}