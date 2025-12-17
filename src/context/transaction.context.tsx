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

type FetchTransactionsParams = {
  page: number;
};

export type TransactionContextType = {
  fetchCategories: () => Promise<void>;
  createTransaction: (transaction: CreateTransactionDTO) => Promise<void>;
  fetchTransactions: (params: FetchTransactionsParams) => Promise<void>;
  updateTransaction: (transaction: UpdateTransactionDTO) => Promise<void>;
  categories: TransactionCategory[];
  transactions: Transaction[];
  totalTransactions: TotalTransactions;
  isLoading: boolean;
  refreshTransactions: () => Promise<void>;
  loadMoreTransactions: () => Promise<void>;
};

export type Pagination = {
  page: number;
  perPage: number;
  totalRows?: number;
  totalPages: number;
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
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    perPage: 15,
    totalRows: 0,
    totalPages: 0,
  });

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

  const refreshTransactions = useCallback(async () => {
    const { page, perPage } = pagination;

    setIsLoading(true);
    const transactionResponse = await getTransactions({
      page: 1,
      perPage: page * perPage,
    });

    setTransactions(transactionResponse.data);
    setTotalTransactions(transactionResponse.totalTransactions);
    setPagination({
      ...pagination,
      page,
      totalRows: transactionResponse.totalRows,
      totalPages: transactionResponse.totalPages,
    });
    setIsLoading(false);
  }, [pagination]);

  const fetchTransactions = useCallback(
    async ({ page = 1 }: FetchTransactionsParams) => {
      setIsLoading(true);

      const transactionResponse = await getTransactions({
        page,
        perPage: pagination.perPage,
      });

      if (page === 1) {
        setTransactions(transactionResponse.data);
      } else {
        setTransactions((prevState) => [
          ...prevState,
          ...transactionResponse.data,
        ]);
      }

      setTotalTransactions(transactionResponse.totalTransactions);
      setPagination({
        ...pagination,
        page,
        totalRows: transactionResponse.totalRows,
        totalPages: transactionResponse.totalPages,
      });
      setIsLoading(false);
    },
    [pagination]
  );

  const loadMoreTransactions = useCallback(async () => {
    if (isLoading || pagination.page >= pagination.totalPages) return;

    fetchTransactions({ page: pagination.page + 1 });
  }, [isLoading, pagination]);

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
        loadMoreTransactions,
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
