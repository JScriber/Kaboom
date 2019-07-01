import { Direction } from "./direction.model";

export interface Vector {
  x: number;
  y: number;
}

/**
 * Converts a direction into a {@link Vector}.
 * @param {Direction} direction
 * @returns {Vector}
 */
export const directionToVector = (direction: Direction): Vector => {
  let vector: Vector = { x: 0, y: 0 };

  switch (direction) {
    case Direction.Left:
      vector = { x: -1, y: 0 };
      break;

    case Direction.Right:
      vector = { x: 1, y: 0 };
      break;

    case Direction.Up:
      vector = { x: 0, y: -1 };
      break;

    case Direction.Down:
      vector = { x: 0, y: 1 };
      break;
  }

  return vector;
}
