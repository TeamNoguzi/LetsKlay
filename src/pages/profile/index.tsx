import { GetServerSidePropsContext } from "next";
import blockUnauthorized from "utils/blockUnauthorized";

const Profile = () => {
  return <div>hi</div>;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const isAuthorized = await blockUnauthorized(context);

  if (!isAuthorized) {
    return {
      redirect: { destination: `/login?prevPage=${context.resolvedUrl}`, permanent: false },
    };
  }

  return {
    props: {},
  };
}

export default Profile;
