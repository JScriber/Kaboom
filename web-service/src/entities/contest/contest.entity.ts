import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, Generated } from "typeorm";
import { Map } from '@entity/map/map.entity';
import { Participant } from '@entity/participant/participant.entity';

@Entity()
export class Contest {
  /** Auto-generated id. */
  @PrimaryGeneratedColumn()
  id: number;

  /** Unique identifier. */
  @Column()
  @Generated('uuid')
  uuid: string;

  /** Date at which the contest has been created. */
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  /** Date at which the contest begins. */
  @Column('date', {
    name: 'start_date',
    nullable: true
  })
  startDate: Date;

  /** Date at which the contest ends. */
  @Column('date', {
    name: 'end_date',
    nullable: true
  })
  endDate: Date;

  /** Game duration. */
  @Column('smallint', { nullable: true })
  duration: number | undefined;

  /** Says if the bonus have been activated. */
  @Column('boolean')
  bonusActived: boolean;

  /** Says if the penalties are activated. */
  @Column('boolean')
  penaltiesActivated: boolean;

  /**
   * A contest must have an associated map.
   * It cannot exist without it.
   */
  @ManyToOne(type => Map, map => map.contests, {
    nullable: false
  })
  @JoinColumn()
  map: Map;

  /** A contest has many participants. */
  @OneToMany(type => Participant, participant => participant.contest, {
    nullable: true
  })
  @JoinColumn()
  participants: Participant[];

  /** Limit of participants. */
  @Column('smallint')
  maxParticipants: number;
}
