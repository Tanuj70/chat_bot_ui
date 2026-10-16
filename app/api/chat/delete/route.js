import { deleteChat } from "@/config/chatService";
import { NextResponse } from "next/server";

export async function POST(req){
    try {
        const userId = "dummy_user_123";
        const { chatId } = await req.json();

        await deleteChat(chatId, userId);

        return NextResponse.json({ success: true, message: "Chat Deleted" });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message });
    }
}