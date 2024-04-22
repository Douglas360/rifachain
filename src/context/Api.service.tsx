import { api } from "../services/api";
import { setGlobalState } from "../store";
import { Transaction } from "../types/Transaction";
import { User } from "../types/User";

const createUser = async ({ name, wallet, avatar }: User) => {
  try {
    const response = await api.post("/user", {
      name,
      wallet,
      avatar,
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

const getUser = async (wallet: string) => {
  try {
    const response = await api.get(`/user/${wallet}`);

    return response.data;
  } catch (error) {
    return error;
  }
};

const createTransaction = async ({
  sender,
  tx,
  amount,
  date,
  raffleId,
  typeTransaction,
}: Transaction) => {
  try {
    const response = await api.post("/transaction", {
      sender,
      tx,
      amount,
      date,
      raffleId,
      typeTransaction,
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

const getTransactions = async (raffleId: number) => {
  try {
    const response = await api.get(`/transaction/${raffleId}`);

    const structedTransactions = response.data.map(
      (transaction: Transaction) => ({
        id: transaction._id,
        sender: transaction.sender,
        tx: transaction.tx,
        amount: transaction.amount,
        //show date in format dd/mm/yyyy hh:mm
        date: new Date(transaction.date).toLocaleString(),
        raffleId: raffleId,
        typeTransaction: "buy",
      })
    ) as Transaction[];
    setGlobalState("transactions", structedTransactions);
    return structedTransactions;
  } catch (error) {
    return error;
  }
};

export { createTransaction, getTransactions, createUser, getUser };
