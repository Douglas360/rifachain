import React from "react";
import { useGlobalState } from "../../store";

interface LoadingProps {}

const Loading: React.FC<LoadingProps> = () => {
  const [loading] = useGlobalState("loading");

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen
      flex items-center justify-center bg-black 
      bg-opacity-50 transform transition-transform
      duration-300 ${loading.show ? "scale-100" : "scale-0"}`}
    >
      <div
        className="flex flex-col justify-center
        items-center bg-[#151c25] shadow-xl 
        shadow-[#e32970] rounded-xl 
        min-w-min px-10 pb-2"
      >
        <div className="flex flex-row justify-center items-center">
          <div className="lds-dual-ring scale-50"></div>
          <p className="text-lg text-white">Processando...</p>
        </div>
        <small className="text-white flex flex-row">
          {loading.msg}
          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-primary ml-1"></div>
        </small>
      </div>
    </div>
  );
};

export default Loading;
