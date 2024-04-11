export type Raffle = {
  id?: number;
  title: string;
  metadataURI?: string;
  status?: string;
  totalTickets: number;
  ticketsSold?: number;
  ticketPrice: string;
  ticketAvaible?: number;
  totalReward?: string;
  drawDate?: string;
  isFinished?: boolean;
  progressWidth?: number;
};
