import type { NextPage } from "next";
import Head from "next/head";
import { Container, Row, Col } from "react-bootstrap";
import Card from "stories/Cards";
import Navigation from "stories/Navigation/Navigation";

const Home: NextPage = () => (
  <>
    <Head>
      <title>Create Next App</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <header>
      <Navigation />
    </header>
    <main>
      <Container>
        <Row>
          <Col xs={8}>
            <Card height={500} bigSize title="hi" body="hi" />
          </Col>
          <Col xs={4}>
            <Card height={125} title="hi" body="hi" />
            <Card height={125} title="hi" body="hi" />
            <Card height={125} title="hi" body="hi" />
            <Card height={125} title="hi" body="hi" />
          </Col>
        </Row>
      </Container>
    </main>
  </>
);

export default Home;
