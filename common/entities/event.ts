interface ContractEvent<T> {
  address: string;
  blockNumber: number;
  transactionHash: string;
  transactionIndex: number;
  blockHash: string;
  logIndex: number;
  id: number;
  returnValues: T;
  event: string;
  signature: string;
  raw: {
    data: string;
    topics: string[];
  };
}

export type { ContractEvent };
