import { Reward } from "./rewards";
import { User } from "./users";
import { FundStatus } from "../enums";

interface Fund {
  id: number;
  hashId: string;
  amount: number;
  status: FundStatus;
  user?: User;
  reward?: Reward;
  createdAt: Date;
  updatedAt: Date;
}

export type { Fund };
