import { ICommand } from "@nestjs/cqrs";
import { Vector } from '../../model/physics/vector/vector';

/**
 * Makes the player move.
 */
export default class MovementCommand implements ICommand {
  constructor(
    public readonly direction: Vector,
    public readonly speed: number
  ) {}
}
