import axios from "api/axios";

// 서버 사이드에서는 쿠키를 직접 전달
const verifySession = async (cookie?: string) => {
  const { data } = await axios.get("/verify", cookie ? { headers: { Cookie: cookie } } : {});
  return data;
};

const login = async () => {
  const provider = window.klaytn;
  await provider.enable();

  const address = provider.selectedAddress;
  if (!address) {
    return Promise.reject();
  }

  const sign = await window.caver.klay.sign("test", address);

  const { data } = await axios.post("/login", { address, sign });

  return data;
};

export { verifySession, login };
