import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";
import { Player } from '../player/player.entity';
import { Contest } from '../contest/contest.entity';

@Entity()
export class Participant {
  /** Auto-generated id. */
  @PrimaryGeneratedColumn()
  id: number;

  /** WS access token. */
  @Column('varchar', { length: 255 })
  token: string;

  /** Date at which the participant has been created. */
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  /** Says if the participant is the creator of the contest. */
  @Column()
  creator: boolean;

  /** Rank of the participant at the end of the game. */
  @Column('smallint', {
    nullable: true
  })
  rank: number;

  /** If the user left the game. */
  @Column('boolean', {
    nullable: true
  })
  abort: boolean;

  /** Player who participates. */
  @ManyToOne(type => Player, player => player.participations, {
    nullable: true
  })
  @JoinColumn()
  player: Player;

  /** A participant is a participant for only one contest. */
  @ManyToOne(type => Contest, contest => contest.participants, {
    nullable: true
  })
  @JoinColumn()
  contest: Contest;
}
