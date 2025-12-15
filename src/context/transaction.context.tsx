import { createContext, PropsWithChildren, useContext, useState } from "react";

import {
  getTransactionCategories,
  addTransaction,
} from "@/shared/services/dt-money/transaction.service";
import { CreateTransactionDTO } from "@/components/NewTransaction";

export type TransactionCategory = {
  id: number;
  name: string;
};

export type TransactionContextType = {
  fetchCategories: () => Promise<void>;
  createTransaction: (transaction: CreateTransactionDTO) => Promise<void>;
  categories: TransactionCategory[];
};

const TransactionContext = createContext<TransactionContextType>(
  {} as TransactionContextType
);

function TransactionContextProvider({ children }: Readonly<PropsWithChildren>) {
  const [categories, setCategories] = useState<TransactionCategory[]>([]);

  async function fetchCategories() {
    const response = await getTransactionCategories();

    setCategories(response);
  }

  async function createTransaction(transaction: CreateTransactionDTO) {
    await addTransaction(transaction);
    await fetchCategories();
  }

  return (
    <TransactionContext.Provider
      value={{
        fetchCategories,
        createTransaction,
        categories,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

function useTransactionContext() {
  return useContext(TransactionContext);
}

export { TransactionContextProvider, useTransactionContext };
