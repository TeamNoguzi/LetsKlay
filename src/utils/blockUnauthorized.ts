import { verifySession } from "api";
import { GetServerSidePropsContext } from "next/types";

const blockUnauthorized = async (context: GetServerSidePropsContext) => {
  try {
    await verifySession(`user=${context.req.cookies.user ?? ""}`);
    return true;
  } catch (err) {
    return false;
  }
};

export default blockUnauthorized;
