// src/app.js  (CommonJS)
const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");

const client = new SESClient({ region: process.env.AWS_REGION || "ap-south-1" });

exports.handler = async (event) => {
  console.log("Triggered at", new Date().toISOString());
  const to = process.env.EMAIL_TO;
  const from = process.env.EMAIL_FROM;

  const date = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  const params = {
    Destination: { ToAddresses: [to] },
    Message: {
      Body: { Text: { Data: `Good morning Aaqib!\n\nThis is your daily test.\n\nTime: ${date}` } },
      Subject: { Data: "Daily 10 AM Notification (test)" },
    },
    Source: from,
  };

  try {
    const result = await client.send(new SendEmailCommand(params));
    console.log("Email sent, MessageId:", result.MessageId);
    return { statusCode: 200, body: "Email sent" };
  } catch (err) {
    console.error("Error sending email:", err);
    throw err;
  }
};