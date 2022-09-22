import axios from "api/axios";

const verifySession = async () => {
  const { data } = await axios.get("/verify");
  return data;
};

const login = async () => {
  const provider = window.klaytn;
  await provider.enable();

  const address = provider.selectedAddress;
  const sign = await window.caver.klay.sign("test", address);

  const { data } = await axios.post("/login", { address, sign });
  return data;
};

export { verifySession, login };
