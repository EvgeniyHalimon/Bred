import { SignUpResponseDto } from './dto';

export interface ISingInResponse {
  user: SignUpResponseDto;
  accessToken: string;
  refreshToken: string;
}
