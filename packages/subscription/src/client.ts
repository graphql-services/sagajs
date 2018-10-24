import { Reader } from 'nsqjs';

import { getENV, log } from '@sagajs/core';
import { EventType, Event } from './event.model';

const reader = new Reader('es-event', 'saga', {
  lookupdHTTPAddresses: getENV('NSQ_URL', 'subscribe').split(','),
  maxAttempts: 5,
});

reader.on('error', err => {
  log(`NSQ error`, err);
});
reader.on('discard', msg => {
  log(`NSQ message discarded`, msg);
});
reader.on('nsqd_connected', () => {
  log(`NSQ connected`);
});
reader.on('nsqd_closed', () => {
  log(`NSQ closed`);
});
reader.connect();

export interface INSQOnEventConfig {
  entity: string;
  type?: EventType;
  filter?: {
    column?: string;
    value?: any;
  };
}

export const onEvent = (
  config: INSQOnEventConfig,
  handler: (event: Event) => Promise<any>,
) => {
  reader.on('message', async msg => {
    try {
      const event = JSON.parse(msg.body.toString()) as Event;
      if (shouldProcessEvent({ config, event })) {
        await handler(event);
      }
      msg.finish();
    } catch (e) {
      log(`failed to process event ${msg.body.toString()},error: ${e}`);
      msg.requeue(300);
    }
  });
};

const shouldProcessEvent = (props: {
  config: INSQOnEventConfig;
  event: Event;
}): boolean => {
  const { config, event } = props;
  if (
    config.entity !== event.entity ||
    (config.type && config.type !== event.type)
  ) {
    return false;
  }
  if (config.filter) {
    const { column, value } = config.filter;
    if (
      column &&
      (event.columns.indexOf(column) === -1 ||
        (value && event.data[column] !== value))
    ) {
      return false;
    }
  }
  return true;
};
