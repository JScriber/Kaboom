import { Injectable } from '@nestjs/common';

import { Player } from '@redis-entity/player.entity';

/**
 * Logic around the {@link Player} entity.
 * The service doesn't apply the changes.
 */
@Injectable()
export class GamePlayerService {

  /**
   * The given {@link Player} gets hurt by a {@link Bomb}.
   * @param player
   */
  hurt(player: Player) {
    // TODO: Control on the damages taken by the player.

    if (!this.isDead(player)) {

      player.hearts --;
  
      if (player.hearts <= 0) {
        player.lives --;
      }
    }

    console.log(`Player ${player.id} gets hurt.`);
  }

  /**
   * Says if the {@link Player} is dead.
   * @param {Player} player
   * @returns {boolean}
   */
  private isDead(player: Player): boolean {
    return player.lives <= 0;
  }
}
