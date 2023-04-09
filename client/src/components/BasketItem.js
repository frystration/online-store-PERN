import React, {useEffect, useState} from 'react';
import {Card, Col, Image} from "react-bootstrap";
import star from "../assets/star.png"
import {useNavigate} from "react-router-dom";
import {DEVICE_ROUTE} from "../utils/consts";
import {fetchOneDevice} from "../http/deviceAPI";

const BasketItem = ({deviceId}) => {
    const navigate = useNavigate()
    const [device, setDevice] = useState({info: []})

    useEffect(() => {
        fetchOneDevice(deviceId).then(data => setDevice(data))
    }, [])

    return (
        <Col md={3} className={"mt-3"} onClick={() => navigate(DEVICE_ROUTE + "/" + deviceId)}>
            <Card style={{width: 150, cursor: "pointer"}} border={"light"}>
                <Image width={150} height={150} src={process.env.REACT_APP_API_URL + device.img}/>
                <div className="text-black-50 mt-1 d-flex justify-content-center align-items-center">
                    <div className="d-flex align-items-center">
                        <div>{device.price}</div>
                    </div>
                </div>
                <div>{device.name}</div>
            </Card>
        </Col>
    );
};

export default BasketItem;