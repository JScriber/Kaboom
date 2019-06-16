import { Injectable } from '@nestjs/common';

import { Entity, IdentifyProperty, Property, RelationProperty, createRedisConnection } from 'orm-redis';
import { environment } from '@environment';

@Entity()
class Participant {

  @IdentifyProperty()
  id: number;

  @Property()
  userId: number;

  @Property()
  confirmed: boolean;

  @Property()
  joinAt: Date;
}

@Entity()
class Contest {

  @IdentifyProperty()
  id: number;

  @Property()
  maxParticipants: number;

  @RelationProperty(type => [Participant, Set], { cascadeInsert: true })
  participants: Set<Participant> = new Set();

}


export interface IWaitingStorage {
  test();
}

@Injectable()
export class WaitingStorageService implements IWaitingStorage {

  async test() {

    const connection = await createRedisConnection({
      host: environment.redis.host,
      port: environment.redis.port
    });


    const contest = new Contest();
    contest.id = 1;
    contest.maxParticipants = 4;

    const p1 = new Participant();
    p1.confirmed = false;
    p1.id = 1;
    p1.joinAt = new Date();
    p1.userId = 1;

    contest.participants.add(p1);

    await connection.manager.save(contest);

    console.log(await connection.manager.load(Contest, 1));
  }
}
