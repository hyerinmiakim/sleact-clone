import { ApiProperty } from '@nestjs/swagger';
import { JoinRequestDto } from 'src/users/dto/join.request.dto';

//사용자 DTO : 범용적으로 사용할 DTO
export class UserDto extends JoinRequestDto{
  @ApiProperty({
    required: true,
    example: 1,
    description: '아이디',
  })
  id: number;
}