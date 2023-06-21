import { sendMail } from './email.service.js';
import { welcomeMailTemplate } from '../../../templates/welcome.js';

export const sendMailWelcome = async (req, res) => {
  try {
    const { name, to, subject } = req.body;

    const html = welcomeMailTemplate({ name });
    const result = await sendMail({
      html,
      subject,
      to,
    });

    return res.json({ data: result });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
