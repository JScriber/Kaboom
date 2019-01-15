import { ICommand } from "@nestjs/cqrs";
import Game from "../model/game";

export interface CycleCommandHandler<T extends ICommand> {
  execute(context: Game, command: T, resolve: (value?) => void): Game;
}
