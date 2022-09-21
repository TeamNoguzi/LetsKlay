import caver, { RequestProvider } from "caver-js";

interface TransactionParams {
  gas?: string;
  to: string;
  from: string;
  value: string;
}

interface SendAsyncParams {
  method: string;
  params: TransactionParams[];
  from: string;
}

declare global {
  interface Window {
    klaytn: {
      enable: () => Promise<string[]>;
      selectedAddress: string;
      sendAsync: (param: SendAsyncParams, callback: () => void) => Promise<unknown>;
    };
    caver: caver;
  }
}
