import { IsInt, IsNotEmpty,  IsNumber, IsNumberString } from 'class-validator';

class TransferDto {

  @IsNotEmpty()
  @IsNumberString()
  public amount: number;

  @IsNumber()
  @IsInt()
 public accountNumber: number;
}

export default TransferDto;
