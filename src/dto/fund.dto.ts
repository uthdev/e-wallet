import { IsNotEmpty, IsNumberString,   IsString } from 'class-validator';

class FundAccountDto {

  @IsNotEmpty()
  @IsNumberString()
  public amount: number;



  @IsNumberString()
  public ussdCode: number;

  // @Matches(/^[0-9]*$/, {
  //   message: 'Please enter a valid card number string'
  // })
  // public cardNumber: string;
  
  // @IsNumber()
  // @IsInt()
  // @Min(1)
  // @Max(12)
  // public expiryMonth: number;

  // @IsNumber()
  // @IsInt()
  // @Min(new Date().getFullYear() - 1)
  // @Max(2099)
  // public expiryYear: number;
}

export default FundAccountDto;
