import OpenAI from "openai";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

// NOTE: This is for connecting with Google GenAI using OpenAI
const API_KEY = process.env.OPENAI_API_KEY!;
const openAi = new OpenAI({
    apiKey: API_KEY,
});

export async function POST(req: Request) {
    try {
        const { userId } = await auth();

        if (!userId) return new NextResponse("Unauthorized", { status: 401 });

        const body = await req.json();
        const { prompt, amount = "1", resolution = "256x256" } = body;

        if (!API_KEY) return new NextResponse("API key not configured", { status: 500 });

        if (!prompt) return new NextResponse("Prompt is required", { status: 400 });

        const response = await openAi.images.generate({
            model: "dall-e-2",
            prompt: prompt,
            n: parseInt(amount, 10),
            size: resolution,
        });

        return NextResponse.json(response.data);
    } catch (error) {
        console.log("[CODE_ERROR]", error);
        return new NextResponse("Internal error", {
            status: 500,
        });
    }
}
