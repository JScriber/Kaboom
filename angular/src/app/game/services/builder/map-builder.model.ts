interface Properties<T> {
  // Fixed obstacle.
  fixedObstacle: T;
  fixedObstacleShadow: T;

  // Breakable obstacle.
  breakObstacle7: T;
  breakObstacle6: T;
  breakObstacle5: T;
  breakObstacle4: T;
  breakObstacle3: T;
  breakObstacle2: T;
  breakObstacle1: T;
  breakObstacleShadowed: T;
  breakObstacleShadow: T;
}

/** Indexes. */
export type IndexMatching = Properties<number>;

export const PropertyMatching: Properties<string> = {
  fixedObstacle        : 'fixed-obstacle',
  fixedObstacleShadow  : 'fixed-obstacle-shadow',
  breakObstacle7       : 'break-obstacle-7',
  breakObstacle6       : 'break-obstacle-6',
  breakObstacle5       : 'break-obstacle-5',
  breakObstacle4       : 'break-obstacle-4',
  breakObstacle3       : 'break-obstacle-3',
  breakObstacle2       : 'break-obstacle-2',
  breakObstacle1       : 'break-obstacle-1',
  breakObstacleShadowed: 'break-obstacle-7-shadowed',
  breakObstacleShadow  : 'break-obstacle-shadow'
};

export interface Coordinates {
  x: number;
  y: number;
}

export interface Dimensions {
  width: number;
  height: number;
}

export enum Data {
  Void = 0,
  // Obstacle that cannot be broken.
  FixedObstacle = 1,
  // Breakable obstacles (states)
  BreakObstacle1 = 2,
  BreakObstacle2 = 3,
  BreakObstacle3 = 4,
  BreakObstacle4 = 5,
  BreakObstacle5 = 6,
  BreakObstacle6 = 7,
  BreakObstacle7 = 8,
}

export type NumericMap = Data[][];
