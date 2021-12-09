import React from 'react';
import { Col, Row, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import banner from '../../../../assets/images/banner.png'

const Home = () => {
    
    return (
        <>
            <div className="my-3">
                <Container>
                    <Row>
                        <Col md={6}>
                            <h1>BEAUTY SALOON FOR EVERYONE</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi eligendi, recusandae fugiat rerum, aliquid error omnis eum provident delectus, inventore eius quibusdam illum tempora facere. Facilis fugiat natus obcaecati ab deserunt libero, doloremque eos ipsam nihil, ipsa unde provident, reprehenderit nostrum accusantium id nobis ea earum a aliquam. Tempora, debitis?</p>
                            <Link to="/login"className="main-button" >Get an Appoinmemt </Link>
                        </Col>
                        <Col md={6}>
                            <img className="w-100" src={banner} alt="" />
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="my-3">
                <Container>
                    <Row>
                        <Col>
                            <h2 className="text-center" >Our awsam services</h2>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default Home;