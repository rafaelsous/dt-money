import qs from "qs";

import { dayjs } from "@/lib/dayjs";

import { dtMoneyApi } from "@/api/dt-money";

import { CreateTransactionDTO } from "@/components/NewTransaction";
import { TransactionCategory } from "@/context/transaction.context";
import { UpdateTransactionDTO } from "@/components/EditTransaction";

export type GetTransactionParams = {
  page: number;
  perPage: number;
  from?: Date;
  to?: Date;
  typeId?: number;
  categoryIds?: number[];
  searchText?: string;
};

export type Transaction = {
  id: number;
  value: number;
  description: string;
  categoryId: number;
  typeId: number;
  type: {
    id: number;
    name: string;
  };
  category: {
    id: number;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

export type TotalTransactions = {
  revenue: number;
  expense: number;
  total: number;
};

export type GetTransactionResponse = {
  data: Transaction[];
  totalRows: number;
  totalPages: number;
  page: number;
  perPage: number;
  totalTransactions: TotalTransactions;
};

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

export async function getTransactions(
  params: GetTransactionParams
): Promise<GetTransactionResponse> {
  const { from, to } = params;

  const truncatedFrom = dayjs(from).toDate();
  const truncatedTo = dayjs(to).toDate();

  params = {
    ...params,
    from: truncatedFrom,
    to: truncatedTo,
  };

  const { data } = await dtMoneyApi.get<GetTransactionResponse>(
    "/transaction",
    {
      params,
      paramsSerializer: (p) => qs.stringify(p, { arrayFormat: "repeat" }),
    }
  );

  return data;
}

export async function removeTransaction(transactionId: number): Promise<void> {
  await dtMoneyApi.delete(`/transaction/${transactionId}`);
}

export async function changeTransaction(transaction: UpdateTransactionDTO) {
  await dtMoneyApi.put("/transaction", transaction);
}
