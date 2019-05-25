import {
    BadRequestException,
    Body,
    Controller, Delete,
    Get,
    HttpStatus,
    NotFoundException,
    Param,
    Post, Put,
    Req,
    Res,
    UseGuards, ValidationPipe
} from '@nestjs/common';
import {ApiUseTags, ApiBearerAuth} from '@nestjs/swagger';
import {MapRepository} from "@repository/map/map.repository";
import {InjectRepository} from '@nestjs/typeorm';
import {AuthGuard} from '@nestjs/passport';
import {maxCreatedMaps} from "@environment";
import {CreateMap} from "@dto/map/create-map.dto";

@ApiUseTags('Map')
@Controller('maps')
export class MapController {

    constructor(
        @InjectRepository(MapRepository)
        private readonly mapRepository: MapRepository) {
    }

    @Get()
    @UseGuards(AuthGuard('bearer'))
    @ApiBearerAuth()
    async findAll(@Req() req) {
        return await this.mapRepository.find({
            where: {owner: req.user}
        });
    }

    @Get(':id')
    @UseGuards(AuthGuard('bearer'))
    @ApiBearerAuth()
    async findOne(@Req() req, @Param('id') id) {
        try {
            return await this.mapRepository.findOneOrFail(id, {
                where: {owner: req.user}
            });
        } catch (e) {
            throw new NotFoundException();
        }
    }

    @Delete(':id')
    @UseGuards(AuthGuard('bearer'))
    @ApiBearerAuth()
    async delete(@Req() req, @Param('id') id) {
        try {
            // delete is authorized only if the current player is the owner of the map
            const map = await this.mapRepository.findOneOrFail(id, {
                where: {owner: req.user}
            });
            return this.mapRepository.delete(map);
        } catch (e) {
            throw new NotFoundException();
        }
    }

    @Post('create')
    @UseGuards(AuthGuard('bearer'))
    @ApiBearerAuth()
    async create(@Req() req, @Body(new ValidationPipe()) mapDTO: CreateMap) {
        try {
            const maps = await this.findAll(req);
            if (maps.length <= maxCreatedMaps) {
                const map = this.mapRepository.create(); // same as const user = new User();
                map.height = mapDTO.height;
                map.width = mapDTO.width;
                map.name = mapDTO.name;
                map.content = mapDTO.content;
                map.createdAt = new Date();
                map.owner = req.user;
                await this.mapRepository.save(map);
            }
        } catch (e) {
            throw new BadRequestException("You've reached the maximum number of created maps")
        }
    }

    @Put(':id')
    @UseGuards(AuthGuard('bearer'))
    @ApiBearerAuth()
    async update(@Res() res, @Req() req, @Body(new ValidationPipe()) mapDto: CreateMap, @Param('id') id) {
        try {
            // update is authorized only if the current user is the owner of the map
            const map = await this.mapRepository.findOneOrFail(id, {
                where: {owner: req.user}
            });
            map.height = mapDto.height;
            map.width = mapDto.width;
            map.name = mapDto.name;
            map.content = mapDto.content;
            map.createdAt = new Date();
            this.mapRepository.save(map).then(() => {
                res.status(HttpStatus.OK).send("OK");
            });
        } catch (e) {
            throw new NotFoundException();
        }
    }
}
