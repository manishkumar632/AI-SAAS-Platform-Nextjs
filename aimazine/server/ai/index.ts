import { createOpenAI } from "@ai-sdk/openai"

export const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

export const openaiModel = openai("gpt-3.5-turbo-0125");