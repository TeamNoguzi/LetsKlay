import { AbiItem } from "caver-js";

interface ContractParam {
  abi: AbiItem[];
  address: string;
}

const sendTransaction = async (
  { abi, address }: ContractParam,
  transaction: string,
  ...args: any[]
) => {
  const accounts = await window.klaytn.enable();
  const contract = new window.caver.klay.Contract(abi, address);

  return contract.send({ gas: 1000000, from: accounts[0] }, transaction, ...args);
};

const callTransaction = async (
  { abi, address }: ContractParam,
  transaction: string,
  ...args: any[]
) => {
  await window.klaytn.enable();
  const contract = new window.caver.klay.Contract(abi, address);

  return contract.call(transaction, ...args);
};

export { sendTransaction, callTransaction };
