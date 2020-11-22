import React, {useState, useEffect} from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Toast from 'react-bootstrap/Toast';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import Home from './component/Home';
import Template from './component/Template';

import {getStock, putMix, updateStock} from './fetch'

function App() {
    const [stockAlkohol, setStockAlkohol] = useState(0.0);
    const [stockAloe, setStockAloe] = useState(0.0);
    const [stockHidrogen, setStockHidrogen] = useState(0.0);

    // Fetch Current Stocks
    useEffect(() => {
        getStock().then(bahans => {
            const arr_bahan = bahans.data;

            const alkohol = arr_bahan.find(val => val.nama_bahan === "Alkohol");
            const aloe = arr_bahan.find(val => val.nama_bahan === "Aloevera");
            const hidrogen = arr_bahan.find(val => val.nama_bahan === "Hidrogen Peroxide");
    
            setStockAlkohol(alkohol.qty);
            setStockAloe(aloe.qty);
            setStockHidrogen(hidrogen.qty);
        });
    })

    const [shown, setShown] = useState(false);
    const [toastText, setToastText] = useState("Toast Text Here");

    const showToast = (msg) => {
        setToastText(msg);
        setShown(true);
    }

    return (
        <Container fluid>
            <Navbar bg="dark" variant="dark" fixed="top">
                <Navbar.Brand href="#home">
                    PT. Nama Perusahaan
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="mr-auto">
                    <Navbar.Text>
                        Tanggal/Jam di sini
                    </Navbar.Text>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Signed in as : USERNAME
                    </Navbar.Text>
                    <Button className="ml-3" variant='outline-light'> Log Out </Button>
                </Navbar.Collapse>
            </Navbar>
            <Row>
                <Col sm={12} md={3} className="mt-2 mb-2">
                    <Card>
                        <Card.Header> Stock List </Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item> <b>Alkohol</b>    :  {stockAlkohol.toFixed(2)} ml </ListGroup.Item>
                            <ListGroup.Item> <b>Aloe Vera </b> :  {stockAloe.toFixed(2)} ml </ListGroup.Item>
                            <ListGroup.Item> <b>Hidrogen Peroxide </b> : {stockHidrogen.toFixed(2)} ml </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
                <Router>
                    <Switch>
                        <Route path="/mixing">
                            <Template 
                                showToast={showToast}
                                apiMethod={putMix}
                                title="Input New Mix"
                                buttonText="Submit New Mix"
                            />
                        </Route>

                        <Route path="/stock">
                            <Template 
                                showToast={showToast}
                                apiMethod={updateStock}
                                title="Update Materials' Stock"
                                buttonText="Update Stock"
                            />
                        </Route>

                        <Route path="/home" component={Home}/>
                        <Route path="/" component={Home}/>
                    </Switch>
                </Router>
            </Row>
            <Toast autohide 
                show={shown} 
                delay={3000} 
                onClose={() => {setShown(false)}} 
            >
                <Toast.Body> {toastText} </Toast.Body>
            </Toast>
        </Container>
    );
}

export default App;
