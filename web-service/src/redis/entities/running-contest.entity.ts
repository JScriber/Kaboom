import { Entity, IdentifyProperty, RelationProperty } from 'orm-redis';

// Entities.
import { Player } from './player.entity';
import { Battlefield } from './battlefield.entity';

/**
 * Contest running. Aggregates all the data related to the game.
 */
@Entity()
export class RunningContest {

  /** Unique identifier. */
  @IdentifyProperty()
  id: number;

  /** Players of the contest. */
  @RelationProperty(type => [Player, Set], { cascadeInsert: true })
  players: Set<Player> = new Set();

  /** Battlefield. */
  @RelationProperty(type => Battlefield, { cascadeInsert: true, cascadeUpdate: true })
  battlefield: Battlefield;

  // TODO: Add bonus, penalties, etc, etc.
}
