import { Module } from '@nestjs/common';
import { WaitingStorageService } from './waiting-storage/waiting-storage.service';
import { ContestDAO } from './contest-dao/redis-contest-dao';

const PROVIDERS = [
  {
    provide: 'IWaitingStorage',
    useClass: WaitingStorageService
  }
];
  

@Module({
  providers: [
    ContestDAO,

    ...PROVIDERS
  ],
  exports: PROVIDERS
})
export class StorageModule {}
