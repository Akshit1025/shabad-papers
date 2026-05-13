
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
    
    // Defaulting to support@shabadpapers.com as per user setup
    // This email should be verified as a sender in your Brevo dashboard.
    const senderEmail = process.env.BREVO_SENDER_EMAIL || "support@shabadpapers.com";
    
    // The recipient is the professional support mail which routes via Cloudflare to Gmail.
    const recipientEmail = process.env.CONTACT_RECIPIENT_EMAIL || "support@shabadpapers.com";
    
    // The reply-to as requested by the user. 
    // Usually, you'd want this to be the customer's email (data.email) so you can reply directly,
    // but setting it to the primary gmail as specified.
    const replyToEmail = "shabadpapersllp@gmail.com";

    if (!apiKey) {
        console.error("BREVO_API_KEY is not set in environment variables.");
        return { success: false, error: "Server configuration error: Email service not configured." };
    }

    const data = parsedInput.data;
    const name = data.name || data.fullName || "A Website Visitor";
    
    // Construct a readable message from all dynamic fields, ignoring empty ones
    const details = Object.entries(data)
        .filter(([_, value]) => value !== undefined && value !== "")
        .map(([key, value]) => {
            const label = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
            return `<p style="margin: 5px 0;"><strong>${label}:</strong> ${value}</p>`;
        })
        .join('');

    const emailPayload = {
        sender: { name: "Shabad Papers Website", email: senderEmail },
        to: [{ email: recipientEmail, name: "Shabad Papers Support" }],
        subject: `New Inquiry from ${name}`,
        htmlContent: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
                <div style="background-color: #4a3728; padding: 20px; text-align: center;">
                    <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Shabad Papers</h1>
                </div>
                <div style="padding: 30px;">
                    <h2 style="color: #4a3728; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px;">New Inquiry Received</h2>
                    <p>Hello, you have received a new inquiry through the website form.</p>
                    <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #4a3728;">
                        ${details}
                    </div>
                </div>
                <div style="background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 12px; color: #777;">
                    <p>This message was sent automatically from your website's contact system.</p>
                </div>
            </div>
        `,
        // Setting replyTo to the primary gmail as requested.
        replyTo: { email: replyToEmail, name: "Shabad Papers LLP" }
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
            return { success: false, error: "Email service rejected the request. Check your API key and verified sender." };
        }
    } catch (error) {
        console.error("Failed to connect to Brevo:", error);
        return { success: false, error: "Could not connect to the email service. Please try again later." };
    }
}
