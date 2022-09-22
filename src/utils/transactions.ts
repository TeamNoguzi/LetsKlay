import { AbiItem } from "caver-js";

interface TransactionParam {
  abi: AbiItem[];
  address: string;
  method: string;
}

interface SendTransactionParam extends TransactionParam {
  value?: number;
}

const sendTransaction = async (
  { abi, address, method, value }: SendTransactionParam,
  ...args: any[]
) => {
  try {
    const accounts = await window.klaytn.enable();
    const contract = new window.caver.klay.Contract(abi, address);
    return await contract.send(
      {
        gas: 1000000,
        from: accounts[0],
        // @ts-ignore
        // value 프로퍼티가 존재하는데 타입 선언을 안해줘서 강제로 무시.
        value: value ? window.caver.utils.toPeb(`${value}`) : undefined,
      },
      method,
      ...args
    );
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};

const callTransaction = async ({ abi, address, method }: TransactionParam, ...args: any[]) => {
  try {
    await window.klaytn.enable();
    const contract = new window.caver.klay.Contract(abi, address);

    return await contract.call(method, ...args);
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};

export { sendTransaction, callTransaction };
