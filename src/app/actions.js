/**
 * @fileOverview Server actions for the application.
 * This file contains server-side functions that can be called from client components,
 * for example, to handle form submissions.
 */
"use server";

import { z } from "zod";

// Use a passthrough schema to allow any fields from dynamic forms
const inquirySchema = z.object({}).passthrough();

/**
 * Submits a user inquiry from the contact form to Web3Forms.
 * @param {object} input - The user's inquiry data.
 * @returns {Promise<{success: boolean, error?: string}>} An object indicating success or failure.
 */
export async function submitInquiry(input) {
    const parsedInput = inquirySchema.safeParse(input);
    if (!parsedInput.success) {
        return { success: false, error: "Invalid input." };
    }

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
        console.error("Web3Forms Access Key is not set in environment variables.");
        return { success: false, error: "Server configuration error: cannot send email." };
    }
    
    const name = parsedInput.data.name || parsedInput.data.fullName || "a visitor";

    const formData = {
        ...parsedInput.data,
        access_key: accessKey,
        subject: `New Inquiry from ${name}`,
        from_name: "Shabad Papers Website",
    };

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (result.success) {
            console.log("Inquiry successfully sent via Web3Forms:", result);
            return { success: true };
        } else {
            console.error("Web3Forms API Error:", result.message);
            return { success: false, error: result.message || "An error occurred while sending the form." };
        }
    } catch (error) {
        console.error("Failed to send inquiry via Web3Forms:", error);
        return { success: false, error: "Could not connect to the form submission service." };
    }
}
