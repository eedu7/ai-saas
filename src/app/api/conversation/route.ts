import OpenAI from "openai";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

// NOTE: This is for connecting with Google GenAI
// const API_KEY = process.env.GOOGLE_API_KEY!;
// const openAi = new OpenAI({
//     apiKey: API_KEY,
//     baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
// });

// NOTE: This is for connecting with Local Ollama Models

const API_KEY = "ollama";

const openAi = new OpenAI({
    apiKey: API_KEY,
    baseURL: "http://localhost:11434/v1",
});

export async function POST(req: Request) {
    try {
        const { userId } = await auth();

        if (!userId) return new NextResponse("Unauthorized", { status: 401 });

        const body = await req.json();
        const { messages } = body;

        if (!API_KEY) return new NextResponse("API key not configured", { status: 500 });

        if (!messages) return new NextResponse("Messages are required", { status: 400 });

        // NOTE: This is connecting with Google Gemini model
        // const response = await openAi.chat.completions.create({
        //     model: "gemini-2.0-flash",
        //     messages,
        // });

        const response = await openAi.chat.completions.create({
            model: "qwen2.5:14b",
            messages,
        });

        return NextResponse.json(response.choices[0].message);
    } catch (error) {
        console.log("[CONVERSATION_ERROR]", error);
        return new NextResponse("Internal error", {
            status: 500,
        });
    }
}
