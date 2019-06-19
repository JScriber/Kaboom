import { Injectable, Inject } from '@nestjs/common';
import { Connection, RedisManager } from 'orm-redis';
import { EntityType } from 'orm-redis/compiled/Persistence/RedisManager';

interface RedisEntity {
  /** Unique identifier. */
  id: number;
}

/**
 * Abstract base repository.
 * @template T - Type of the entity.
 */
@Injectable()
export abstract class BaseRedisRepository<T extends RedisEntity> {

  /** Redis manager access. */
  protected manager: RedisManager = this.connection.manager;

  /** Concrete type of the entity T. */
  protected abstract entityClass: EntityType<T>;

  /** Initial ID. */
  private idGenerator = 1;

  constructor(@Inject('REDIS_CONNECTION') private readonly connection: Connection) {}

  /**
   * Get one entity by its id.
   * @param {number} id
   */
  async getOne(id: number): Promise<T> {

    return this.manager.load(this.entityClass, id);
  }

  /**
   * Saves the given entity.
   * @param {T} entity
   */
  async save(entity: T): Promise<T> {

    if (!entity.id) {
      entity.id = this.generateID();
    }

    await this.manager.save(entity);

    return this.getOne(entity.id);
  }

  /**
   * Deletes the given entity.
   * @param entity 
   */
  async delete(entity: T) {

    return this.manager.removeById(this.entityClass, entity.id);
  }

  /**
   * Generates an ID.
   * @returns {number}
   */
  protected generateID(): number {
    return this.idGenerator ++;
  }
}
