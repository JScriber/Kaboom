import {Body, Controller, Delete, Get, Param, Post, Put, Query, Req/*, UseGuards*/} from '@nestjs/common';
import { ApiUseTags/*, ApiBearerAuth*/ } from '@nestjs/swagger';
// import {AuthGuard} from '@nestjs/passport';
// import {TokenService} from "@service/token/token.service";
import {MapRepository} from "@repository/map/map.repository";
import {InjectRepository} from '@nestjs/typeorm';

@ApiUseTags('Map')
@Controller('maps')
export class MapController {

    constructor(
        @InjectRepository(MapRepository)
        private readonly mapRepository: MapRepository,
    //    private readonly tokenService: TokenService
    ) {}

    // todo : handle Auth
    @Get()
    //@UseGuards(AuthGuard('bearer'))
    //@ApiBearerAuth()
    async findAll(){
        return this.mapRepository.find();
    }

    @Get(':id')
    //@UseGuards(AuthGuard('bearer'))
    //@ApiBearerAuth()
    async  findOne(@Param('id') id) {
        return this.mapRepository.findOne(id);
    }

    @Post(':id/delete')
    //@UseGuards(AuthGuard('bearer'))
    //@ApiBearerAuth()
    async delete(@Param('id') id) {
        return this.mapRepository.delete(id);
    }

    @Post('create')
    async create(@Body() body){
        const map = this.mapRepository.create(); // same as const user = new User();
        map.height = body.height;
        map.width = body.width;
        map.name = body.name;
        map.content = body.content;
        map.createdAt = new Date();
        await this.mapRepository.save(map);
    }

    @Post(':id/update')
    async update(@Body() body, @Param('id') id) {
        const map = await this.mapRepository.findOne(id); // same as const user = new User();
        map.height = body.height;
        map.width = body.width;
        map.name = body.name;
        map.content = body.content;
        map.createdAt = new Date();
        await this.mapRepository.save(map);
    }
}
