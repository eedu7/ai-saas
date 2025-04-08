import OpenAI from "openai";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

// NOTE: This is for connecting with Google GenAI using OpenAI
const API_KEY = process.env.GOOGLE_API_KEY!;
const openAi = new OpenAI({
    apiKey: API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

// TODO: Properly assign role
const instructionsMessage = {
    role: "system",
    content:
        "You are a code generator. You must answer only in markdown code snippets. Use code comments for" +
        " explanation. Also explain each step and your thought process of creating code. the code should be simple" +
        " and concise and also handle edge cases",
};

export async function POST(req: Request) {
    try {
        const { userId } = await auth();

        if (!userId) return new NextResponse("Unauthorized", { status: 401 });

        const body = await req.json();
        const { messages } = body;

        if (!API_KEY) return new NextResponse("API key not configured", { status: 500 });

        if (!messages) return new NextResponse("Messages are required", { status: 400 });

        const response = await openAi.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [instructionsMessage, ...messages],
        });

        return NextResponse.json(response.choices[0].message);
    } catch (error) {
        console.log("[CODE_ERROR]", error);
        return new NextResponse("Internal error", {
            status: 500,
        });
    }
}
