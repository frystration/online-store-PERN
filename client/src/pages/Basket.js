import React, {useContext, useEffect, useState} from 'react';
import {fetchBasket} from "../http/basketAPI";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {fetchOneDevice} from "../http/deviceAPI";
import BasketItem from "../components/BasketItem";

const Basket = observer(() => {
    const {basket} = useContext(Context)

    useEffect(() => {
        fetchBasket().then(data => basket.setDevices(data))
    }, [])

    return (
        <Row className="d-flex">
            {basket.devices.map(device =>
                <BasketItem key={device.id} deviceId={device.deviceId}/>)
            }
        </Row>
    );
});

export default Basket;