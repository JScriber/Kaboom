import { Entity, Column, ManyToOne, JoinColumn, Generated } from 'typeorm';

import { User } from '@entity/user.entity';
import { Contest } from '@entity/contest.entity';
import { BaseEntity } from '@entity/base.entity';

import CONTRACT from './../contract/participant.contract';

/**
 * Participation of a {@link User} in a {@link Contest}.
 * A participant can be the creator of the {@link Contest}.
 */
@Entity()
export class Participant extends BaseEntity {

  /** Unique identifier. */
  @Column({ name: CONTRACT.UUID })
  @Generated('uuid')
  uuid: string;

  /** Says if the participant is connected (via WS). */
  @Column({ name: CONTRACT.CONNECTED })
  connected: boolean;

  /** Says if the participant is the creator of the contest. */
  @Column({ name: CONTRACT.CREATOR })
  creator: boolean;

  /** User who participates. */
  @ManyToOne(type => User, user => user.participations, {
    nullable: true
  })
  @JoinColumn({ name: CONTRACT.USER })
  user: User;

  /** A participant is a participant for only one contest. */
  @ManyToOne(type => Contest, contest => contest.participants, {
    nullable: true
  })
  @JoinColumn({ name: CONTRACT.CONTEST })
  contest: Contest;
}
