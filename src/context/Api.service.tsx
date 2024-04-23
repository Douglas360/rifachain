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

    setGlobalState("user", response.data);
    return response.data;
  } catch (error) {
    return error;
  }
};

const getUser = async (wallet: string) => {
  try {
    const response = await api.get(`/user/${wallet}`);

    setGlobalState("user", response.data);

    return response.data;
  } catch (error: any) {
    const errorMessage = error?.response.data;
    if (errorMessage === "User not found") {
      const response = await createUser({
        name: "User-?",
        wallet,
        avatar:
          "https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      });
      setGlobalState("user", response.data);
      return response.data;
    } else {
      console.log("Error: ", error);
    }
    return error;
  }
};

const updateUser = async (wallet: string, { name, avatar }: User) => {
  try {
    const response = await api.put(`/user/${wallet}`, {
      name,
      avatar,
    });

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

const createTransactionWinner = async (
  raffleId: number,
  raffleWinner: string,
  numberSelected: number
) => {
  try {
    const response = await api.post("/raffle", {
      raffleId,
      raffleWinner,
      numberSelected,
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export {
  createTransaction,
  getTransactions,
  createUser,
  getUser,
  updateUser,
  createTransactionWinner,
};
