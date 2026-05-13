
/**
 * @fileOverview Server actions for the application.
 * This file contains server-side functions that can be called from client components.
 */
"use server";

import { z } from "zod";

// Use a passthrough schema to allow any fields from dynamic forms
const inquirySchema = z.object({}).passthrough();

/**
 * Submits a user inquiry using the Brevo (formerly Sendinblue) API.
 * @param {object} input - The user's inquiry data.
 * @returns {Promise<{success: boolean, error?: string}>} An object indicating success or failure.
 */
export async function submitInquiry(input) {
    const parsedInput = inquirySchema.safeParse(input);
    if (!parsedInput.success) {
        return { success: false, error: "Invalid input data." };
    }

    const apiKey = process.env.BREVO_API_KEY;
    const senderEmail = process.env.BREVO_SENDER_EMAIL || "shabadpapersllp@gmail.com";
    const recipientEmail = process.env.CONTACT_RECIPIENT_EMAIL || "shabadpapersllp@gmail.com";

    if (!apiKey) {
        console.error("BREVO_API_KEY is not set in environment variables.");
        return { success: false, error: "Server configuration error: Email service not configured." };
    }

    const data = parsedInput.data;
    const name = data.name || data.fullName || "A Website Visitor";
    
    // Construct a readable message from all dynamic fields
    const details = Object.entries(data)
        .map(([key, value]) => `<b>${key.charAt(0).toUpperCase() + key.slice(1)}:</b> ${value}`)
        .join('<br>');

    const emailPayload = {
        sender: { name: "Shabad Papers Website", email: senderEmail },
        to: [{ email: recipientEmail, name: "Shabad Papers Admin" }],
        subject: `New Inquiry from ${name}`,
        htmlContent: `
            <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
                <h2>New Inquiry Received</h2>
                <p>You have received a new inquiry from your website.</p>
                <hr style="border: 0; border-top: 1px solid #eee;" />
                <div style="padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
                    ${details}
                </div>
                <hr style="border: 0; border-top: 1px solid #eee;" />
                <p style="font-size: 12px; color: #888;">This email was sent automatically from your website contact form.</p>
            </div>
        `,
        replyTo: data.email ? { email: data.email, name: name } : undefined
    };

    try {
        const response = await fetch("https://api.brevo.com/v3/smtp/email", {
            method: "POST",
            headers: {
                "accept": "application/json",
                "api-key": apiKey,
                "content-type": "application/json"
            },
            body: JSON.stringify(emailPayload),
        });

        if (response.ok) {
            return { success: true };
        } else {
            const errorData = await response.json();
            console.error("Brevo API Error:", errorData);
            return { success: false, error: "Failed to send email. please try again later." };
        }
    } catch (error) {
        console.error("Failed to connect to Brevo:", error);
        return { success: false, error: "Could not connect to the email service." };
    }
}
