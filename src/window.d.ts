import caver from "caver-js";

declare global {
  interface Window {
    klaytn: {
      enable: () => Promise<void>;
      selectedAddress: string;
    };
    caver: caver;
  }
}
