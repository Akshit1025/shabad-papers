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
    const senderEmail = process.env.BREVO_SENDER_EMAIL || "support@shabadpapers.com";
    const recipientEmail = process.env.CONTACT_RECIPIENT_EMAIL || "support@shabadpapers.com";
    const replyToEmail = "shabadpapersllp@gmail.com";

    if (!apiKey) {
        console.error("BREVO_API_KEY is not set in environment variables.");
        return { success: false, error: "Server configuration error: Email service not configured." };
    }

    const data = parsedInput.data;
    const name = data.name || data.fullName || data.customer_name || "Valued Customer";
    const userEmail = data.email || data.userEmail || data.customer_email || data.email_address;
    
    // Construct a readable message from all dynamic fields, ignoring empty ones
    const details = Object.entries(data)
        .filter(([_, value]) => value !== undefined && value !== "")
        .map(([key, value]) => {
            const label = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').replace(/_/g, ' ');
            return `
                <tr style="border-bottom: 1px solid #f0f0f0;">
                    <td style="padding: 10px 0; color: #666; font-size: 14px; width: 40%;">${label}</td>
                    <td style="padding: 10px 0; color: #333; font-size: 14px; font-weight: bold;">${value}</td>
                </tr>
            `;
        })
        .join('');

    const htmlContent = `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
            <div style="background-color: #4a3728; padding: 30px 20px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 28px; letter-spacing: 1px; font-weight: bold;">SHABAD PAPERS</h1>
                <p style="color: #d2b48c; margin: 5px 0 0 0; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">Quality Paper Solutions</p>
            </div>
            
            <div style="padding: 40px 30px; background-color: #ffffff;">
                <h2 style="color: #4a3728; font-size: 20px; margin-bottom: 20px; border-bottom: 2px solid #f8f8f8; padding-bottom: 10px;">Inquiry Received</h2>
                <p style="font-size: 16px;">Hello,</p>
                <p style="font-size: 15px; color: #555;">Thank you for reaching out to us. We have received a new inquiry with the following details:</p>
                
                <table style="width: 100%; border-collapse: collapse; margin: 25px 0;">
                    ${details}
                </table>

                <div style="margin-top: 30px; padding: 20px; background-color: #fdfaf7; border-radius: 8px; border-left: 4px solid #4a3728;">
                    <p style="margin: 0; font-size: 14px; color: #7a5c43;"><strong>Next Steps:</strong> Our team will review your requirements and get back to you within 24 business hours.</p>
                </div>
            </div>

            <div style="background-color: #f9f9f9; padding: 30px; text-align: center; border-top: 1px solid #eee;">
                <p style="margin: 0 0 15px 0; font-size: 14px; color: #777; font-weight: bold;">Connect With Us</p>
                <div style="margin-bottom: 20px;">
                    <a href="https://www.linkedin.com/in/dinesh-gupta-57b513374/" style="display: inline-block; margin: 0 10px; color: #4a3728; text-decoration: none; font-size: 12px; font-weight: bold;">LINKEDIN</a>
                    <a href="https://wa.me/919810087126" style="display: inline-block; margin: 0 10px; color: #4a3728; text-decoration: none; font-size: 12px; font-weight: bold;">WHATSAPP</a>
                    <a href="https://g.co/kgs/WDyBz11" style="display: inline-block; margin: 0 10px; color: #4a3728; text-decoration: none; font-size: 12px; font-weight: bold;">GOOGLE</a>
                </div>
                <p style="margin: 0; font-size: 12px; color: #aaa;">&copy; ${new Date().getFullYear()} Shabad Papers LLP. All Rights Reserved.</p>
                <p style="margin: 5px 0 0 0; font-size: 11px; color: #bbb;">Gala No 5, Mistry Industrial Complex, MIDC, Mumbai</p>
            </div>
        </div>
    `;

    // Prepare recipients list
    const to = [{ email: recipientEmail, name: "Shabad Papers Support" }];
    if (userEmail && userEmail.includes('@')) {
        to.push({ email: userEmail, name: name });
    }

    const emailPayload = {
        sender: { name: "Shabad Papers", email: senderEmail },
        to: to,
        subject: `Inquiry: ${name} via Shabad Papers Website`,
        htmlContent: htmlContent,
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
            return { success: false, error: "Failed to send email. Please ensure the sender email is verified in Brevo." };
        }
    } catch (error) {
        console.error("Failed to connect to Brevo:", error);
        return { success: false, error: "Could not connect to the email service. Please try again later." };
    }
}
