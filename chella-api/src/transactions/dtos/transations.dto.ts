import { IsNumber, IsOptional, IsString, Max, Min } from "class-validator";

export class TransferDto{
 
   @IsString()
   recieverusername: string;
   @IsNumber()
   @Min(10, {message: "Min amount ot transfer is 10."})
   @Max(150, {message: "Max amount to transfer is 150"})
  amount: number
   
}