import { Entity, PrimaryGeneratedColumn, Column, Generated, Unique, OneToMany, JoinColumn, CreateDateColumn } from "typeorm";
import { Map } from '../map/map.entity';
import { Participant } from '../participant/participant.entity';

@Entity()
export class Player {
  /** Auto-generated id in database. */
  @PrimaryGeneratedColumn()
  id: number;

  /** Unique identifier. */
  @Column()
  @Generated('uuid')
  uuid: string;

  /** Authentification token. */
  @Column('varchar', { length: 255, nullable: true })
  token: string;

  /** Date at which the user is created. */
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  /** A email address can be used only once. */
  @Column('varchar', { length: 255, unique: true })
  email: string;

  /** A user only has a username. No firstname nor lastname. */
  @Column('varchar', { length: 255, unique: true })
  username: string;

  /** Encrypted password. */
  @Column('varchar', { length: 255 })
  password: string;

  /** Each user has his own salt. */
  @Column('varchar', { length: 255 })
  salt: string;

  /** A player has many maps. */
  @OneToMany(type => Map, map => map.owner, {
    nullable: true
  })
  @JoinColumn()
  maps: Map[];

  /** A player has many involvements. */
  @OneToMany(type => Participant, participant => participant.player, {
    nullable: true
  })
  @JoinColumn()
  participations: Participant[];
}
