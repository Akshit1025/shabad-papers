
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

    // Construct a readable message from all dynamic fields with dark theme styling
    const detailsRows = Object.entries(data)
        .filter(([key, value]) => value !== undefined && value !== "" && !['id', 'formId'].includes(key))
        .map(([key, value]) => {
            const label = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').replace(/_/g, ' ');
            return `
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.08);">
                    <td style="padding: 14px 0; color: #a1a1a1; font-size: 14px; width: 35%; vertical-align: top; font-family: 'Segoe UI', Tahoma, sans-serif;">${label}</td>
                    <td style="padding: 14px 0; color: #ffffff; font-size: 14px; font-weight: 600; text-align: left; font-family: 'Segoe UI', Tahoma, sans-serif;">${value}</td>
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
        background-color: #ffffff;
        border: 1px solid #f0f0f0; 
        border-radius: 16px; 
        overflow: hidden; 
        box-shadow: 0 10px 30px rgba(74, 55, 40, 0.08);
    `;

    const headerHtml = `
        <div style="background-color: #4a3728; padding: 40px 20px; text-align: center;">
            <div style="display: inline-block; padding: 10px 20px; border: 2px solid #d2b48c; border-radius: 4px;">
                <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 3px; font-weight: bold; text-transform: uppercase;">SHABAD PAPERS</h1>
            </div>
            <p style="color: #d2b48c; margin: 12px 0 0 0; font-size: 13px; text-transform: uppercase; letter-spacing: 4px; font-weight: 500;">Premium Paper Solutions</p>
        </div>
    `;

    const summaryBoxHtml = `
        <div style="background-color: #1a1512; padding: 35px; border-radius: 12px; margin: 25px 0; box-shadow: inset 0 2px 10px rgba(0,0,0,0.2);">
            <h3 style="color: #d2b48c; margin-top: 0; margin-bottom: 25px; font-size: 18px; font-weight: 600; font-family: 'Segoe UI', sans-serif; border-bottom: 1px solid #d2b48c; padding-bottom: 10px; display: inline-block;">Summary of the inquiry:</h3>
            <table style="width: 100%; border-collapse: collapse;">
                ${detailsRows}
            </table>
        </div>
    `;

    const footerHtml = `
        <div style="background-color: #fcfcfc; padding: 40px 30px; text-align: center; border-top: 1px solid #f0f0f0;">
            <p style="margin: 0 0 20px 0; font-size: 13px; color: #4a3728; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;">Connect With Us</p>
            <div style="margin-bottom: 25px;">
                <a href="https://wa.me/${adminWhatsApp}" style="display: inline-block; margin: 0 15px; color: #4a3728; text-decoration: none; font-size: 12px; font-weight: 600;">WHATSAPP</a>
                <span style="color: #d2b48c;">&bull;</span>
                <a href="https://www.linkedin.com/in/dinesh-gupta-57b513374/" style="display: inline-block; margin: 0 15px; color: #4a3728; text-decoration: none; font-size: 12px; font-weight: 600;">LINKEDIN</a>
                <span style="color: #d2b48c;">&bull;</span>
                <a href="https://g.co/kgs/WDyBz11" style="display: inline-block; margin: 0 15px; color: #4a3728; text-decoration: none; font-size: 12px; font-weight: 600;">GOOGLE</a>
            </div>
            <p style="margin: 0; font-size: 11px; color: #999; letter-spacing: 0.5px;">&copy; ${new Date().getFullYear()} Shabad Papers LLP. All Rights Reserved.</p>
            <p style="margin: 8px 0 0 0; font-size: 10px; color: #bbb;">Gala No 5, Mistry Industrial Complex, MIDC, Mumbai</p>
        </div>
    `;

    // 1. Prepare Admin Email Content
    const adminHtml = `
        <div style="background-color: #f7f3f0; padding: 40px 10px;">
            <div style="${sharedStyles}">
                ${headerHtml}
                <div style="padding: 40px 35px; background-color: #ffffff;">
                    <div style="border-left: 4px solid #4a3728; padding-left: 20px; margin-bottom: 30px;">
                        <h2 style="color: #4a3728; font-size: 22px; margin: 0; font-weight: 700;">New Business Inquiry</h2>
                        <p style="font-size: 14px; color: #777; margin: 5px 0 0 0;">Received via Website Portal</p>
                    </div>
                    
                    <p style="font-size: 15px; color: #555; line-height: 1.7;">You have received a new inquiry from a potential client. Please review the details and respond promptly.</p>
                    
                    ${summaryBoxHtml}

                    <div style="text-align: center; margin-top: 35px;">
                        <p style="font-size: 13px; color: #888; margin-bottom: 20px; font-weight: 600;">Follow up with ${name}:</p>
                        <div style="margin: 0 auto;">
                            ${cleanedUserPhone ? `
                            <a href="https://wa.me/${cleanedUserPhone}" style="background-color: #25d366; color: #ffffff; padding: 14px 25px; text-decoration: none; border-radius: 8px; font-weight: 700; display: inline-block; font-size: 14px; box-shadow: 0 4px 14px rgba(37, 211, 102, 0.2); margin: 5px; min-width: 180px;">
                                Reply via WhatsApp
                            </a>
                            ` : ''}
                            ${userEmail && userEmail.includes('@') ? `
                            <a href="mailto:${userEmail}?subject=Re: Your Inquiry - Shabad Papers" style="background-color: #4a3728; color: #ffffff; padding: 14px 25px; text-decoration: none; border-radius: 8px; font-weight: 700; display: inline-block; font-size: 14px; box-shadow: 0 4px 14px rgba(74, 55, 40, 0.2); margin: 5px; min-width: 180px;">
                                Reply via Email
                            </a>
                            ` : ''}
                        </div>
                    </div>
                </div>
                ${footerHtml}
            </div>
        </div>
    `;

    // 2. Prepare User Confirmation Email Content
    const userHtml = `
        <div style="background-color: #f7f3f0; padding: 40px 10px;">
            <div style="${sharedStyles}">
                ${headerHtml}
                <div style="padding: 40px 35px; background-color: #ffffff;">
                    <div style="border-left: 4px solid #d2b48c; padding-left: 20px; margin-bottom: 30px;">
                        <h2 style="color: #4a3728; font-size: 22px; margin: 0; font-weight: 700;">Inquiry Received</h2>
                        <p style="font-size: 14px; color: #777; margin: 5px 0 0 0;">Thank you for reaching out</p>
                    </div>

                    <p style="font-size: 15px; color: #333; font-weight: 600;">Hello ${name},</p>
                    <p style="font-size: 15px; color: #555; line-height: 1.7;">We have successfully received your inquiry. Our specialized team is currently reviewing your requirements and will get back to you within 24 business hours.</p>
                    
                    ${summaryBoxHtml}

                    <div style="background-color: #fdfaf7; border: 1px solid #f0e6dc; padding: 30px; border-radius: 12px; text-align: center; margin-top: 30px;">
                        <p style="font-size: 15px; color: #4a3728; margin: 0 0 20px 0; font-weight: 600;">Need an immediate response?</p>
                        <a href="https://wa.me/${adminWhatsApp}" style="background-color: #25d366; color: #ffffff; padding: 16px 35px; text-decoration: none; border-radius: 8px; font-weight: 700; display: inline-block; font-size: 15px; box-shadow: 0 4px 14px rgba(37, 211, 102, 0.3);">
                            Chat with us on WhatsApp
                        </a>
                        <p style="font-size: 12px; color: #888; margin: 15px 0 0 0;">Available Mon-Sat, 10 AM - 6 PM</p>
                    </div>
                </div>
                ${footerHtml}
            </div>
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
                    subject: `We've Received Your Inquiry - Shabad Papers`,
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
