import React from "react";
import { useGlobalState, setGlobalState } from "../../store";
import Button from "./Button";
import { FaTimes } from "react-icons/fa";

const ShowRaffle = () => {
  const [showModal] = useGlobalState("showModal");
  //const [raffle] = useGlobalState("raffle");
  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center
          justify-center bg-black bg-opacity-50 transform
          transition-transform duration-300 ${showModal}`}
    >
      <div className="bg-[#151c25] shadow-xl shadow-[#e32970] rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
        <div className="flex flex-col">
          {/* HEADER */}
          <div className="flex flex-row justify-between items-center">
            <p className="font-semibold text-gray-3">Rifa</p>
            <Button
              type="button"
              onClick={() => setGlobalState("showModal", "scale-0")}
              className="border-0 bg-transparent focus:outline-none text-white"
              text=""
              icon={<FaTimes />}
            >
              <FaTimes />
            </Button>
          </div>

          {/* BODY */}
          <div className="flex flex-row justify-center items-center rounded-xl mt-5">
            <div className="shrink-0 rounded-xl overflow-hidden h-40 w-40">
              <span className="text-white">Criar componente</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowRaffle;
