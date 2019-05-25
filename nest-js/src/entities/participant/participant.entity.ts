import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, Generated } from "typeorm";
import { User } from '@entity/user/user.entity';
import { Contest } from '@entity/contest/contest.entity';

@Entity()
export class Participant {
  /** Auto-generated id. */
  @PrimaryGeneratedColumn()
  id: number;

  /** Unique identifier. */
  @Column()
  @Generated('uuid')
  uuid: string;

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

  /** User who participates. */
  @ManyToOne(type => User, user => user.participations, {
    nullable: true
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  /** A participant is a participant for only one contest. */
  @ManyToOne(type => Contest, contest => contest.participants, {
    nullable: true
  })
  @JoinColumn({ name: 'contest_id' })
  contest: Contest;
}
