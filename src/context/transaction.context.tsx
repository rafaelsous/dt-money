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
  changeTransaction,
  Transaction,
  TotalTransactions,
} from "@/shared/services/dt-money/transaction.service";

import { CreateTransactionDTO } from "@/components/NewTransaction";
import { UpdateTransactionDTO } from "@/components/EditTransaction";

export type TransactionCategory = {
  id: number;
  name: string;
};

export type TransactionContextType = {
  fetchCategories: () => Promise<void>;
  createTransaction: (transaction: CreateTransactionDTO) => Promise<void>;
  fetchTransactions: () => Promise<void>;
  updateTransaction: (transaction: UpdateTransactionDTO) => Promise<void>;
  categories: TransactionCategory[];
  transactions: Transaction[];
  totalTransactions: TotalTransactions;
  isLoading: boolean;
  refreshTransactions: () => Promise<void>;
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
  const [isLoading, setIsLoading] = useState(false);

  async function fetchCategories() {
    const response = await getTransactionCategories();

    setCategories(response);
  }

  async function createTransaction(transaction: CreateTransactionDTO) {
    await addTransaction(transaction);
    await fetchCategories();
    await refreshTransactions();
  }

  async function updateTransaction(transaction: UpdateTransactionDTO) {
    await changeTransaction(transaction);
    await refreshTransactions();
  }

  async function refreshTransactions() {
    console.log("Refreshing transactions...");
    setIsLoading(true);
    const transationResponse = await getTransactions({
      page: 1,
      perPage: 10,
    });

    setTransactions(transationResponse.data);
    setTotalTransactions(transationResponse.totalTransactions);
    setIsLoading(false);
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
        updateTransaction,
        categories,
        transactions,
        totalTransactions,
        isLoading,
        refreshTransactions,
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
