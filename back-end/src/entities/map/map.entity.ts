import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  JoinColumn,
  Table
} from "typeorm";
import { Player } from '@entity/player/player.entity';
import { Contest } from '@entity/contest/contest.entity';

@Entity()
export class Map {

  /** Auto-generated id. */
  @PrimaryGeneratedColumn()
  id: number;

  /** Date at which the map is created. */
  @CreateDateColumn({ name: 'created_at', type: "date" })
  createdAt: Date;

  /** Name of the map. */
  @Column('varchar', { length: 255 })
  name: string;

  /** Height of the map. */
  @Column('smallint')
  height: number;

  /** Width of the map. */
  @Column('smallint')
  width: number;

  /** Content (walls, etc). */
  @Column('text', {
    nullable: true
  })
  content: string[];

  /** A map has a owner (creator). */
  @ManyToOne(type => Player, player => player.maps, {
    nullable: true
  })
  @JoinColumn({ name: 'player_id' })
  owner: Player;

  /** A map can be used and reused in many contests. */
  @OneToMany(type => Contest, contest => contest.map, {
    nullable: true
  })
  contests: Contest[];
}
