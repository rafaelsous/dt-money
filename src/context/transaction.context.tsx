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
  TotalTransactions,
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
  totalTransactions: TotalTransactions;
};

const TransactionContext = createContext<TransactionContextType>(
  {} as TransactionContextType
);

function TransactionContextProvider({ children }: Readonly<PropsWithChildren>) {
  const [categories, setCategories] = useState<TransactionCategory[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalTransactions, setTotalTransactions] = useState<TotalTransactions>(
    {
      revenue: 0,
      expense: 0,
      total: 0,
    }
  );

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
    setTotalTransactions(transationResponse.totalTransactions);
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        fetchCategories,
        createTransaction,
        fetchTransactions,
        categories,
        transactions,
        totalTransactions,
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
