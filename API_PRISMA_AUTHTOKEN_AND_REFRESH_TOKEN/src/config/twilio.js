import client from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromPhone = process.env.TWILIO_PHONE;

export const twilioConfig = async ({ phone, message }) => {
  try {
    const result = await client(accountSid, authToken).messages.create({
      body: message,
      to: phone,
      from: fromPhone,
    });

    return {
      status: result.status,
      id: result.sid,
    };
  } catch (error) {
    throw new Error('Error send SMS with TWILIO');
  }
};
