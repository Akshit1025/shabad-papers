"use server";

import { z } from "zod";

const inquirySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    message: z.string(),
});

export async function submitInquiry(input) {
    const parsedInput = inquirySchema.safeParse(input);
    if (!parsedInput.success) {
        return { success: false, error: "Invalid input." };
    }

    // In a real application, you would send an email, save to a database, etc.
    // For this example, we'll just log it to the console.
    console.log("New inquiry received:", parsedInput.data);

    return { success: true };
}
