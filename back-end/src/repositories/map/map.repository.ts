import { EntityRepository, Repository } from "typeorm";
import { Map } from '@entity/map/map.entity';

@EntityRepository(Map)
export class MapRepository extends Repository<Map> {

}
