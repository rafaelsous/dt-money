import { dtMoneyApi } from "@/api/dt-money";
import { CreateTransactionDTO } from "@/components/NewTransaction";
import { TransactionCategory } from "@/context/transaction.context";

export async function getTransactionCategories(): Promise<
  TransactionCategory[]
> {
  const { data } = await dtMoneyApi.get<TransactionCategory[]>(
    "/transaction/categories"
  );

  return data;
}

export async function addTransaction(transaction: CreateTransactionDTO) {
  await dtMoneyApi.post("/transaction", transaction);
}
