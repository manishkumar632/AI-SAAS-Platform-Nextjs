import { StreamingTextResponse, GoogleGenerativeAIStream } from "ai";
import { GoogleGenerativeAI } from "@google/generative-ai";
export async function POST(req:Request, res:Response){
    const reqBody  = await req.json();
    const prompt = reqBody.data.prompt;
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({
        model: "gemini-pro"
    });
    const streamingResponse = await model.generateContentStream(prompt);
    return new StreamingTextResponse(GoogleGenerativeAIStream(streamingResponse))
}
