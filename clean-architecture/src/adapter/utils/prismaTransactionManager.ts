import { PrismaClient } from "../../generated/prisma";
import { TransactionManagerInterface } from "../../application/utils/transactionManagerInterface";
import { TransactionContextInterface } from "../../domain/utils/transactionContextInterface";

export class PrismaTransactionManager implements TransactionManagerInterface {
  constructor(private readonly prisma: PrismaClient) {}

  async run<T>(
    operation: (ctx: TransactionContextInterface) => Promise<T>
  ): Promise<T> {
    return await this.prisma.$transaction(
      async (ctx) => await operation(ctx),
      { timeout: 10000 } // 10秒に延長
    );
  }
}
