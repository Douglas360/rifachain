export type Raffle = {
  id?: number;
  title: string;
  metadataURI?: string;
  totalTickets: number;
  ticketsSold?: number;
  ticketPrice: string;
  ticketAvaible?: number;
  totalReward?: string;
  drawDate?: string;
  isActive?: boolean;
  progressWidth?: number;
  winner?: string;
  isWithdrawn?: boolean;
  createdAt?: string;
};
