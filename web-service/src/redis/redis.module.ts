import { Module, Provider } from '@nestjs/common';
import { createRedisConnection } from 'orm-redis';
import { environment } from '@environment';

// Repositories.
import { RunningContestRepository } from './services/repositories/running-contest-repository/running-contest.repository';
import { PlayerRepository } from './services/repositories/player-repository/player.repository';
import { BattlefieldRepository } from './services/repositories/battlefield-repository/battlefield.repository';

/** Redis repositories. */
const REPOSITORIES: Provider[] = [
  RunningContestRepository,
  PlayerRepository,
  BattlefieldRepository
];

@Module({
  providers: [
    {
      provide: 'REDIS_CONNECTION',
      useFactory: async () => await createRedisConnection({
        host: environment.redis.host || '127.0.0.1',
        port: environment.redis.port || 6379
      })
    },
    ... REPOSITORIES
  ],
  exports: REPOSITORIES
})
export class RedisModule {}
