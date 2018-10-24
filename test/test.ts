import { delay } from '../src/core';
import { onEvent, Event, EventType } from '../src/subscribe';
// import { deleteEntity } from '../src/event-store';

onEvent({ entity: 'User', type: EventType.CREATED }, async (event: Event) => {
  global.console.log(`received event`, event.entity, event.type);
  await delay(10000);
  // await deleteEntity({ entity: event.entity, entityId: event.entityId });
});
