import { IAlertProps } from "./Alert";

export interface IGlobalState {
  connectedAccount: string;
  connectedChain: string;
  alert: IAlertProps;
  loading: { show: boolean; msg: string };
  showModal: string;
  raffles: any;
  transactions: any[];
}
