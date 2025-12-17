import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
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

import { useAuthContext } from "./auth.context";

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
  clearTransactionContext: () => void;
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

const TOTAL_TRANSACTIONS_DEFAULT_VALUES = {
  revenue: 0,
  expense: 0,
  total: 0,
};

const LOADINGS_DEFAULT_VALUES = {
  initial: false,
  refresh: false,
  loadMore: false,
};

const PAGINATION_DEFAULT_VALUES = {
  page: 1,
  perPage: 15,
  totalRows: 0,
  totalPages: 0,
};

function TransactionContextProvider({ children }: Readonly<PropsWithChildren>) {
  const [categories, setCategories] = useState<TransactionCategory[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalTransactions, setTotalTransactions] = useState<TotalTransactions>(
    TOTAL_TRANSACTIONS_DEFAULT_VALUES
  );
  const [loadings, setLoadings] = useState<Loadings>(LOADINGS_DEFAULT_VALUES);
  const [pagination, setPagination] = useState<Pagination>(
    PAGINATION_DEFAULT_VALUES
  );

  const { user } = useAuthContext();

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

  function clearTransactionContext() {
    setCategories([]);
    setTransactions([]);
    setTotalTransactions(TOTAL_TRANSACTIONS_DEFAULT_VALUES);
    setPagination(PAGINATION_DEFAULT_VALUES);
    setLoadings({
      ...LOADINGS_DEFAULT_VALUES,
      initial: true,
    });
  }

  useEffect(() => {
    clearTransactionContext();
  }, [user?.id]);

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
        clearTransactionContext,
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
