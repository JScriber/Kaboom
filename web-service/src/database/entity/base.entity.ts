import { PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import CONTRACT from './../contract/base.contract';

/**
 * Base entity class.
 * All entities must inherit from this class.
 */
export abstract class BaseEntity {

  /** Auto-generated ID. */
  @PrimaryGeneratedColumn({ name: CONTRACT.ID })
  id: number;

  /** Date at which the entity is persisted. */
  @CreateDateColumn({ name: CONTRACT.CREATED_AT, type: 'date' })
  createdAt: Date;
}
