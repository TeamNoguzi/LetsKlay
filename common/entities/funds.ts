import { Reward } from "./rewards";
import { User } from "./users";

interface Fund {
  id: number;
  hashId: string;
  amount: number;
  valid: boolean;
  user?: User;
  reward?: Reward;
  createdAt: Date;
  updatedAt: Date;
}

export { Fund };
