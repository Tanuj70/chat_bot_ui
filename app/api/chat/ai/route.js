export const maxDuration = 60;
import { addMessageToChat, getChatById } from "@/config/chatService";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req){
    try {
        const userId = "dummy_user_123";
        const { chatId, prompt } = await req.json();

        const chat = await getChatById(chatId, userId);
        if (!chat) {
            return NextResponse.json({
                success: false,
                message: "Chat not found",
            });
        }

        // Create a user message object
        const userPrompt = {
            role: "user",
            content: prompt,
            timestamp: Date.now()
        };

        await addMessageToChat(chatId, userPrompt, userId);

        let assistantMessage;
        const apiKey = process.env.DEEPSEEK_API_KEY;
        const isPlaceholder = !apiKey || apiKey.includes("---") || apiKey.toLowerCase().includes("dummy");

        if (!isPlaceholder) {
            try {
                const openai = new OpenAI({
                    baseURL: 'https://api.deepseek.com',
                    apiKey: apiKey
                });

                const completion = await openai.chat.completions.create({
                    messages: [{ role: "user", content: prompt }],
                    model: "deepseek-chat",
                    store: true,
                });

                assistantMessage = completion.choices[0].message;
                assistantMessage.timestamp = Date.now();
            } catch (apiError) {
                console.warn("DeepSeek API call error, falling back to simulated response:", apiError.message);
            }
        }

        if (!assistantMessage) {
            assistantMessage = {
                role: "assistant",
                content: `Hello! I'm TejAI. You sent: "${prompt}". TejAI local mode is active and working properly! To connect live AI responses, configure your valid DEEPSEEK_API_KEY in the .env file.`,
                timestamp: Date.now()
            };
        }

        await addMessageToChat(chatId, assistantMessage, userId);

        return NextResponse.json({ success: true, data: assistantMessage });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message });
    }
}