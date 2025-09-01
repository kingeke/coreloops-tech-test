import { IsString } from 'class-validator';

export class ViewMessageDto {
  @IsString()
  status!: string;

  @IsString()
  message!: string;
}
