import { Provider } from '@nestjs/common';

import { MigrateContestService } from './migrate-contest/migrate-contest.service';
import { GameTokenService } from "./game-token/game-token.service";
import { GameExecutorService } from './game-executor/game-executor.service';
import { GeneralGameLogicService } from './game-logic/general-game-logic/general-game-logic.service';
import { GameBattlefieldService } from './game-battlefield/game-battlefield.service';

export const GAME_SERVICES: Provider[] = [
  MigrateContestService,

  GameTokenService,
  GameBattlefieldService,
  GameExecutorService,
  {
    provide: 'IGameLogicService',
    useClass: GeneralGameLogicService
  }
];
