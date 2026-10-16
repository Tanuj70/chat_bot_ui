import { getUserChats } from "@/config/chatService";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        const userId = "dummy_user_123";
        const data = await getUserChats(userId);
        return NextResponse.json({ success: true, data });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message });
    }
}