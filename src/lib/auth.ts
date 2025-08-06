import { getServerSession } from "next-auth";
import { authOptions } from "./auth-option";
import { NextResponse } from "next/server";

export const getCurrentUser = async () => {
  const session = await getServerSession(authOptions);
  return session;
};

export const getCurrentUserId = async () => {
  const session = await getCurrentUser();
  return session?.user?.id;
};

//middleware to check if user is authenticated
export async function requireAuth() {
    const userId = await getCurrentUserId();
    
    if (!userId) {
        return {
            error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
            userId: null
        };
    }
    
    return {
        error: null,
        userId
    };
} 