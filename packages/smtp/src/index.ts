import { createTransport } from 'nodemailer';

import { getENV } from '@sagajs/core';
import { MailOptions } from 'nodemailer/lib/sendmail-transport';

const SMTP_URL = getENV('SMTP_URL', 'smtp');
const transport = createTransport(SMTP_URL);

export const sendMail = async (options: MailOptions) => {
  return transport.sendMail(options);
};
