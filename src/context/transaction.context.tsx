import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";

import {
  getTransactionCategories,
  addTransaction,
  getTransactions,
  Transaction,
} from "@/shared/services/dt-money/transaction.service";

import { CreateTransactionDTO } from "@/components/NewTransaction";

export type TransactionCategory = {
  id: number;
  name: string;
};

export type TransactionContextType = {
  fetchCategories: () => Promise<void>;
  createTransaction: (transaction: CreateTransactionDTO) => Promise<void>;
  fetchTransactions: () => Promise<void>;
  categories: TransactionCategory[];
  transactions: Transaction[];
};

const TransactionContext = createContext<TransactionContextType>(
  {} as TransactionContextType
);

function TransactionContextProvider({ children }: Readonly<PropsWithChildren>) {
  const [categories, setCategories] = useState<TransactionCategory[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  async function fetchCategories() {
    const response = await getTransactionCategories();

    setCategories(response);
  }

  async function createTransaction(transaction: CreateTransactionDTO) {
    await addTransaction(transaction);
    await fetchCategories();
  }

  const fetchTransactions = useCallback(async () => {
    const transationResponse = await getTransactions({
      page: 1,
      perPage: 10,
    });

    setTransactions(transationResponse.data);
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        fetchCategories,
        createTransaction,
        fetchTransactions,
        categories,
        transactions,
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
