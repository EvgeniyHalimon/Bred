import { SignUpResponseDto } from './dto';

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface ISingInResponse extends ITokens {
  user: SignUpResponseDto;
}
