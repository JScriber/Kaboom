import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Player } from '../player/player.entity';
import { Contest } from '../contest/contest.entity';

@Entity()
export class Map {
  /** Auto-generated id. */
  @PrimaryGeneratedColumn()
  id: number;

  /** Height of the map. */
  @Column('smallint')
  height: number;

  /** Width of the map. */
  @Column('smallint')
  width: number;

  /** Content (walls, etc). */
  @Column('simple-array')
  content: string[];

  /** A map has a owner (creator). */
  @ManyToOne(type => Player, player => player.maps, {
    nullable: true
  })
  owner: Player;

  /** A map can be used and reused in many contests. */
  @OneToMany(type => Contest, contest => contest.map, {
    nullable: true
  })
  contests: Contest[];
}
