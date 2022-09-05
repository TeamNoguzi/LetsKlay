import { Project } from "./projects";

interface RewardItem {
  id: number;
  reward?: Reward;
  name: string;
  quantity: number;
}

interface Reward {
  id: number;
  project?: Project;
  items?: RewardItem[];
  price: number;
  title: string;
  description: string;
  deliveryStart: Date;
  deliveryEnd: Date;
  maxStock: number;
  stock: number;
}

export type { Reward, RewardItem };
