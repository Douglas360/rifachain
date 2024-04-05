import { createGlobalState } from "react-hooks-global-state";
import { IGlobalState } from "../types/GlobalState";

const { setGlobalState, useGlobalState, getGlobalState } =
  createGlobalState<IGlobalState>({
    connectedAccount: "",
    connectedChain: "",
    alert: { show: false, msg: "", color: "" },
    loading: { show: false, msg: "" },
  });

const setAlert = (msg: string, color: "" | "red" | "green" = "green") => {
  setGlobalState("loading", { show: false, msg: "" });
  setGlobalState("alert", { show: true, msg, color });
  setTimeout(() => {
    setGlobalState("alert", { show: false, msg: "", color });
  }, 2000);
};

const truncateAddress = (
  address: string,
  startChars: number,
  endChars: number,
  maxLength: number
): string => {
  if (address.length > maxLength) {
    let start = address.substring(0, startChars);
    let end = address.substring(address.length - endChars, address.length);
    while (start.length + end.length < maxLength) {
      start = start + ".";
    }
    return start + end;
  }
  return address;
};

export {
  setGlobalState,
  useGlobalState,
  getGlobalState,
  truncateAddress,
  setAlert,
};
