import React, {useState, useEffect} from 'react';

import {useHistory} from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

import {getRecent} from '../fetch'

function Home(props){
    const [recentData, setRecentData] = useState(null);

    const [alkohol, setAlkohol] = useState(0.0);
    const [aloe, setAloe] = useState(0.0);
    const [hidro, setHidro] = useState(0.0);

    const [variant, setVariant] = useState('dark');
    const [mixStatus, setMixStatus] = useState('')

    
    const history = useHistory();
    const toMixing = (e) => {
        e.preventDefault();
        history.push('/mixing')
    }

    const toStockUpdate = (e) => {
        e.preventDefault();
        history.push('/stock')
    }

    // Fetch most recent inputs
    useEffect(() => {
        getRecent().then(response => {
            if(response.status === 'success'){
                const recentData = response.data;
                setRecentData(recentData);

                if(recentData.Timestamp.finished_mix !== null){
                    setMixStatus("Finished")
                } else if(recentData.Timestamp.start_mix !== null){
                    setMixStatus("Ongoing")
                } else {
                    setMixStatus("Ready")
                }
            }
        });
    })

    useEffect(() => {
        switch (mixStatus) {
            case "Ready":
                setVariant("warning"); break;
            case "Ongoing":
                setVariant("info"); break;
            case "Finished":
                setVariant("success"); break;
            default:
                setVariant("dark");
        }
    }, [mixStatus])

    return(
        <>
            <Col sm={12} md={6} className="mt-2 mb-2">
                <Card bg={variant}>
                    <Card.Header> Latest Mix</Card.Header>
                    <Card.Body>
                        <ListGroup>
                            <ListGroup.Item variant={variant}> <b>Alkohol</b>    :  {recentData ? recentData.campuran[0].alkohol.qty : 0} ml </ListGroup.Item>
                            <ListGroup.Item variant={variant}> <b>Aloe Vera </b> :  {recentData ? recentData.campuran[0].aloevera.qty : 0} ml </ListGroup.Item>
                            <ListGroup.Item variant={variant}> <b>Hidrogen Peroxide </b> : {recentData ? recentData.campuran[0].hidrogen_peroxide.qty : 0} ml </ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                    <Card.Footer> Status : {mixStatus}</Card.Footer>
                </Card>
            </Col>
            <Col sm={12} md={3} className="mt-2 mb-2">
                <Button size="lg" block variant="primary" onClick={toMixing}>
                    Create New Mix
                </Button>
                <Button size="lg" block variant="secondary" onClick={toStockUpdate}>
                    Update Stocks
                </Button>
            </Col>
        </>
    );
}

export default Home;