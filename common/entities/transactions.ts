import { Reward } from "./rewards";
import { User } from "./users";

interface Transaction {
  id: number;
  txId: number;
  user?: User;
  reward?: Reward;
  createdAt: Date;
  updatedAt: Date;
}

export { Transaction };
