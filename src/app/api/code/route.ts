import OpenAI from "openai";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";

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
        "You are a highly skilled Senior Full Stack Developer with 10+ years of experience in building scalable web applications. Your job is to generate clean, production-ready code for both frontend and backend tasks using modern technologies. You understand best practices, write well-structured code, and include helpful comments where necessary. Please follow the user's instructions carefully and output only the requested code",
};

export async function POST(req: Request) {
    try {
        const { userId } = await auth();

        if (!userId) return new NextResponse("Unauthorized", { status: 401 });

        const body = await req.json();
        const { messages } = body;

        if (!API_KEY) return new NextResponse("API key not configured", { status: 500 });

        if (!messages) return new NextResponse("Messages are required", { status: 400 });

        const freeTrial = await checkApiLimit();

        if (!freeTrial) {
            return new NextResponse("Free trial has expired", {
                status: 403,
            });
        } else {
            const response = await openAi.chat.completions.create({
                model: "gemini-2.0-flash",
                messages: [instructionsMessage, ...messages],
            });
            await increaseApiLimit();

            return NextResponse.json(response.choices[0].message);
        }
    } catch (error) {
        console.log("[CODE_ERROR]", error);
        return new NextResponse("Internal error", {
            status: 500,
        });
    }
}
