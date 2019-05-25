import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PlayerRepository} from './player/player.repository';
import {MapRepository} from "@repository/map/map.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            PlayerRepository,
            MapRepository
        ])
    ]
})
export class RepositoriesModule {
}
