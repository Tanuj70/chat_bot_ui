import { renameChat } from "@/config/chatService";
import { NextResponse } from "next/server";

export async function POST(req){
    try {
        const userId = "dummy_user_123";
        const {chatId, name} = await req.json();

        await renameChat(chatId, name, userId);

        return NextResponse.json({ success: true, message: "Chat Renamed" });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message });
    }
}