import { ICommand, CommandHandlerNotFoundException } from '@nestjs/cqrs';

import { AbstractCommandBus } from './abstract-command-bus';
import { CycleCommandHandler } from './game-cycle-handler';
import Game from '../model/game';

/**
 * Specialize the bus for the game.
 */
export default class CycleBus extends AbstractCommandBus<CycleCommandHandler<ICommand>> {

  /** State of the game. */
  private state: Game;

  /** 
   * Execute method.
   * @template T
   * @param {T} command
   * @returns {Promise<T>}
   */
  execute<T extends ICommand>(command: T): Promise<any> {
    const handler = this.handlers.get(this.getCommandName(command));

    if (!handler) {
      throw new CommandHandlerNotFoundException();
    }

    this.subject$.next(command);
    return new Promise(resolve => {
      this.state = handler.execute(this.state, command, resolve);
    });
  }

  init(): void {
    // TODO: Init game state.

    // TODO: Gen real id.
    const id: string = '10';

    const player = {
      id: 10,
      uuid: 'sqdfdsf',
      position: {
        x: 1,
        y: 1
      },
      items: []
    };

    this.state = {
      id: parseInt(id),
      range: {  
        start: new Date(),
        end: new Date()
      },
      players: [player],
      owner: player,
      map: {
        dimensions: {
          width: 50,
          height: 50
        },
        slots: []
      },
      bonus: {
        wallPass: true,
        teleportation: true,
        fireSuit: true,
        bombUp: true,
        speedUp: true,
        yellowFlame: true,
        redFlame: true,
        bombDisarmer: true,
        powerGlove: true,
        push: true,
        heart: false,
        lifeUp: false,
        swapPositions: true
      },
      penalty: {
        bombDown: false,
        speedDown: false,
        blueFlame: false,
        invert: false
      }
    }
  }
}
