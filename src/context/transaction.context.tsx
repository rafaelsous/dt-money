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

type Loadings = {
  initial: boolean;
  refresh: boolean;
  loadMore: boolean;
};

type HandleLoadingParams = {
  key: keyof Loadings;
  value: boolean;
};

export type TransactionContextType = {
  fetchCategories: () => Promise<void>;
  createTransaction: (transaction: CreateTransactionDTO) => Promise<void>;
  fetchTransactions: (params: FetchTransactionsParams) => Promise<void>;
  updateTransaction: (transaction: UpdateTransactionDTO) => Promise<void>;
  categories: TransactionCategory[];
  transactions: Transaction[];
  totalTransactions: TotalTransactions;
  loadings: Loadings;
  handleLoadings: (params: HandleLoadingParams) => void;
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
  const [loadings, setLoadings] = useState<Loadings>({
    initial: false,
    refresh: false,
    loadMore: false,
  });
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    perPage: 15,
    totalRows: 0,
    totalPages: 0,
  });

  function handleLoadings({ key, value }: HandleLoadingParams) {
    setLoadings((prevValue) => ({
      ...prevValue,
      [key]: value,
    }));
  }

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
  }, [pagination]);

  const fetchTransactions = useCallback(
    async ({ page = 1 }: FetchTransactionsParams) => {
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
    },
    [pagination]
  );

  const loadMoreTransactions = useCallback(async () => {
    if (loadings.loadMore || pagination.page >= pagination.totalPages) return;

    fetchTransactions({ page: pagination.page + 1 });
  }, [loadings.loadMore, pagination]);

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
        loadings,
        handleLoadings,
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
