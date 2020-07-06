import { IsString, IsDateString } from 'class-validator';

class TakstDto {
    @IsString()
    public owner: string;

    @IsString()
    public name: string;

    @IsString()
    public priority: string;

    @IsDateString()
    public dueDate: Date;
}

export default TakstDto;