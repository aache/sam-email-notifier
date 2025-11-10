import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const client = new SESClient({ region: "ap-south-1" }); // 👈 change to your SES region

export const handler = async (event) => {
  const to = process.env.EMAIL_TO;
  const from = process.env.EMAIL_FROM;

  const date = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  const params = {
    Destination: { ToAddresses: [to] },
    Message: {
      Body: {
        Text: { Data: `Good morning Aaqib!\n\nThis is your daily 10 AM reminder.\n\nTime: ${date}` },
      },
      Subject: { Data: "🌅 Daily 10 AM Notification" },
    },
    Source: from,
  };

  try {
    const result = await client.send(new SendEmailCommand(params));
    console.log("✅ Email sent:", result.MessageId);
    return { statusCode: 200, body: "Email sent successfully" };
  } catch (err) {
    console.error("❌ Error sending email:", err);
    return { statusCode: 500, body: "Failed to send email" };
  }
};