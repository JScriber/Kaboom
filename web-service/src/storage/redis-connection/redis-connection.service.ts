import { Injectable } from '@nestjs/common';
import { Connection, createRedisConnection, RedisManager } from 'orm-redis';
import { environment } from '@environment';

@Injectable()
export class RedisConnectionService {

  connection: Connection;

  manager: RedisManager;

  constructor() {
    // this.createConnection();
  }

  private async createConnection() {
    this.connection = await createRedisConnection({
      host: environment.redis.host,
      port: environment.redis.port
    });

    this.manager = this.connection.manager;
  }
}
