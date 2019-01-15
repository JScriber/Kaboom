import { ICommandHandler, CommandHandler } from "@nestjs/cqrs";
import MovementCommand from '../commands/movement.command';
import * as clc from 'cli-color';

@CommandHandler(MovementCommand)
export default class MovementHandler implements ICommandHandler<MovementCommand> {

  /**
   * Command handler.
   * @param {MovementCommand} command 
   * @param resolve 
   */
  async execute(command: MovementCommand, resolve: (value?) => void) {
    const { direction, speed } = command;

    console.log(clc.blue('Moving... ' + speed));

    resolve();
  }
}
