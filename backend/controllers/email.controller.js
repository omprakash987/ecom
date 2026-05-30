import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const key = process.env.RESENDKEY;

if (!key) {
  throw new Error("Resend API key missing");
}

const resend = new Resend(key);

const recipient = process.env.RECEIPENTEMAIL;


export const sendEmail = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      city,
      plan,
      message,
    } = req.body;

    if (
      !name ||
      !email ||
      !phone ||
      !city ||
      !plan
    ) {
      return res.status(400).json({
        error: "Please fill all required fields",
      });
    }

    const response = await resend.emails.send({
      from:"MUSCLEUP24X7 <support@muscleup24x7.com>",
      to: recipient,
      subject: `🚀 New Franchise Application - ${name}`,

      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h2 style="color:#f5a623;">
            New Franchise Application Received
          </h2>

          <table style="border-collapse: collapse; width:100%;">
            <tr>
              <td style="padding:8px; border:1px solid #ddd;"><strong>Name</strong></td>
              <td style="padding:8px; border:1px solid #ddd;">${name}</td>
            </tr>

            <tr>
              <td style="padding:8px; border:1px solid #ddd;"><strong>Email</strong></td>
              <td style="padding:8px; border:1px solid #ddd;">${email}</td>
            </tr>

            <tr>
              <td style="padding:8px; border:1px solid #ddd;"><strong>Phone</strong></td>
              <td style="padding:8px; border:1px solid #ddd;">${phone}</td>
            </tr>

            <tr>
              <td style="padding:8px; border:1px solid #ddd;"><strong>City</strong></td>
              <td style="padding:8px; border:1px solid #ddd;">${city}</td>
            </tr>

            <tr>
              <td style="padding:8px; border:1px solid #ddd;"><strong>Preferred Plan</strong></td>
              <td style="padding:8px; border:1px solid #ddd;">${plan}</td>
            </tr>

            <tr>
              <td style="padding:8px; border:1px solid #ddd;"><strong>Message</strong></td>
              <td style="padding:8px; border:1px solid #ddd;">
                ${message || "No message provided"}
              </td>
            </tr>
          </table>

          <br/>

          <p>
            Please contact the applicant within 24 hours.
          </p>
        </div>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Franchise application submitted successfully",
      response,
    });
  } catch (error) {
    console.error("Send Email Error:", error);

    return res.status(500).json({
      success: false,
      error: "Failed to send email",
    });
  }
};