import { Entity, Column, Generated, OneToMany, JoinColumn } from 'typeorm';

import { Map } from '@entity/map.entity';
import { Participant } from '@entity/participant.entity';
import { BaseEntity } from '@entity/base.entity';

import CONTRACT from './../contract/user.contract';

/** Supported languages. */
export enum Language {
  English = 'en',
  French = 'fr'
}

/**
 * User of the application.
 */
@Entity()
export class User extends BaseEntity {

  /** Unique identifier. */
  @Column({ name: CONTRACT.UUID })
  @Generated('uuid')
  uuid: string;

  /** A email address can be used only once. */
  @Column('varchar', { name: CONTRACT.EMAIL, length: 255, unique: true })
  email: string;

  /** A user has only a username. No firstname nor lastname. */
  @Column('varchar', { name: CONTRACT.USERNAME, length: 255, unique: true })
  username: string;

  /** Language used by client. */
  @Column('varchar', { name: CONTRACT.LANGUAGE, length: 3 })
  language: Language;

  /** Encrypted password. */
  @Column('varchar', { name: CONTRACT.PASSWORD, length: 255 })
  password: string;

  /** Each user has his own salt. */
  @Column('varchar', { name: CONTRACT.SALT, length: 255 })
  salt: string;

  /** A user has many maps. */
  @OneToMany(type => Map, map => map.owner, {
    nullable: true
  })
  @JoinColumn()
  maps: Map[];

  /** A user has many involvements. */
  @OneToMany(type => Participant, participant => participant.user, {
    nullable: true
  })
  @JoinColumn()
  participations: Participant[];
}
