import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

import { User } from '@entity/user.entity';
import { Contest } from '@entity/contest.entity';
import { BaseEntity } from '@entity/base.entity';

import CONTRACT from './../contract/map.contract';

/**
 * Map on which the {@link Participant} of a {@link Contest} can play on.
 */
@Entity()
export class Map extends BaseEntity {

  /** Name of the map. */
  @Column('varchar', { name: CONTRACT.NAME, length: 255 })
  name: string;

  /** Height of the map. */
  @Column('smallint', { name: CONTRACT.HEIGHT })
  height: number;

  /** Width of the map. */
  @Column('smallint', { name: CONTRACT.WIDTH })
  width: number;

  /** Content (walls, etc). */
  @Column('text', { name: CONTRACT.CONTENT, nullable: true })
  content: string;

  /** A map can have an owner (creator). Also it can be a system map. */
  @ManyToOne(type => User, owner => owner.maps, {
    nullable: true
  })
  @JoinColumn({ name: CONTRACT.OWNER })
  owner: User;

  /** A map can be used and reused in many contests. */
  @OneToMany(type => Contest, contest => contest.map, {
    nullable: true
  })
  contests: Contest[];
}
