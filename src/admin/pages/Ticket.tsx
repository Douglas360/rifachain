import React from "react";
import Layout from "../layout";

const Ticket: React.FC = () => {
  return (
    <Layout>
      <div className="flex flex-col mt-4 md:mt-0 md:ml-4 mx-auto w-4/5">
        <div>
          <h1>Ticket1</h1>
        </div>
        <div>
          <h1>Ticket2</h1>
        </div>
      </div>
    </Layout>
  );
};

export default Ticket;
