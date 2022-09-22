import { Reward } from "./rewards";
import { User } from "./users";

interface Transaction {
  id: number;
  amount: number;
  user?: User;
  reward?: Reward;
  createdAt: Date;
  updatedAt: Date;
}

export { Transaction };
