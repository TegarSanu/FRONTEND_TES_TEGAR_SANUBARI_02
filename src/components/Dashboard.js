import React, { Table, useState, useEffect } from 'react';
import { Navbar, Container, Form, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import "../App.css";

const Dashboard = () => {

    const [simpandata, setSimpandata] = useState({
        name: "",
        nickname: "",
        age: "",
        employee: "",
    })


    useEffect(() => {
        const auth_token = localStorage.getItem("auth_token");
        const auth_token_type = localStorage.getItem("auth_token_type");
        const token = auth_token_type + " " + auth_token;

        var author = "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiI2MzZiZWY0YjFhNzE2NjY5MWUxMzBiOWUiLCJ1c2VyTmFtZSI6ImpvaG4iLCJhY2Nlc3MiOm51bGwsIm5hbWUiOiJKb2huIERvZSIsImFkZHJlc3MiOm51bGwsImFnZSI6MjYsImVtcGxveWVlIjoibWFuYWdlciIsImFzc2lnbm1lbnQiOm51bGwsImV4cCI6MTY2ODA3Nzk5NX0.MJf6hG9aFw2HiziL6nnhEAftOF5TEk-SmnD-AGDWJmk"
        axios
            .get("http://reqruitement-test.teknologikartu.com/v1/user?page=3&sort=updateTime&dir=1&size=10", {
                headers: { Authorization: token }, author
            }).then((response) => {
                console.log(response.data)
                setSimpandata()
            }).catch((error) => {
                console.log(error)
            })
    }, [])


    const onChangeForm = (label, event) => {
        switch (label) {
            case "name":
                setSimpandata({ ...simpandata, name: event.target.value });
                break;
            case "nickname":
                setSimpandata({ ...simpandata, nickname: event.target.value });
                break;
            case "age":
                setSimpandata({ ...simpandata, age: event.target.value });
                break;
            case "employee":
                setSimpandata({ ...simpandata, employee: event.target.value });
                break;
        }
    }


    const onClickHandler = (event) => {
        event.preventDefault()

        localStorage.removeItem("auth_token")
        localStorage.removeItem("auth_token_type")
        alert('Success Logout')
        setTimeout(() => {
            window.location.reload()
        },)
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        console.log(simpandata)
        
            await axios
            .post("http://reqruitement-test.teknologikartu.com/v1/user")
            .then((response) => {
                console.log(response.data)
                setSimpandata()
            }).catch((error) => {
                console.log(error)
            })
    }

    return (
        <div>
            <Navbar bg="dark">
                <Container>
                    <Navbar.Brand style={{ height: '70px', padding: '20px', color: 'white' }} href="#home"><strong>DASHBOARD</strong></Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text >
                            <a href="#"><h5 style={{ color: 'white' }} onClick={onClickHandler}>Logout</h5></a>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container expand="lg">
                <br />
                <h5>Form Operator</h5>
                <br />
                <Row className="mb-3">
                    <Form.Group xs={2} as={Col} controlId="formGridCity">
                        <Form.Control type='string' />
                    </Form.Group>

                    <Form.Group xs={2} as={Col} controlId="formGridCity">
                        <Form.Control type='string' />
                    </Form.Group>

                    <Form.Group xs={2} as={Col} controlId="formGridState">
                        <Form.Select placeholder="-,+,x,/" type="text" defaultValue="Choose..." >
                            <option value="-" >-</option>
                            <option value="+" >+</option>
                            <option value="*" >x</option>
                            <option value="/" >/</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group xs={1} as={Col} controlId="formGridCity">
                        <h3>=</h3>
                    </Form.Group>

                    <Form.Group xs={2} as={Col} controlId="formGridZip">
                        <Form.Control type="string" />
                    </Form.Group>

                </Row>
            </Container>
            <Container>
                <br />
                <h5>Menampilkan Data</h5>
                <br/>
                <div className='container'>
                    <table>
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Nickname</th>
                            <th>Employee</th>
                        </tr>
                        <tr>
                            <td>John Doe</td>
                            <td>29</td>
                            <td>John</td>
                            <td>Staff</td>
                        </tr>  
                    </table>
                </div>
            </Container>

            <Container>
                <br />
                <h5>Form Tambah Data</h5>
                <br />
                <Form>
                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>
                            Name
                        </Form.Label>
                        <Col xs={6}>
                            <Form.Control onChange={(event) => { onChangeForm("name", event) }} type="string" placeholder="Name" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                        <Form.Label column sm={2}>
                            Age
                        </Form.Label>
                        <Col xs={2} >
                            <Form.Control onChange={(event) => { onChangeForm("age", event) }} type="string" placeholder="Age" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                        <Form.Label column sm={2}>
                            Nickname
                        </Form.Label>
                        <Col xs={4} >
                            <Form.Control onChange={(event) => { onChangeForm("nickname", event) }} type="string" placeholder="Nickname" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                        <Form.Label column sm={2}>
                            Employee
                        </Form.Label>
                        <Col xs={4}>
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Select type="string" >
                                    <option onClick={(event) => { onChangeForm("employee", event) }} type="string" value="Manager">Manager</option>
                                    <option onClick={(event) => { onChangeForm("employee", event) }} type="string" value="Staff">Staff</option>
                                </Form.Select>

                            </Form.Group>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Col sm={{ span: 10, offset: 2 }}>
                            <Button onClick={onSubmitHandler} type="submit">Simpan</Button>
                        </Col>
                    </Form.Group>
                </Form>
            </Container>
        </div>
    )
}

export default Dashboard