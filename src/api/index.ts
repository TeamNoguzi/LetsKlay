import axios from "api/axios";

const verifyUser = async (cookies: string) => {
  const { data } = await axios.get("/verify", { headers: { Cookie: `user=${cookies}` } });
  return data;
};

export { verifyUser };
