export interface Player {
  name: string;
  stack: number[];
  stackAmount: number;
  hasPassedBidding: boolean;
  bid: number;
  winCount: number;
}
