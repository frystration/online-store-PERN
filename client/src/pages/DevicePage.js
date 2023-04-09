import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Dropdown, Form, Image, Row} from "react-bootstrap";
import bigStar from "../assets/bigStar.png"
import {fetchOneDevice} from "../http/deviceAPI";
import {useParams} from "react-router-dom";
import {createBasketDevice} from "../http/basketAPI";
import {checkIsRate, createRate} from "../http/rateApi";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const rateList = [1, 2, 3, 4, 5]

const DevicePage = observer(() => {
    const {user} = useContext(Context)
    const [device, setDevice] = useState({info: []})
    const {id} = useParams()

    const [selectedRate, setSelectedRate] = useState(5)
    const [isRate, setIsRate] = useState(true)
    const isAuth = user.isAuth

    useEffect(() => {
        fetchOneDevice(id).then(data => setDevice(data))
        if (isAuth) {
            setIsRate(false)
            checkIsRate(id).then(data => {
                    if (data.id) {
                        setIsRate(true)
                    }
                }
            )
        }
    }, [id, selectedRate, isAuth, isRate])

    const addToBasket = () => {
        createBasketDevice({deviceId: id}).then()
    }

    const addRate = (rate) => {
        setSelectedRate(rate)
        createRate({deviceId: id, rate}).then(data => console.log(data))
    }

    return (
        <Container className="mt-3">
            <Row>
                <Col md={4}>
                    <Image width={300} height={300} src={process.env.REACT_APP_API_URL + device.img}/>
                </Col>
                <Col md={4}>
                    <Form className="d-flex flex-column align-items-center">
                        <h2>{device.name}</h2>
                        <div
                            className="d-flex align-items-center justify-content-center"
                            style={{
                                background: `url(${bigStar}) no-repeat center center`,
                                width: 240,
                                height: 240,
                                backgroundSize: "cover",
                                fontSize: 64
                            }}
                        >
                            {device.rating}
                        </div>
                        {!isRate && <div>
                            <Dropdown className="mt-2 mb-2">
                                <Dropdown.Toggle>{selectedRate || "Поставьте оценку"}</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {rateList.map(rate =>
                                        <Dropdown.Item
                                            onClick={() => addRate(rate)}
                                            key={rate}
                                        >
                                            {rate}
                                        </Dropdown.Item>
                                    )}
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>}
                    </Form>
                </Col>
                <Col md={4}>
                    <Card
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{width: 300, height: 300, fontSize: 32, border: "5px solid lightgray"}}
                    >
                        <h3>{device.price}</h3>
                        <Button variant={"outline-dark"} onClick={() => addToBasket()}>Добавить в корзину</Button>
                    </Card>
                </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
                <h1>Характеристики:</h1>
                {device.info.map((info, index) =>
                    <Row key={info.id} style={{background: index % 2 === 0 ? "lightgray" : "transparent", padding: 10}}>
                        {info.title}: {info.description}
                    </Row>
                )}
            </Row>
        </Container>
    );
});

export default DevicePage;