export type Raffle = {
  id: number;
  title: string;
  status: string;
  totalTickets: number;
  ticketsSold: number;
  ticketPrice: number;
  drawDate: string;
  isFinished: boolean;
  progressWidth?: number;
};
