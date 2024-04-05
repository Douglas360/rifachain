import React from "react";
import Layout from "../layout";

const Transaction: React.FC = () => {
  return (
    <Layout>
      <div className="flex flex-col mt-4 md:mt-0 md:ml-4 mx-auto w-4/5">
        <div>
          <h1>Transaction1</h1>
        </div>
        <div>
          <h1>Transaction2</h1>
        </div>
      </div>
    </Layout>
  );
};

export default Transaction;
