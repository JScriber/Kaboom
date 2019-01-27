import { GameService } from './game/game.service';
import { MutexService } from './mutex/mutex.service';
import { RedisService } from './redis/redis.service';

export const Services = [GameService, MutexService, RedisService];
