import { Injectable } from '@nestjs/common';
import { CommandBus, ICommand } from '@nestjs/cqrs';
import { SerializerService } from '../serializer/serializer.service';

import { Vector } from '../../model/physics/vector/vector';
import MovementCommand from '../../commands/commands/movement.command';

@Injectable()
export class GameService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly serializer: SerializerService
  ) {}

  /**
   * Moves the character.
   * @param {Vector} direction - Translation vector.
   * @param {number} speed - Velocity.
   */
  move(direction: Vector, speed: number): void {
    this.serializer.serialize(new MovementCommand(direction, speed));
  }
}
