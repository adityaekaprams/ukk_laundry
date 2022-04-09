import React from "react";
import axios from "axios";

import { Modal, Button, Card, Container, Form } from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import { BiDetail } from "react-icons/bi";
import { GrDocumentPdf } from "react-icons/gr" 
import Navbar from "../component/Navbar";
import ComponentToPrint from "../component/componenttoprint";
import ReactToPrint from "react-to-print";

export default class LaporanAdmin extends React.Component {
    constructor() {
        super()
        this.state = {
            token:"",
            id_transaksi: "",
            id_member: "",
            id_paket:"",
            tgl: "",
            batas_waktu:"",
            tgl_bayar:"",
            status:"",
            dibayar:"",
            id_user:"",
            idUser:"",
            namaUser:"",
            id_outlet:"",
            qty:0,
            users:[],
            user:[],
            paket:[],
            transaksi: [],
            member: [],
            outlet:[],
            nama: "",
            action: "",
            isModalOpen: false
        }
        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
        } else {
            window.location = "/"
        }
    }
    headerConfig = () => {
        let header = {
            headers: { Authorization : `Bearer ${this.state.token}` }
        }
        return header
    }

    render() {
        return (
            <div>
                <Navbar />
                <Container className="my-4">
                    <Card className="card">
                        <Card.Header>
                        <h2 className="text-black text-center my-4">
                                List Transaksi
                            </h2>
                        </Card.Header>
                        <Card.Body className="card-body">
                            <br />
                            <center>
                            <ReactToPrint
                                trigger={()=> {
                                return <button type="button" className="btn btn-danger btn-lg btn-block my-3 mx-3">PRINT PDF</button>}}
                                content={()=>this.componentRef}
                            />
                            </center>
                            <br />
                            <ComponentToPrint ref={el => (this.componentRef = el)} />
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        );
    }
}