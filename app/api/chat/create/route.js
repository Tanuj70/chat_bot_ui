import { createChat } from "@/config/chatService";
import { NextResponse } from "next/server";

export async function POST(){
    try {
        const userId = "dummy_user_123";
        await createChat(userId);
        return NextResponse.json({ success: true, message: "Chat created" });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message });
    }
}