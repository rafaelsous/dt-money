import { createContext, PropsWithChildren, useContext, useState } from "react";

import { getTransactionCategories } from "@/shared/services/dt-money/transaction.service";

export type TransactionCategory = {
  id: number;
  name: string;
};

export type TransactionContextType = {
  fetchCategories: () => Promise<void>;
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

  return (
    <TransactionContext.Provider
      value={{
        fetchCategories,
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
