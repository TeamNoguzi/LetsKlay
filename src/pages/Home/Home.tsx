import { Container, Row } from 'react-bootstrap';
import useBreakpoint from '../../hooks/useBreakpoint';
import Footer from 'src/components/Layout/Footer/Footer';
import Header from 'src/components/Layout/Header/Header';
import './Home.module.css';

const HomePage = () => {
    const [size, isSize] = useBreakpoint()

    return (
        <Container>
            <Header device={isSize('sm')?'pc':'mobile'}/>
            <Row style={{height:400}}>
                {/* 여기에 대문 삽입 */}
            </Row>
            <hr/>
            <Row style={{height:400}}>
                {/* 여기에 캐러셀 등 삽입 */}
            </Row>
            <Footer device={isSize('sm')?'pc':'mobile'}/>
        </Container>
    );
}

export default HomePage;