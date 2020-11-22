import React, {useState} from 'react';

import {useHistory} from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';

function Template(props){
    const [qtyAlkohol, setQtyAlkohol] = useState(0.0);
    const [qtyAloe, setQtyAloe] = useState(0.0);
    const [qtyHidrogen, setQtyHidrogen] = useState(0.0);

    const resetValues = (e) => {
        e.preventDefault();
        setQtyAlkohol(0);
        setQtyAloe(0);
        setQtyHidrogen(0);
    }

    const history = useHistory();
    const toHome = (e) => {
        e.preventDefault();
        history.push("/home")
    }

    const submitInput = async (e) => {
        e.preventDefault();
        const response = await props.apiMethod(qtyAlkohol, qtyAloe, qtyHidrogen);
        props.showToast(response.message);
    
        if(response.status === 'success'){
            setTimeout(() => {history.push('/home')}, 1000);
        }
    }

    return(
        <>
            <Col sm={12} md={6} className="mt-2 mb-2">
                <Card >
                    <Card.Header> <b> {props.title} </b> </Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Group as={Row} controlId="qtyAlkohol">
                                <Form.Label column="lg" sm={4}> Alkohol </Form.Label>
                                <Col sm={8}>
                                    <InputGroup>
                                        <Form.Control required
                                            size="lg"
                                            type="number"
                                            placeholder="Jumlah Alkohol"
                                            min={0}
                                            max={10000.0}
                                            step={0.1}
                                            value={parseFloat(qtyAlkohol.toString())}
                                            onChange={e => {setQtyAlkohol(Math.min(10000.0, parseFloat(e.target.value || 0)))}}
                                        />
                                        <InputGroup.Append>
                                            <InputGroup.Text> mL </InputGroup.Text>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="qtyAloe">
                                <Form.Label column="lg" sm={4}> Aloe Vera </Form.Label>
                                <Col sm={8}>
                                    <InputGroup>
                                        <Form.Control required
                                            size="lg"
                                            type="number"
                                            placeholder="Jumlah Aloe"
                                            min={0}
                                            max={10000.0}
                                            step={0.1}
                                            value={parseFloat(qtyAloe.toString())}
                                            onChange={e => {setQtyAloe(Math.min(10000.0, parseFloat(e.target.value || 0)))}}
                                        />
                                        <InputGroup.Append>
                                            <InputGroup.Text> mL </InputGroup.Text>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="qtyHidrogen">
                                <Form.Label column="lg" sm={4}> Hidrogen Peroksida </Form.Label>
                                <Col sm={8}>
                                    <InputGroup>
                                        <Form.Control required
                                            size="lg"
                                            type="number"
                                            placeholder="Jumlah Hidrogen Peroksida"
                                            min={0}
                                            max={10000.0}
                                            step={0.1}
                                            value={parseFloat(qtyHidrogen.toString())}
                                            onChange={e => {setQtyHidrogen(Math.min(10000.0, parseFloat(e.target.value || 0)))}}
                                        />
                                        <InputGroup.Append>
                                            <InputGroup.Text> mL </InputGroup.Text>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </Col>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
            <Col sm={12} md={3} className="mt-2 mb-2">
                <Button size="lg" block variant="success" type="submit" onClick={submitInput}>
                    {props.buttonText}
                </Button>
                <Button size="lg" block variant="danger" type="reset" onClick={resetValues}>
                    Clear Input
                </Button>
                <Button size="lg" block variant="warning" onClick={toHome}>
                    Return to Home
                </Button>
            </Col>
        </>
    )
}

export default Template;