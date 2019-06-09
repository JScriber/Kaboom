import { Injectable } from '@nestjs/common';

import { ContestDAO } from '../contest-dao/redis-contest-dao';


export interface IWaitingStorage {
  
}

@Injectable()
export class WaitingStorageService implements IWaitingStorage {

  constructor(private readonly dao: ContestDAO) {}

  async test() {

  }
}
