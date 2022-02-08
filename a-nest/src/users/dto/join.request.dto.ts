import { ApiProperty } from '@nestjs/swagger';

export class JoinRequestDto {
  @ApiProperty({
    example: 'hlkim266@gmail.com',
    description: 'e-mail',
    required: true,
  })
  public email: string;

  @ApiProperty({
    example: '니니',
    description: '닉네임',
    required: true,
  })
  public nickname: string;

  @ApiProperty({
    example: 'helloworld',
    description: '비밀번호',
    required: true,
  })
  public password: string;
}