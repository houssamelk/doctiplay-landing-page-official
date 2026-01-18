import emailjs from '@emailjs/browser';

// ⚠️ IMPORTANT: YOU MUST REPLACE THESE WITH YOUR ACTUAL EMAILJS CREDENTIALS
// Get them from: https://dashboard.emailjs.com/admin
const SERVICE_ID = 'YOUR_SERVICE_ID';     // e.g. 'service_xp9...'
const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';   // e.g. 'template_42...'
const PUBLIC_KEY = 'YOUR_PUBLIC_KEY';     // e.g. 'user_...'

export interface PartnershipData {
    name: string;
    email: string;
    institution: string;
    role: string;
    message: string;
}

export const sendPartnershipEmail = (data: PartnershipData) => {
    const templateParams = {
        // These keys match the variables you should define in your EmailJS template
        // e.g. {{from_name}}, {{from_email}}, etc.
        from_name: data.name,
        from_email: data.email,
        institution: data.institution,
        role: data.role,
        message: data.message,
        to_email: 'doctiplay@gmail.com', // Optional if hardcoded in template
    };

    return emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        PUBLIC_KEY
    );
};

export interface ContactData {
    name: string;
    email: string;
    message: string;
}

export const sendContactEmail = (data: ContactData) => {
    const templateParams = {
        from_name: data.name,
        from_email: data.email,
        message: data.message,
        to_email: 'doctiplay@gmail.com',
        type: 'General Contact' // Helper for template to distinguish source
    };

    return emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        PUBLIC_KEY
    );
};
