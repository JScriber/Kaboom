import { Module } from '@nestjs/common';
import { WaitingStorageService } from './waiting-storage/waiting-storage.service';

const PROVIDERS = [
  {
    provide: 'IWaitingStorage',
    useClass: WaitingStorageService
  }
];

@Module({
  providers: PROVIDERS,
  exports: PROVIDERS
})
export class StorageModule {}
