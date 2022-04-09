import React from "react";
import axios from "axios";
// import Navbar from '../component/Navbar';
import Pdf from "react-to-pdf";
import { Modal, Button, Card, Container, Form } from "react-bootstrap";

const ref = React.createRef();

export default class Transaksi extends React.Component {
    constructor() {
        super()
        this.state = {
            token: "",
            id_transaksi: "",
            id_member: "",
            tgl: "",
            batas_waktu:"",
            tgl_bayar:"",
            status:"",
            dibayar:"",
            id_user:"",
            idUser:"",
            namaUser:"",
            id_outlet:"",
            transaksis: [],
            detail_transaksi: [],
            users: [],
            members: [],
            pakets:[],
            outlets: [],
            id_paket: "",
            status: "",
            qty: "",
            jenis_paket: "",
            harga: "",
            action: "",
            isModalPrint: false,
            isModalOpen: false
        }
    }

    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }
    convertTime = time => {
        let date = new Date(time)
        return `${date.getDate()}/${Number(date.getMonth()) + 1}/${date.getFullYear()} `
      }
    getMember = async () => {
        let url = "http://localhost:5000/api/member"
        await axios.get(url, this.headerConfig())
        .then(response => { 
            this.setState({members: response.data.data})
            // console.log(response)
        })
        .catch(error => {
            console.log(error);
        })
        // console.log(this.state.members)
    }
    // getUser = async () => {
    //     let admin = JSON.parse(localStorage.getItem('admin'))
    //     // console.log(admin.username)
    //     this.setState({idUser: admin.id_user})
    //     this.setState({namaUser: admin.username})
    //     let url = "http://localhost:5000/api/user"
    //     await axios.get(url, this.headerConfig())
    //     .then(response => { 
    //         this.setState({users: response.data.data})
    //         console.log(this.state.users)
    //     })
    //     .catch(error => {
    //         if (error.response) {
    //             if(error.response.status) {
    //                 window.alert(error.response.data.message)
    //                 this.props.history.push("/login")
    //             }
    //         }else{
    //             console.log(error);
    //         }
    //     })
    // }
    getUsers = () => {
        let admin = JSON.parse(localStorage.getItem('admin'))
        this.setState({id_user: admin.id_user})
    }
    getUser = async () => {
        let url = "http://localhost:5000/api/user"
        await axios.get(url, this.headerConfig())
        .then(response => { 
            this.setState({users: response.data.data})
            // console.log(response)
        })
        .catch(error => {
            console.log(error);
        })
        // console.log(this.state.pakets)
    }
    getPaket = async () => {
        let url = "http://localhost:5000/api/paket"
        await axios.get(url, this.headerConfig())
        .then(response => { 
            this.setState({pakets: response.data.data})
            // console.log(response)
        })
        .catch(error => {
            console.log(error);
        })
        // console.log(this.state.pakets)
    }
    getOutlet = async () => {
        let url = "http://localhost:5000/api/outlet"
        await axios.get(url, this.headerConfig())
        .then(response => { 
            this.setState({outlets: response.data.data})
            // console.log(response)
        })
        .catch(error => {
            console.log(error);
        })
        // console.log(this.state.outlets)
    }
    getTransaksiIdOutlet = () => {
        // console.log(this.state.outlet)
        if(this.state.outlet !== null && this.state.outlet !== undefined && this.state.outlet !== ""){
            let url = "http://localhost:5000/api/transaksi/outlet/" + this.state.outlet
            // console.log(url)
            axios.get(url)
            .then(response => {
                let dataTransaksi = response.data.data
                for (let i = 0; i < dataTransaksi.length; i++) {
                    let total = 0;
                    for (let j = 0; j < dataTransaksi[i].detail_transaksi.length; j++) {
                        let harga = dataTransaksi[i].detail_transaksi[j].paket.harga
                        let qty = dataTransaksi[i].detail_transaksi[j].qty
                        total += (harga * qty)
                    }
                    //tambahkan key "total"
                    dataTransaksi[i].total = total
                }
                this.setState({ transaksis: dataTransaksi })
            })
            .catch(error => console.log(error))
        
        // console.log(this.state.outlets)
        }else{
            // console.log('run esle')
            let url = "http://localhost:5000/api/transaksi/"
            axios.get(url)
            .then(response => {
                let dataTransaksi = response.data.data
                for (let i = 0; i < dataTransaksi.length; i++) {
                    let total = 0;
                    for (let j = 0; j < dataTransaksi[i].detail_transaksi.length; j++) {
                        let harga = dataTransaksi[i].detail_transaksi[j].paket.harga
                        let qty = dataTransaksi[i].detail_transaksi[j].qty
                        total += (harga * qty)
                    }
                    //tambahkan key "total"
                    dataTransaksi[i].total = total
                }
                this.setState({ transaksis: dataTransaksi })
            })
            .catch(error => console.log(error))
        }
        
    }
    
    // getTransaksi () => {
    //     let url = "http://localhost:5000/api/transaksi"
    //     await axios.get(url)
    //     .then(response => { 
    //         // this.setState({transaksis: response.data.data})
    //         let dataTransaksi = response.data.data
    //            for (let i = 0; i < dataTransaksi.length; i++) {
    //                let total = 0;
    //                for (let j = 0; j < dataTransaksi[i].detail_transaksi.length; j++) {
    //                    let harga = dataTransaksi[i].detail_transaksi[j].paket.harga
    //                    let qty = dataTransaksi[i].detail_transaksi[j].qty

    //                    total += (harga * qty)
    //                }

    //                //tambahkan key "total"
    //                dataTransaksi[i].total = total
    //            }
    //            this.setState({transaksis: dataTransaksi})
    //         // console.log(response)
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     })
    //     console.log(this.state.transaksis)
    // }
    componentDidMount = () => {
        this.getTransaksiIdOutlet()
        this.getMember()
        this.getUser()
        this.getUsers()
        this.getPaket()
        this.getOutlet()
    }
    handleAdd = () =>{
        this.setState({
            id_transaksi: 0,
            id_member: "",
            tgl: "",
            batas_waktu:"",
            tgl_bayar:"",
            status:"baru",
            dibayar:"",
            id_user: this.state.id_user,
            id_outlet:"",
            id_paket:"",
            qty:"",
            detail_transaksi: [],
            action: "insert",
            isModalOpen: true
        })
    }
    handleEdit = (item) =>{
        this.setState({
            id_transaksi: item.id_transaksi,
            id_member: item.id_member,
            tgl: item.tgl,
            batas_waktu: item.batas_waktu,
            tgl_bayar: item.tgl_bayar,
            status: item.status,
            dibayar: item.dibayar,
            id_user: item.id_user,
            id_outlet: item.id_outlet,
            action: "update",
            isModalOpen1: true
        })
    }
    handlePrint = (item) =>{
        this.setState({
            id_transaksi: item.id_transaksi,
            id_member: item.id_member,
            tgl: item.tgl,
            batas_waktu: item.batas_waktu,
            tgl_bayar: item.tgl_bayar,
            status: item.status,
            dibayar: item.dibayar,
            id_user: item.id_user,
            id_outlet: item.id_outlet,
            action: "update",
            isModalPrint: true
        })
    }
    handleSave = (event) =>{
        event.preventDefault();
        let url = "http://localhost:5000/api/transaksi"
        let detail = {
            id_paket: this.state.id_paket,
            qty: this.state.qty,
        }
  
        //ambil array detail_transaksi
        let temp = this.state.detail_transaksi
        temp.push(detail)
        this.setState({ detail_transaksi: temp })
        let form = {
                id_transaksi: this.state.id_transaksi,
                id_member: this.state.id_member,
                tgl: this.state.tgl,
                batas_waktu: this.state.batas_waktu,
                tgl_bayar: this.state.tgl_bayar,
                status: this.state.status,
                dibayar: this.state.dibayar,
                id_user: this.state.id_user,
                id_outlet: this.state.id_outlet,
                detail_transaksi: this.state.detail_transaksi
            }
        
        if(this.state.action === "insert"){

            let url = "http://localhost:5000/api/transaksi"
            axios.post(url, form, this.headerConfig())
            .then(response => { 
                window.alert(response.data.message)
                this.getTransaksi()
                // console.log(response)
            })
            .catch(error => {
                console.log(error);
            })
        }else if(this.state.action === "update"){
            axios.put(url, form)
            .then(response => {
                window.alert(response.data.message)
                this.getTransaksi()
                // console.log(response)
            })
            .catch(error => {
                console.error();
            })
        } 
    }
    handleDelete = (id_transaksi) => {
        let url = "http://localhost:5000/api/transaksi/" + id_transaksi
        if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
          axios.delete(url)
          .then(response => {
            this.getTransaksi();
            this.handleClose()
            // console.log(response)
          })
          .catch(error => {
            console.log(error);
          })
        }
    }
    handleSaveEdit = (event) =>{
        event.preventDefault();
        let url = "http://localhost:5000/api/transaksi"
        let form = {
            status: this.state.status,
            batas_waktu: this.state.batas_waktu,
        }
    }
    GantiStatusBayar(id_transaksi, dibayar) {
        if (dibayar === 'belum_dibayar') {
            return (
                <div className="badge bg-danger text-white">
                    Belum Dibayar

                    <br />

                    {/* <a className="text-primary"
                        onClick={() => this.GantiStatusBayar(id_transaksi, 1)}>
                        Kilik disini untuk mengganti status
                    </a> */}
                </div>
            )
        } else if (dibayar === 'dibayar') {
            return (
                <div className="badge bg-success text-white">
                    Sudah Dibayar
                </div>
            )
        }
    }
    GantiStatus(status) {
        if (status === 'baru') {
            return (
                <div className="badge bg-info">
                    Baru
                    <br />

                </div>
            )
        } else if (status === 'proses') {
            return (
                <div className="badge bg-warning">
                    Sedang diproses
                    <br />

                </div>
            )
        } else if (status === 'selesai') {
            return (
                <div className="badge bg-secondary">
                    Siap Diambil

                    <br />

                    {/* <a onClick={() => this.GantiStatus( 'diambil')} className="text-danger">
                    Klik disini untuk mengganti level
                    </a> */}
                </div>
            )
        } else if (status === 'diambil') {
            return (
                <div className="badge bg-success">
                    Telah Diambil
                </div>
            )
        }
    }
    JenisPaket(jenis) {
        if (jenis === 'pakaian') {
            return (
                <div className="text-nowrap">
                    Pakaian
                </div>
            )
        } else if (jenis === 'bed_cover') {
            return (
                <div className="text-nowrap">
                    Bed Cover
                </div>
            )
        } else if (jenis === 'selimut') {
            return (
                <div className="text-nowrap">
                    Selimut
                </div>
            )
        }
    }
    ref = React.createRef();

    handleClose = () => {
        this.setState({
            isModalOpen: false,
            isModalOpen1: false
            
        })
    }
    render() {
        return (
            <div>
                
                <Container className="my-4">
                
                    
                        
                        
                        
                        <Card.Body className="card-body">
                            <center>
                            <h2 className="text-black text-center my-4">
                                HASIL TRANSAKSI
                            </h2>
                            {/* <div className="">
                                <center>
                                <Button className="btn btn-dark btn-lg btn-block my-3 mx-3" onClick={() => this.handleAdd()}>
                                    ADD TRANSAKSI
                                </Button>
                                </center>
                            </div> */}
                            <br />
                            <div className="mx-7 my-3">
                                <Form.Select id= "mySelect" value={this.state.outlet} onChange={ev => this.setState({outlet: ev.target.value})} onClick={this.getTransaksiIdOutlet}>
                                    <option >Pilih Outlet</option>
                                {this.state.outlets.map(outlet => (
                                    <option value={outlet.id_outlet}>{outlet.lokasi}</option>
                                    
                                ))}
                                </Form.Select>
                            </div>
                            
                            {this.state.transaksis.map(transaksi => (
                                <li className="list-group-item">
                                    {transaksi.detail_transaksi.map(detail => (
                                    <center>
                                    <div className="row">
                                        <div className="col-lg-3 ">
                                            <small className="text-secondary">Nama :</small>
                                            <h6>{transaksi.member.nama}</h6>
                                        </div>
                                        <div className="col-lg-3">
                                            <small className="text-secondary">Tanggal :</small> <br />
                                            <h6>{this.convertTime(transaksi.tgl)}</h6>
                                        </div>
                                        <div className="col-lg-3">
                                            <small className="text-secondary">Batas Waktu :</small> <br />
                                            <h6>{this.convertTime(transaksi.batas_waktu)}</h6>
                                        </div>
                                        <div className="col-lg-3">
                                            <small className="text-secondary">Tanggal Bayar :</small> <br />
                                            <h6>{this.convertTime(transaksi.tgl_bayar)}</h6>
                                        </div>
                                        <div className="col-lg-3">
                                             <small className="text-secondary">Status :</small> <br />                                             
                                             <h6>{this.GantiStatus(transaksi.status)}</h6>
                                         </div>
                                        <div className="col-lg-3">
                                        <small className="text-secondary">Pembayaran :</small> <br />
                                        <h6>{this.GantiStatusBayar(transaksi.id_transaksi, transaksi.dibayar)}
                                        </h6>
                                        </div>
                                             {/* <div className="col-lg-2">
                                            <small className="text-secondary">dibayar :</small> <br />
                                            <h6>{transaksi.dibayar}</h6>
                                        </div> */}
                                        <div className="col-lg-3">
                                            <small className="text-secondary">User :</small> <br />
                                            <h6>{transaksi.user.username}</h6>
                                        </div>
                                        <div className="col-lg-3">
                                            <small className="text-secondary">Outlet :</small> <br />
                                            <h6>{transaksi.outlet.lokasi}</h6>
                                        </div>
                                        <div className="col-lg-4">
                                            <small className="text-secondary">total :</small> <br />
                                            <h6>{transaksi.total}</h6>
                                        </div>
                                        <div className="col-lg-12">
                                            <small className="text-secondary">
                                                Detail Transaksi
                                            </small> 
                                            <br />
                                            {transaksi.detail_transaksi.map(detail => (
                                                <strong className="row  text-muted">
                                                    {/** area nama paket col-3 */}
                                                    <div className="col-lg-3">
                                                        {detail.paket.jenis}
                                                    </div>
                                                    {/** area qty col-2 */}
                                                    <div className="col-lg-3">
                                                        qty: {detail.qty}
                                                    </div>
                                                    {/** area harga paket col-3 */}
                                                    <div className="col-lg-3">
                                                        @ Rp {detail.paket.harga}
                                                    </div>
                                                    {/** area total paket col-lg 4 */}
                                                    <div className="col-lg-3">
                                                        Rp {detail.paket.harga * detail.qty}
                                                    </div>
                                                </strong>
                                            ))}
                                        </div>
                                         
                                        <center>
                                        <br />
                                        {/* <div className="col-lg-2">
                                            <small className="text-secondary">QTY :</small> <br />
                                            <h6>{transaksi.detail_transaksi.qty}</h6>
                                        </div> */}
                                        {/* <div className="col-lg-2">
                                            <button className="btn btn-sm btn-dark m-2" onClick={() => this.handleEdit(transaksi)}>
                                                edit
                                            </button>
                                            <button className="btn btn-sm btn-dark m-2" onClick={() => this.handleDelete(transaksi.id_transaksi)}>
                                                delete
                                            </button>
                                            <button className="btn btn-sm btn-dark m-2" onClick={() => this.handlePrint(transaksi.id_transaksi)}>
                                                print
                                            </button>
                                        </div>
                                        <div className="mb-2">
                        <Pdf targetRef={ref} filename="struk-pembayaran.pdf" x={6.5} y={0.5} scale={0.7}>
                                        {({ toPdf }) => <Button variant="primary" onClick={toPdf}>Print</Button>}
                         </Pdf>
    
                         </div>  */}
                                        {/* <hr />
                                        <div className="col-lg-3">
                                            <small className="text-secondary">Detail Transaksi :</small> <br />
                                            <h6>{transaksi.detail_transaksi}</h6>
                                        </div>  */}
                                        <br />
                                        </center>
                                    </div>
                                    </center>
                                     ))} 
                                </li>
                            ))}
                            <br />
                            
                            </center>
                        </Card.Body>
                    
                    
                </Container>

                
            </div>
        );
    }
}
