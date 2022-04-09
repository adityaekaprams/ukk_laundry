import React from "react";
import axios from "axios";
import Navbar from '../component/Navbar';
import Pdf from "react-to-pdf";
import gambarlogo from '../component/image/transaksi.png';
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
        let admin = JSON.parse(localStorage.getItem('owner'))
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
                this.getTransaksiIdOutlet()
                // console.log(response)
            })
            .catch(error => {
                console.log(error);
            })
        }else if(this.state.action === "update"){
            axios.put(url, form)
            .then(response => {
                window.alert(response.data.message)
                this.getTransaksiIdOutlet()
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
            this.getTransaksiIdOutlet();
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
                {/* <Navbar /> */}
                <Container className="my-1">
                
                    <Card className="card shadow">
                        <Card.Header>
                        <br />
                        {/* <center>
                        <img src={gambarlogo} className="App-transaksi"></img>
                        </center> */}
                        <h2 className="text-black text-center my-3">
                                TRANSAKSI
                            </h2>
                        </Card.Header>
                        <Card.Body className="card-body">
                            
                            
                            <div className="">
                                <center>
                                {/* <Button className="btn btn-dark btn-lg btn-block my-3 mx-3" href="/FormTransaksi">
                                    ADD TRANSAKSI
                                </Button>
                                <Button className="btn btn-dark btn-lg btn-block my-3 mx-3" href="/laporanAdmin">
                                    REPORT TO PDF
                                </Button> */}
                                </center>
                            </div>
                            <br />
                            <div className="mx-3 my-3">
                                <Form.Select id= "mySelect" value={this.state.outlet} onChange={ev => this.setState({outlet: ev.target.value})} onClick={this.getTransaksiIdOutlet}>
                                    <option hidden="true">Pilih Outlet</option>
                                {this.state.outlets.map(outlet => (
                                    <option value={outlet.id_outlet}>{outlet.lokasi}</option>
                                ))}
                                </Form.Select>
                            </div>
                            <ul className="list-group mx-3">
                            {this.state.transaksis.map(transaksi => (
                                <li className="list-group-item">
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
                                            <small className="text-secondary">Tenggat Bayar :</small> <br />
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
                                        <div className="col-lg-12">
                                            <small className="text-secondary">total :</small> <br />
                                            <h6>{transaksi.total}</h6>
                                        </div> 
                                        
                                        <div className="col-lg-12">
                                            <small className="text-secondary">
                                                Daftar Transaksi :
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
                                                        Jumlah : {detail.qty}
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
                                        <div className="col-lg-3">
                                            {/* <button className="btn btn-sm btn-dark m-2" onClick={() => this.handleEdit(transaksi)}>
                                                edit
                                            </button>
                                            <button className="btn btn-sm btn-dark m-2" onClick={() => this.handleDelete(transaksi.id_transaksi)}>
                                                delete
                                            </button> */}
                                            {/* <button className="btn btn-sm btn-dark m-2" onClick={() => this.handlePrint(transaksi.id_transaksi)}>
                                                print
                                            </button> */}
                                        </div>
                                        {/* <div className="mb-2">
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

                                </li>
                            ))}
                            <br />
                            </ul>
                            
                        </Card.Body>
                    </Card>
                    
                </Container>

                <Modal show={this.state.isModalOpen} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>FORM TRANSAKSI</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={this.handleSave}>
                        <Modal.Body>
                        <Form.Group className="mb-2">
                            <Form.Label> Nama User </Form.Label>
                            <Form.Select id= "mySelect" value={this.state.id_user} onChange={ev => this.setState({id_user: ev.target.value})}>
                                <option className = "firstOption" value="" readOnly={true} hidden = "true">Pilih User</option>
                                    {this.state.users.map(user => (
                                    <option value={user.id_user} > {user.username}</option>
                                    ))}
                            </Form.Select>
                        </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Nama Member</Form.Label>
                                <Form.Select id= "mySelect" value={this.state.id_member} onChange={ev => this.setState({id_member: ev.target.value})}>
                                <option className = "firstOption" value="" readOnly={true} hidden = "true">Pilih Member</option>
							{this.state.members.map(member => (
								<option value={member.id_member} >{member.nama}</option>
                                 ))}
                            </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-2">
                            <Form.Label> Nama Outlet </Form.Label>
                            <Form.Select id= "mySelect" value={this.state.id_outlet} onChange={ev => this.setState({id_outlet: ev.target.value})}>
                                <option className = "firstOption" value="" hidden = "true">Pilih Outlet</option>
							{this.state.outlets.map(outlet => (
								<option value={outlet.id_outlet}>{outlet.lokasi}</option>
                                 ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label> Jenis Paket </Form.Label>
                            <Form.Select id= "mySelect" value={this.state.id_paket} onChange={ev => this.setState({id_paket: ev.target.value})}>
                                <option className = "firstOption" value="" hidden = "true">Pilih Paket</option>
							{this.state.pakets.map(paket => (
								<option value={paket.id_paket}>{paket.jenis}</option>
                                 ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-2">
                                <Form.Label>QTY</Form.Label>
                                <Form.Control type="number" value={this.state.qty} 
                                onChange={ev => this.setState({qty: ev.target.value})} />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>tanggal</Form.Label>
                                <Form.Control type="date" value={this.state.tgl} 
                                onChange={ev => this.setState({tgl: ev.target.value})} />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>batas waktu</Form.Label>
                                <Form.Control type="date" value={this.state.batas_waktu} 
                                onChange={ev => this.setState({batas_waktu: ev.target.value})} />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>tanggal bayar</Form.Label>
                                <Form.Control type="date" value={this.state.tgl_bayar} 
                                onChange={ev => this.setState({tgl_bayar: ev.target.value})} />
                            </Form.Group>
                            <Form.Group className="mb-2">
                            <Form.Label> status </Form.Label>
                                <Form id="mySelect" value={this.state.status} 
                                onChange={ev => this.setState({status: ev.target.value})}>
                                    <option className = "firstOption" value="" hidden = "true">Pilih Status</option>
                                    <option value="baru">Baru</option>
                                    {/* <option value="proses">Proses</option>
                                    <option value="selesai">Selesai</option>
                                    <option value="diambil">Diambil</option> */}
                                </Form>
                            </Form.Group>
                            <Form.Label> Status Pembayaran </Form.Label>
                            <Form.Select id= "mySelect" value={this.state.dibayar} 
                            onChange={ev => this.setState({dibayar: ev.target.value})}>
                                <option className = "firstOption"  value="" hidden = "true">Pilih Status Pembayaran</option>
                                <option value="dibayar">Di Bayar</option>
                                <option value="belum_dibayar">Belum Dibayar</option>
                            </Form.Select>
                            {/* <Form.Group className="mb-2">
                            <Form.Label> dibayar </Form.Label>
                                <Form.Select value={this.state.dibayar} 
                                onChange={ev => this.setState({dibayar: ev.target.value})}>
                                    <option value="dibayar">Dibayar</option>
                                    <option value="belum_dibayar">Belum dibayar</option>
                                </Form.Select>
                            </Form.Group> */}
                            {/* <Form.Group className="mb-2">
                                <Form.Label> id User </Form.Label>
                                <Form.Control type="number" value={this.state.id_user}
                                onChange={ev => this.setState({id_user: ev.target.value})} />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label> id Outlet </Form.Label>
                                <Form.Control type="number" value={this.state.id_outlet}
                                onChange={ev => this.setState({id_outlet: ev.target.value})} />
                                
                            </Form.Group> */}
                            <br />
                            <div className="d-grid gap-2">
                                <Button variant="dark" type="submit" onHide={this.handleClose}>
                                    Submit
                                </Button>
                            </div>
                        </Modal.Body>
                    </Form>
                </Modal>
                <Modal show={this.state.isModalOpen1} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>FORM EDIT TRANSAKSI</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={this.handleSave}>
                        <Modal.Body>
                       
                            <Form.Group className="mb-2">
                            <Form.Label> status </Form.Label>
                                <Form.Select id="mySelect" value={this.state.status} 
                                onChange={ev => this.setState({status: ev.target.value})}>
                                    <option className = "firstOption" value="" hidden = "true">Pilih Status</option>
                                    <option value="baru">Baru</option>
                                    <option value="proses">Proses</option>
                                    <option value="selesai">Selesai</option>
                                    <option value="diambil">Diambil</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Label> Status Pembayaran </Form.Label>
                            <Form.Select id= "mySelect" value={this.state.dibayar} 
                            onChange={ev => this.setState({dibayar: ev.target.value})}>
                                <option className = "firstOption"  value="" hidden = "true">Pilih Status Pembayaran</option>
                                <option value="dibayar">Di Bayar</option>
                                <option value="belum_dibayar">Belum Dibayar</option>
                            </Form.Select>
                            {/* <Form.Group className="mb-2">
                            <Form.Label> dibayar </Form.Label>
                                <Form.Select value={this.state.dibayar} 
                                onChange={ev => this.setState({dibayar: ev.target.value})}>
                                    <option value="dibayar">Dibayar</option>
                                    <option value="belum_dibayar">Belum dibayar</option>
                                </Form.Select>
                            </Form.Group> */}
                            {/* <Form.Group className="mb-2">
                                <Form.Label> id User </Form.Label>
                                <Form.Control type="number" value={this.state.id_user}
                                onChange={ev => this.setState({id_user: ev.target.value})} />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label> id Outlet </Form.Label>
                                <Form.Control type="number" value={this.state.id_outlet}
                                onChange={ev => this.setState({id_outlet: ev.target.value})} />
                                
                            </Form.Group> */}
                            <br />
                            <div className="d-grid gap-2">
                                <Button variant="dark" type="submit">
                                    Submit
                                </Button>
                            </div>
                            
                        </Modal.Body>
                    </Form>
                </Modal>
                <Modal id show={this.state.isModalPrint} onHide={this.handleClosePrint}>
                <Modal.Header closeButton>
                    <Modal.Title>Form Detail Transaksi {' '} 
                    </Modal.Title>                    
                </Modal.Header>
                {this.state.pakets.map(paket => (
                <Form>
                    
                    <Modal.Body>
                    <div ref={ref}>
                    <Form.Group className="mb-2">
                    <Form.Text>
                            <h6><b> Nama Paket:</b> {paket.jenis}</h6>
                            </Form.Text>
                        </Form.Group>
                        {/* <Form.Group  className="mb-2">
                            <Form.Text>
                            <h6> <b>Nama Member :</b> {transaksi.member.nama}</h6>
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-2">
                        <Form.Text>
                            <h6><b> Nama Outlet :</b> {transaksi.outlet.denama}</h6>
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Text>
                            <h6><b>Tgl Bayar : </b>{moment(transaksi.tgl_bayar).format('DD-MM-YYYY')}</h6>
                            </Form.Text>
                        </Form.Group>
                        <Form.Group  className="mb-2">
                            <Form.Text>
                            <h6><b> Paket : </b>{transaksi.paket}</h6>
                            </Form.Text>
                        </Form.Group>
                        <Form.Group  className="mb-2">
                            <Form.Text>
                            <h6><b> Jumlah : </b>{transaksi.qty}</h6>
                            </Form.Text>
                        </Form.Group>
                        <div className="divider"></div>
                        <Form.Group className="mb-2 ">
                        <Form.Text>  
                            <h6><b> Status :</b> {this.GantiStatus(transaksi.status)}</h6>
                            </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-2">
                            <Form.Text>  
                            <h6><b>Status Pembayaran : </b>{this.GantiStatusBayar(transaksi.id_transaksi, transaksi.dibayar)}</h6>
                            </Form.Text>
                            </Form.Group>*/}
                            </div>  
                        <div className="mb-2">
                        <Pdf targetRef={ref} filename="struk-pembayaran.pdf" x={1.5} y={0.5} scale={1.8}>
                                        {({ toPdf }) => <Button variant="primary" onClick={toPdf}>Paket</Button>}
                         </Pdf>
                        </div>
                    </Modal.Body>
                </Form> 
                ))}
            </Modal>
            </div>
        );
    }
}
