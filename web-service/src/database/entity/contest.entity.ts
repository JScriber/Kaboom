import { Entity, Column, ManyToOne, OneToMany, JoinColumn, Generated, OneToOne } from 'typeorm';

// Associated entities.
import { Participant } from '@entity/participant.entity';
import { Map } from '@entity/map.entity';
import { Bonus } from '@entity/alterations/bonus.entity';
import { Penalties } from '@entity/alterations/penalties.entity';

import { BaseEntity } from '@entity/base.entity';

import CONTRACT from './../contract/contest.contract';

/**
 * Concrete game where {@link Participant} can play.
 */
@Entity()
export class Contest extends BaseEntity {

  /** Unique identifier. */
  @Column({ name: CONTRACT.UUID })
  @Generated('uuid')
  uuid: string;

  /** Date at which the contest begins. */
  @Column('date', { name: CONTRACT.START_AT, nullable: true })
  startAt: Date;

  /** Date at which the contest ends. */
  @Column('date', { name: CONTRACT.END_AT, nullable: true })
  endAt: Date;

  /** Game duration. */
  @Column('smallint', { name: CONTRACT.DURATION, nullable: true })
  duration: number | undefined;

  /** Activated bonus for the contest. */
  @OneToOne(type => Bonus, {
    nullable: false,
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  bonus: Bonus;

  /** Activated penalties for the contest. */
  @OneToOne(type => Penalties, {
    nullable: false,
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  penalties: Penalties;

  /**
   * A contest must have an associated map.
   * It cannot exist without it.
   */
  @ManyToOne(type => Map, map => map.contests, {
    nullable: false
  })
  @JoinColumn({ name: CONTRACT.MAP })
  map: Map;

  /** A contest has many participants. */
  @OneToMany(type => Participant, participant => participant.contest, {
    nullable: true,
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  participants: Participant[];

  /** Limit of participants. */
  @Column('smallint', { name: CONTRACT.MAX_PARTICIPANTS })
  maxParticipants: number;
}
