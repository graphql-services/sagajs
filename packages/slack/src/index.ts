import 'cross-fetch/polyfill';

import { getENV } from '@sagajs/core';

const SLACK_URL = getENV('SLACK_URL', 'slack');

interface ISlackSendWebhookOptions {
  channel?: string;
  text?: string;
  username?: string;
  icon_url?: string;
  icon_emoji?: string;
  link_names?: string;
  //   Attachments []Attachment `json:"attachments,omitempty"`
  unfurl_links?: boolean;
  unfurl_media?: boolean;
  mrkdwn?: boolean;
}

export const sendWebhook = async (options: ISlackSendWebhookOptions) => {
  const res = await fetch(SLACK_URL, {
    method: 'POST',
    body: JSON.stringify(options),
    headers: { 'content-type': 'application/json' },
  });
  if (res.status >= 400) {
    const text = res.text();
    throw new Error(`failed to post to slack, response: ${text}`);
  }
  return res;
};
