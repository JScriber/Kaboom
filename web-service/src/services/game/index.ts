import { Provider } from '@nestjs/common';

import { MigrateContestService } from './migrate-contest/migrate-contest.service';
import { GameTokenService } from "./game-token/game-token.service";
import { GameExecutorService } from './game-executor/game-executor.service';
import { GameSchedulerService } from './game-scheduler/game-scheduler.service';
import { GeneralGameLogicService } from './game-logic/general-game-logic/general-game-logic.service';
import { GameBattlefieldService } from './game-battlefield/game-battlefield.service';
import { GamePlayerService } from './game-player/game-player.service';

// Components.
import { GameBombComponent } from './game-logic/components/game-bomb-component/game-bomb-component.service';

// Components logic dependencies.
import { GameBombBlastService } from './game-logic/components/game-bomb-component/game-bomb-blast/game-bomb-blast.service';

/** Logic components. */
const LOGIC_COMPONENTS = [
  GameBombComponent
];

/** Dependencies of logic components. */
const LOGIC_DEPENDENCIES = [
  GameBombBlastService
]

export const GAME_SERVICES: Provider[] = [
  MigrateContestService,

  GameBattlefieldService,
  GamePlayerService,

  GameTokenService,
  GameExecutorService,
  GameSchedulerService,
  {
    provide: 'IGameLogicService',
    useClass: GeneralGameLogicService
  },
  ... LOGIC_COMPONENTS,
  ... LOGIC_DEPENDENCIES
];
