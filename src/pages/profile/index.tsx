import { GetServerSidePropsContext } from "next";
import blockUnauthorized from "utils/blockUnauthorized";
import { Container, Row, Col, Tab } from "react-bootstrap";
import MyInfo from "sections/Profile/MyInfo";
import { FindUserDto } from "@/dto";
import { fetchUserServerSide } from "api";
import Header from "stories/Layout/Header";
import Footer from "stories/Layout/Footer";
import dynamic from "next/dynamic";
import Tabs from "stories/Tabs";
import { useUser } from "hooks";

const DynamicFundList = dynamic(() => import("sections/Profile/FundList"), { suspense: true });
const DynamicLikedList = dynamic(() => import("sections/Profile/LikedList"), { suspense: true });

interface ProfileProps {
  initialUser: FindUserDto;
}

const Profile = ({ initialUser }: ProfileProps) => {
  const { user } = useUser(initialUser);

  return (
    <>
      <Header />
      <Container as="main">
        <Row className="my-5">
          <Col xs={12} lg={4} xl={3}>
            <MyInfo user={user} />
          </Col>
          <Col>
            <Tabs defaultActiveKey="FundList">
              <Tab title="Fund List" eventKey="FundList">
                <DynamicFundList />
              </Tab>
              <Tab title="Liked Projects" eventKey="LikedProjectList">
                <DynamicLikedList />
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const isAuthorized = await blockUnauthorized(context);

  if (!isAuthorized) {
    return {
      redirect: { destination: `/login?prevPage=${context.resolvedUrl}`, permanent: false },
    };
  }

  const initialUser = await fetchUserServerSide(`user=${context.req.cookies.user}`);

  return {
    props: { initialUser },
  };
}

export default Profile;
