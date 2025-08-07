// UPDATED: This controller now uses the Resend API to send the enquiry email.

const { Resend } = require('resend');
require('dotenv').config();

const resend = new Resend(process.env.RESEND_API_KEY);

// @desc    Handle service enquiry form submission
// @route   POST /api/services/enquiry
// @access  Public
exports.submitEnquiry = async (req, res) => {
    const { contactName, contactInfo, landscapingType, areaSize, otherInfo } = req.body;

    try {
        const { data, error } = await resend.emails.send({
            // IMPORTANT: This 'from' email MUST be from a domain you have verified in Resend.
            // Example: from: 'Bloom Store <enquiry@yourdomain.com>', 
            from: 'Bloom Store <onboarding@resend.dev>', // Default for testing
            to: ['bloomstorestartup03@gmail.com'],
            subject: 'New Landscaping Service Enquiry',
            html: `
                <h1>New Landscaping Service Enquiry</h1>
                <p><strong>Contact Name:</strong> ${contactName}</p>
                <p><strong>Contact Info (Phone/Email):</strong> ${contactInfo}</p>
                <p><strong>Type of Landscaping:</strong> ${landscapingType}</p>
                <p><strong>Approximate Area Size:</strong> ${areaSize}</p>
                <p><strong>Other Information:</strong></p>
                <p>${otherInfo || 'None provided.'}</p>
            `,
        });

        if (error) {
            console.error({ error });
            return res.status(400).json({ message: "Failed to send enquiry.", error });
        }

        res.status(200).json({ message: "Enquiry sent successfully!", data });

    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: "Failed to send enquiry. Please try again later." });
    }
};