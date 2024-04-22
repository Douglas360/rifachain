import { IAlertProps } from "./Alert";
import { User } from "./User";

export interface IGlobalState {
  connectedAccount: string;
  connectedChain: string;
  user: User;
  alert: IAlertProps;
  loading: { show: boolean; msg: string };
  showModal: string;
  raffles: any;
  transactions: any[];
}
