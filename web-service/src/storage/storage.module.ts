import { Module } from '@nestjs/common';
import { WaitingStorageService } from './waiting-storage/waiting-storage.service';
import { ContestDAO } from './contest-dao/redis-contest-dao';
import { RedisConnectionService } from './redis-connection/redis-connection.service';

const PROVIDERS = [
  {
    provide: 'IWaitingStorage',
    useClass: WaitingStorageService
  }
];

@Module({
  providers: [
    ContestDAO,
    RedisConnectionService,

    ...PROVIDERS,
  ],
  exports: PROVIDERS
})
export class StorageModule {}
