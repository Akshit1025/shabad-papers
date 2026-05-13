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
 * It sends two separate emails: one to the admin and one to the user.
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
    const adminWhatsApp = "919810087126"; // Admin's WhatsApp number

    if (!apiKey) {
        console.error("BREVO_API_KEY is not set in environment variables.");
        return { success: false, error: "Server configuration error: Email service not configured." };
    }

    const data = parsedInput.data;
    const name = data.name || data.fullName || data.customer_name || "Valued Customer";
    const userEmail = data.email || data.userEmail || data.customer_email || data.email_address;
    const userPhone = data.phone || data.phoneNumber || data.contact;
    
    // Clean user phone for WhatsApp link (remove non-digits)
    const cleanedUserPhone = userPhone ? userPhone.replace(/[^0-9]/g, '') : null;

    // Construct a readable message from all dynamic fields
    const detailsRows = Object.entries(data)
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

    const sharedStyles = `
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
        line-height: 1.6; 
        color: #333; 
        max-width: 600px; 
        margin: 0 auto; 
        border: 1px solid #e0e0e0; 
        border-radius: 12px; 
        overflow: hidden; 
        box-shadow: 0 4px 10px rgba(0,0,0,0.05);
    `;

    const headerHtml = `
        <div style="background-color: #4a3728; padding: 30px 20px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; letter-spacing: 1px; font-weight: bold;">SHABAD PAPERS</h1>
            <p style="color: #d2b48c; margin: 5px 0 0 0; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">Quality Paper Solutions</p>
        </div>
    `;

    const footerHtml = `
        <div style="background-color: #f9f9f9; padding: 30px; text-align: center; border-top: 1px solid #eee;">
            <p style="margin: 0 0 15px 0; font-size: 14px; color: #777; font-weight: bold;">Connect With Us</p>
            <div style="margin-bottom: 20px;">
                <a href="https://www.linkedin.com/in/dinesh-gupta-57b513374/" style="display: inline-block; margin: 0 10px; color: #4a3728; text-decoration: none; font-size: 12px; font-weight: bold;">LINKEDIN</a>
                <a href="https://wa.me/${adminWhatsApp}" style="display: inline-block; margin: 0 10px; color: #4a3728; text-decoration: none; font-size: 12px; font-weight: bold;">WHATSAPP</a>
                <a href="https://g.co/kgs/WDyBz11" style="display: inline-block; margin: 0 10px; color: #4a3728; text-decoration: none; font-size: 12px; font-weight: bold;">GOOGLE</a>
            </div>
            <p style="margin: 0; font-size: 12px; color: #aaa;">&copy; ${new Date().getFullYear()} Shabad Papers LLP. All Rights Reserved.</p>
            <p style="margin: 5px 0 0 0; font-size: 11px; color: #bbb;">Gala No 5, Mistry Industrial Complex, MIDC, Mumbai</p>
        </div>
    `;

    // 1. Prepare Admin Email Content
    const adminHtml = `
        <div style="${sharedStyles}">
            ${headerHtml}
            <div style="padding: 40px 30px; background-color: #ffffff;">
                <h2 style="color: #4a3728; font-size: 20px; margin-bottom: 20px; border-bottom: 2px solid #f8f8f8; padding-bottom: 10px;">New Inquiry from Website</h2>
                <p style="font-size: 15px; color: #555;">You have received a new business inquiry. Details are provided below:</p>
                
                <table style="width: 100%; border-collapse: collapse; margin: 25px 0;">
                    ${detailsRows}
                </table>

                ${cleanedUserPhone ? `
                <div style="text-align: center; margin-top: 30px;">
                    <a href="https://wa.me/${cleanedUserPhone}" style="background-color: #25d366; color: white; padding: 14px 25px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 16px;">
                        Reply via WhatsApp
                    </a>
                </div>
                ` : ''}
            </div>
            ${footerHtml}
        </div>
    `;

    // 2. Prepare User Confirmation Email Content
    const userHtml = `
        <div style="${sharedStyles}">
            ${headerHtml}
            <div style="padding: 40px 30px; background-color: #ffffff;">
                <h2 style="color: #4a3728; font-size: 20px; margin-bottom: 20px; border-bottom: 2px solid #f8f8f8; padding-bottom: 10px;">We Received Your Inquiry</h2>
                <p style="font-size: 16px;">Hello ${name},</p>
                <p style="font-size: 15px; color: #555;">Thank you for reaching out to Shabad Papers. We have received your inquiry and our team will get back to you within 24 business hours.</p>
                
                <div style="margin: 30px 0; padding: 20px; background-color: #fdfaf7; border-radius: 8px; border-left: 4px solid #4a3728;">
                    <p style="margin: 0; font-size: 14px; color: #7a5c43;"><strong>Summary of your inquiry:</strong></p>
                    <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                        ${detailsRows}
                    </table>
                </div>

                <p style="font-size: 15px; color: #555;">Need a quicker response? Connect with us directly on WhatsApp:</p>
                
                <div style="text-align: center; margin-top: 10px;">
                    <a href="https://wa.me/${adminWhatsApp}" style="background-color: #25d366; color: white; padding: 14px 25px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 16px;">
                        Chat with us on WhatsApp
                    </a>
                </div>
            </div>
            ${footerHtml}
        </div>
    `;

    try {
        // Send to Admin
        const adminRes = await fetch("https://api.brevo.com/v3/smtp/email", {
            method: "POST",
            headers: {
                "accept": "application/json",
                "api-key": apiKey,
                "content-type": "application/json"
            },
            body: JSON.stringify({
                sender: { name: "Shabad Papers Website", email: senderEmail },
                to: [{ email: recipientEmail, name: "Shabad Papers Support" }],
                subject: `New Inquiry: ${name}`,
                htmlContent: adminHtml,
                replyTo: { email: userEmail && userEmail.includes('@') ? userEmail : "shabadpapersllp@gmail.com", name: name }
            }),
        });

        // Send confirmation to User (if valid email provided)
        if (userEmail && userEmail.includes('@')) {
            await fetch("https://api.brevo.com/v3/smtp/email", {
                method: "POST",
                headers: {
                    "accept": "application/json",
                    "api-key": apiKey,
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    sender: { name: "Shabad Papers LLP", email: senderEmail },
                    to: [{ email: userEmail, name: name }],
                    subject: `Inquiry Received - Shabad Papers LLP`,
                    htmlContent: userHtml,
                    replyTo: { email: "shabadpapersllp@gmail.com", name: "Shabad Papers Support" }
                }),
            });
        }

        if (adminRes.ok) {
            return { success: true };
        } else {
            const errorData = await adminRes.json();
            console.error("Brevo API Error:", errorData);
            return { success: false, error: "Failed to send email. Please check server logs." };
        }
    } catch (error) {
        console.error("Failed to connect to Brevo:", error);
        return { success: false, error: "Could not connect to the email service." };
    }
}
