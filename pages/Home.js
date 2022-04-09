import axios from 'axios';
import { base_url } from "../Config.js";
import React from 'react';
import Navbar from '../component/Navbar';
import {Card, Form, Button, Container, Nav} from 'react-bootstrap'
import gambar from '../component/image/cino.png';
import gambarlogo from '../component/image/laundrylogo.png';
import "./component.css"
export default class Home extends React.Component{
    constructor(){
        super()
        this.state = {
            token: "",
            userName: "",
            memberCount: '',
            userCount: '',
            paketCount: '',
            outletCount: '', 
            transaksiCount: '',
        }
        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
        } else {
            window.location = "/login"
        }
    }
    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }
    getUsername = () => {
        let admin = JSON.parse(localStorage.getItem('admin'))
        this.setState({userName: admin.username})
    }

    getMember = () => {
        let url = base_url + "/member"
        axios.get(url)
        .then(response=> {
            this.setState({memberCount: response.data.data.length})
        })
        .catch(error => {
            // if (error.response) {
            //     if (error.response.status) {
            //         window.alert(error.response.data.message)
            //         this.props.history.push("/login")
            //     }
            // } else {
                console.log(error);
            // }
        })
    }
    getUser = () => {
        let url = base_url + "/user"
        axios.get(url)
        .then(response=> {
            this.setState({userCount: response.data.data.length})
        })
        .catch(error => {
            // if (error.response) {
            //     if (error.response.status) {
            //         window.alert(error.response.data.message)
            //         this.props.history.push("/login")
            //     }
            // } else {
                console.log(error);
            //}
        })
    }
    getPaket = () => {
        let url = base_url + "/paket"
        axios.get(url)
        .then(response=> {
            this.setState({paketCount: response.data.data.length})
        })
        .catch(error => {
            // if (error.response) {
            //     if (error.response.status) {
            //         window.alert(error.response.data.message)
            //         this.props.history.push("/login")
            //     }
            // } else {
                console.log(error);
            //}
        })
    }
    getOutlet = () => {
        let url = base_url + "/outlet"
        axios.get(url)
        .then(response=> {
            this.setState({outletCount: response.data.data.length})
        })
        .catch(error => {
            // if (error.response) {
            //     if (error.response.status) {
            //         window.alert(error.response.data.message)
            //         this.props.history.push("/login")
            //     }
            // } else {
                console.log(error);
            //}
        })
    }
    getTransaksi = () => {
        let url = base_url + "/transaksi"
        axios.get(url)
        .then(response=> {
            this.setState({transaksiCount: response.data.data.length})
        })
        .catch(error => {
            // if (error.response) {
            //     if (error.response.status) {
            //         window.alert(error.response.data.message)
            //         this.props.history.push("/login")
            //     }
            // } else {
                console.log(error);
            //}
        })
    }
        
    componentDidMount(){
        this.getMember()
        this.getUser()
        this.getPaket()
        this.getOutlet()
        this.getTransaksi()
        this.getUsername()
        this.headerConfig()
    }    
        
    
    
    render(){
        return(
            <div>
                <Navbar />
                <Container className="my-4">
                    <Card className="card shadow">
                    <center>
                            <h2 className="text-black text-center my-4">
                                welcome back admin <br />
                             {this.state.userName} </h2>
                        </center>
                    </Card>
                    <br /><br />
                    <Card className="card shadow">
                        <Card.Header>
                            <center><br />
                        <img src={gambarlogo} className="App-logo"></img>
                        </center>
                        <h2 className="text-black text-center my-4">
                                THIS IS LAUNDRY
                            </h2>
                        </Card.Header>
                        </Card><br /><br />
                            {/* <div class='container-lg'>  */}
                    
                    {/* <h3 className="my-2">
                        <strong>Welcome back, {this.state.adminName}</strong>
                    </h3> */}
                    <Card className="card shadow">
                    <Card.Body className="card-body"><br />
                    <div className="row">
                        {/* member count */}
                        <div className="col-lg-3 col-md-6 col-sm-12 mt-2">
                            <div className="card">
                                <div className="card-body bg-light">
                                <center>
                                    <h4 className="text-dark">
                                        <strong>DATA MEMBER</strong>
                                    </h4>
                                    <h1 classsName="text-white">
                                        {this.state.memberCount}
                                    </h1>
                                    </center>
                                </div>
                            </div>
                        </div>

                        {/* user count */}
                        <div className="col-lg-3 col-md-6 col-sm-12 mt-2">
                            <div className="card">
                                <div className="card-body bg-light">
                                
                                <center>
                                    <h4 className="text-dark">
                                        <strong>DATA USER </strong>
                                    </h4>
                                    <h1 className="text-black">
                                        {this.state.userCount}
                                    </h1>
                                    </center>
                                </div>
                            </div>
                        </div>

                        {/* paket count */}
                        <div className="col-lg-3 col-md-6 col-sm-12 mt-2">
                            <div className="card">
                                <div className="card-body bg-light">
                                    <center>
                                    <h4 className="text-dark">
                                        <strong>DATA PAKET </strong>
                                    </h4>
                                    <h1 className="text-black">
                                        {this.state.paketCount}
                                    </h1>
                                    </center>
                                </div>
                            </div>
                        </div>

                        {/* outlet count */}
                        <div className="col-lg-3 col-md-6 col-sm-12 mt-2">
                            <div className="card">
                                <div className="card-body bg-light">
                                    <center>
                                    <h4 className="text-dark">
                                        <strong>DATA OUTLET </strong>
                                    </h4>
                                    <h1 className="text-black">
                                        {this.state.outletCount}
                                    </h1>
                                    </center>
                                </div>
                            </div>
                        </div>

                        {/* transaksi count */}
                        <center><br />
                        <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
                            <div className="card">
                                <div className="card-body bg-light">
                                    <center>
                                    <h4 className="text-dark">
                                        <strong>DATA TRANSAKSI </strong>
                                    </h4>
                                    <h1 className="text-black">
                                        {this.state.transaksiCount}
                                    </h1>
                                    </center>
                                </div>
                            </div>
                        </div>
                        <br />
                        </center>
                        
                        
                        
                        </div>
                    
                        </Card.Body>
                        
                    </Card>
                </Container>
            </div>
        )
}
}
