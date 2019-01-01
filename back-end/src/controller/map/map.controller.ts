import {
    BadRequestException,
    Body,
    Controller,
    Get,
    HttpStatus,
    NotFoundException,
    Param,
    Post,
    Req,
    Res,
    UseGuards
} from '@nestjs/common';
import {ApiUseTags, ApiBearerAuth} from '@nestjs/swagger';
import {MapRepository} from "@repository/map/map.repository";
import {InjectRepository} from '@nestjs/typeorm';
import {AuthGuard} from '@nestjs/passport';
import {maxCreatedMaps} from "@environment";

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
        const maps = await this.mapRepository.find({
            where: {owner: req.player}
        });
        if (maps !== undefined) {
            console.log("maps1 : " + maps)
            return maps;
        } else {
            throw new NotFoundException();
        }
    }

    @Get(':id')
    @UseGuards(AuthGuard('bearer'))
    @ApiBearerAuth()
    async findOne(@Req() req, @Param('id') id) {
        const map = await this.mapRepository.findOne(id, {
            where: {owner: req.player}
        });
        if (map !== undefined) {
            return map;
        } else {
            throw new NotFoundException();
        }

    }

    @Post(':id/delete')
    @UseGuards(AuthGuard('bearer'))
    @ApiBearerAuth()
    async delete(@Req() req, @Param('id') id) {
        // delete is authorized only if the current player is the owner of the map
        const map = await this.mapRepository.findOne(id, {
            where: {owner: req.player}
        });

        if (map !== undefined) {
            return this.mapRepository.delete(id);
        } else {
            throw new NotFoundException();
        }
    }

    @Post('create')
    @UseGuards(AuthGuard('bearer'))
    @ApiBearerAuth()
    async create(@Req() req, @Body() body) {
        const maps = await this.findAll(req);
        if (maps.length <= maxCreatedMaps) {
            const map = this.mapRepository.create(); // same as const user = new User();
            map.height = body.height;
            map.width = body.width;
            map.name = body.name;
            map.content = body.content;
            map.createdAt = new Date();
            map.owner = req.player;
            await this.mapRepository.save(map);
        } else {
            // todo : handle message with the front ?
            throw new BadRequestException("Vous ne pouvez pas créer de carte supplémentaire")
        }
    }

    @Post(':id/update')
    @UseGuards(AuthGuard('bearer'))
    @ApiBearerAuth()
    async update(@Res() res, @Req() req, @Body() body, @Param('id') id) {
        // update is authorized only if the current player is the owner of the map
        const map = await this.mapRepository.findOne(id, {
            where: {owner: req.player}
        });

        if (map !== undefined) {
            map.height = body.height;
            map.width = body.width;
            map.name = body.name;
            map.content = body.content;
            map.createdAt = new Date();
            this.mapRepository.save(map).then(() => {
                res.status(HttpStatus.OK).send("OK");
            });
        } else {
            throw new NotFoundException();
        }

    }
}
