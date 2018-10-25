import { createTransport } from 'nodemailer';

import { getENV } from '@sagajs/core';

const SMTP_URL = getENV('SMTP_URL', 'smtp');
const transport = createTransport(SMTP_URL);

interface ISMTPSendMessageOptions {
  from: string;
  to: string[];
  cc?: string[];
  bcc?: string[];
  subject: string;
  htmlText?: string;
}

export const sendMail = async (options: ISMTPSendMessageOptions) => {
  return transport.sendMail(options);
};
