import { dtMoneyApi } from "@/api/dt-money";
import { TransactionCategory } from "@/context/transaction.context";

export async function getTransactionCategories(): Promise<
  TransactionCategory[]
> {
  const { data } = await dtMoneyApi.get<TransactionCategory[]>(
    "/transaction/categories"
  );

  return data;
}
