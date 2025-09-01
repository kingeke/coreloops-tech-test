import { MoveSelectEntity } from '@coreloops/data-access-layer';
import { IsNumber, IsString, IsUUID } from 'class-validator';

export class ViewMovesDto {
  @IsUUID()
  id!: string;

  @IsString()
  name!: string;

  @IsNumber()
  accuracy!: number;

  @IsString()
  damageClass!: number;

  @IsNumber()
  power!: number;

  @IsNumber()
  pp!: number;

  @IsNumber()
  level!: number;

  constructor(entity: MoveSelectEntity) {
    if (entity) {
      Object.assign(this, entity);
    }
  }
}
