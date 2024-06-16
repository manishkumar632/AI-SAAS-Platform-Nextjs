import * as z from "zod";

export const formSchema = z.object({
    prompt: z
        .string()
        .min(1, { message: "Please enter a prompt" })
        .max(1024, { message: "Prompt is too long" })
});
