import {
  EventSubscriber,
  EntitySubscriberInterface,
  Connection,
  InsertEvent,
} from 'typeorm';
import * as crypto from 'crypto';
import { Live, LiveStatus } from '../live.model';
import { bcrypt } from 'src/utils/bcrypt';

@EventSubscriber()
export class LivesSubscriber implements EntitySubscriberInterface<any> {
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Live;
  }

  async beforeInsert(event: InsertEvent<Live>) {
    const live = event.entity;
    live.slug = crypto.randomBytes(8).toString('hex');
    live.status = LiveStatus.PENDING;
    live.password = bcrypt(live.password);
  }
}
