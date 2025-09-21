import { ReturnBookRequestDto } from '../../dtos/loan/returnBookRequestDto';
import { ReturnBookResponseDto } from '../../dtos/loan/returnBookResponseDto';

export interface ReturnBookUseCaseInterface {
  execute(requestDto: ReturnBookRequestDto): Promise<ReturnBookResponseDto>;
}
