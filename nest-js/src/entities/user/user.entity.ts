import { Entity, PrimaryGeneratedColumn, Column, Generated, OneToMany, JoinColumn, CreateDateColumn } from "typeorm";
import { Map } from '@entity/map/map.entity';
import { Participant } from '@entity/participant/participant.entity';

/** Supported languages. */
export enum Language {
  English = 'en',
  French = 'fr'
}

@Entity()
export class User {

  /** Auto-generated id in database. */
  @PrimaryGeneratedColumn()
  id: number;

  /** Unique identifier. */
  @Column()
  @Generated('uuid')
  uuid: string;

  /** Date at which the user is created. */
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  /** A email address can be used only once. */
  @Column('varchar', { length: 255, unique: true })
  email: string;

  /** A user has only a username. No firstname nor lastname. */
  @Column('varchar', { length: 255, unique: true })
  username: string;

  /** Language used by client. */
  @Column('varchar', { length: 3 })
  language: Language;

  /** Encrypted password. */
  @Column('varchar', { length: 255 })
  password: string;

  /** Each user has his own salt. */
  @Column('varchar', { length: 255 })
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
