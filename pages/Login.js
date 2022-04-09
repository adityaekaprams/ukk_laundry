import React from 'react';
import {Card, Form, Button, Container, Nav} from 'react-bootstrap'
import { Link } from "react-router-dom";
import axios from 'axios';
import { base_url } from '../Config';
import { toBePartiallyChecked } from '@testing-library/jest-dom/dist/matchers';


export default class Login extends React.Component {
    constructor(){
        super()
        this.state = {
            email: "",
            password: "",
            massage: "",
            role: "",
            logged: true
        }
    }
    Login = event => {
        event.preventDefault()
        let sendData = {
            email: this.state.email,
            password: this.state.password,
            role : this.state.role
        }

        let url = base_url + "/user/auth"

        axios.post(url, sendData)
        .then(response => {
            this.setState({logged: response.data.logged})
            if (this.state.logged){
                switch (this.state.role) {
                    case "admin":
                        let admin = response.data.data
                        let token = response.data.token
                        localStorage.setItem("admin", JSON.stringify(admin))
                        localStorage.setItem("token", token)
                        this.props.history.push("/")
                        break;
                    case "owner":
                        let owner = response.data.data
                        let token_owner = response.data.token
                        localStorage.setItem("owner", JSON.stringify(owner))
                        localStorage.setItem("token", token_owner)
                        this.props.history.push("/home_owner")
                        break;
                    case "kasir":
                        let kasir = response.data.data
                        let token_kasir = response.data.token
                        localStorage.setItem("kasir", JSON.stringify(kasir))
                        localStorage.setItem("token", token_kasir)
                        this.props.history.push("/home_kasir")
                        break;
                    default:
                        break;
                }
                    
                    
            }else{
                this.setState({massage: response.data.massage})
            }
        })
        .catch(error => console.log(error))
    }
    
    render() {
        return (
            <Container className="container d-flex justify-content-center align-items-center">
                <Card className="card shadow col-sm-5 card my-5">
                <Card.Body className='my-5 px-5'>
                    <h2 className='text-center'>Sign In</h2>
                    <br />
                    
                    <Form onSubmit={ev => this.Login(ev)}>
                        <Card.Text>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="text" placeholder="Enter email" value={this.state.email}
                                onChange={ev => this.setState({email: ev.target.value})}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label> Password </Form.Label>
                                <Form.Control type="password" placeholder="Password" value={this.state.password}
                                onChange={ev => this.setState({password: ev.target.value})}
                                autoComplete="false" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                            <Form.Label>Role</Form.Label>
                            <Form.Select select value={this.state.role}
                                onChange={ev => this.setState({role: ev.target.value})}
                                autoComplete="false" >
                                    <option select>Chose one</option>
                                <option value="admin" >admin</option>
                                <option value="owner" >owner</option>
                                <option value="kasir" >kasir</option>
                                </Form.Select>
                            </Form.Group>
                        </Card.Text>
                        { !this.state.logged ? 
                        (
                            <div className="alert alert-danger mt-1 text-center">
                                your username or password is not registered{ this.state.message }
                            </div>
                        ) : null }
                        <div className="d-grid gap-2">
                            <Button variant="dark" type="submit">Submit</Button>
                            {/* <Card.Text className='forgot-password text-end'>don't have account ?<Link to='/register'><strong> Sign Up</strong></Link></Card.Text> */}
                        </div>
                    </Form>
                </Card.Body>
                {/* <Card.Footer>
                    <Button variant='warning' href='/'>
                        Home (sementara)
                    </Button>
                </Card.Footer> */}
                </Card>
            </Container>
        );
    }
}