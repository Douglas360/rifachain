import { useEffect } from "react";

import { isWalletConnected } from "./Blockchain.services";
import { AppRouter } from "./routes";

const App = () => {
  useEffect(() => {
    const fetchData = async () => {
      await isWalletConnected();
    };

    fetchData();
  }, []);

  return <AppRouter />;
};

export default App;
