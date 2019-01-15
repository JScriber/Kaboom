import { ModuleRef } from '@nestjs/core';
import { OnModuleInit, Module } from '@nestjs/common';
import { CommandBus, CQRSModule } from '@nestjs/cqrs';
import { CommandHandlers } from './commands/handlers';
import { GameWebsocket } from './controllers/game.websocket';
import { GameServices } from './services/index';

@Module({
  imports: [
    CQRSModule
  ],
  providers: [
    ...CommandHandlers,
    ...GameServices,
    GameWebsocket
  ]
})
export class GameModule implements OnModuleInit {
  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly command$: CommandBus
  ) {}

  onModuleInit() {
    this.command$.setModuleRef(this.moduleRef);
    this.command$.register(CommandHandlers);
  }
}
