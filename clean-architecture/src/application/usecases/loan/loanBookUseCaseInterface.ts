import { LoanBookRequestDto } from '../../dtos/loan/loanBookRequestDto';
import { LoanBookResponseDto } from '../../dtos/loan/loanBookResponseDto';

export interface LoanBookUseCaseInterface {
  execute(requestDto: LoanBookRequestDto): Promise<LoanBookResponseDto>;
}
