import { ApiProperty, PickType } from '@nestjs/swagger';
import { Users } from 'src/entities/Users';

//Picktype: 공통으로 선언한 부분을 재선언하지않고 그냥 가져와서 사용할 수 있음
// (비슷한거: omitTYpe, ParitalType .. )
export class JoinRequestDto extends PickType(Users, [
  'email',
  'nickname',
  'password',
] as const) {}
