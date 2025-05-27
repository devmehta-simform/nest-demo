import { IsBoolean, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  description: string;

  @IsBoolean()
  completed: boolean;
}
