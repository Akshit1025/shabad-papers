/**
 * @fileOverview Server actions for the application.
 * This file contains server-side functions that can be called from client components,
 * for example, to handle form submissions.
 */
"use server";

import { z } from "zod";

const inquirySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    message: z.string(),
    product: z.string().optional(),
});

/**
 * Submits a user inquiry from the contact form.
 * In a real application, this would handle sending an email or saving to a database.
 * @param {object} input - The user's inquiry data.
 * @param {string} input.name - The user's name.
 * @param {string} input.email - The user's email.
 * @param {string} input.message - The user's message.
 * @param {string} [input.product] - The product being inquired about.
 * @returns {Promise<{success: boolean, error?: string}>} An object indicating success or failure.
 */
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
