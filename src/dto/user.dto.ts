import { IsEmail, IsNotEmpty,  IsString, Length, } from 'class-validator';

class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  public firstName: string;

  @IsString()
  @IsNotEmpty()
  public lastName: string;

  @IsEmail()
  public email: string;

  @IsString()
  @Length(6, 25)
  public password: string;
}

export default CreateUserDto;
