import React, { useEffect, useState } from 'react';
import * as service from "../../service/ProductServie"
import Header from '../Header';
import Footer from '../Footer';
import { Link, NavLink } from 'react-router-dom';
import MySwal from "sweetalert2";
import { Button, Modal } from 'react-bootstrap';
import '../style.css'

const Order = () => {
    const [carts, setCarts] = useState([])
    const [arr, setArr] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [account, setAccount] = useState({})
    const accessToken = sessionStorage.getItem('accessToken')
    const userId = sessionStorage.getItem('userId')
    const [showModal, setShowModal] = useState(false)
    const fetchApi = async () => {
        let res = await service.getAllCartAdmin(accessToken)
        setCarts(res)
        // let res2 = await service.getCart(userId, accessToken)
        // setCartItems(res2)
        console.log(res);
    }

    function formatNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    const handleClick = async (cart) => {
        let ress = await service.getCartItemByCartId(cart.id, accessToken);
        console.log(ress);
        setCartItems(ress);
        console.log(ress);
        setIsOpen(true)
    }

    useEffect(() => {
        fetchApi()
        console.log(carts);
    }, [])
    const handleClose = () => {
        setIsOpen(false)
    }
    const handleCloseModal = () => {
        setShowModal(false)
    }
    const handleClickEmail = (cart) => {
        setAccount(cart.account)
        setShowModal(true)
    }
    return (
        <div>
            <Header />
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header>
                    <Modal.Title >Order Detail</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Phone Number</th>
                                <th>Birth day</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr >
                                <td>{account.id}</td>
                                <td>
                                    {account.email}
                                </td>
                                <td>{account.address}</td>

                                <td className="item-title">{account.phoneNumber}</td>
                                <td className="item-price">
                                    {account.birthday}
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className='btn btn-danger' onClick={handleCloseModal}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
            <Modal show={isOpen} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title >Order Detail</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Image</th>
                                <th>Category</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((cartItem, index) => (
                                <tr key={`cart-page-result-${index}`}>
                                    <td>{cartItem.product.name}</td>
                                    <td>
                                        <img src={cartItem.product.image} style={{ width: '100px', height: '100px' }} />
                                    </td>
                                    <td>{cartItem.product.category.name}</td>

                                    <td className="item-title">{cartItem.quantity}</td>
                                    <td className="item-price">
                                        <span className="amount full-price" style={{ color: "rgb(113,192,239)" }}>{formatNumber(cartItem.price)}$</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className='btn btn-danger' onClick={handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
            <div style={{ paddingTop: '100px' }}>
                <div className="container-fluid">

                    <div className="row">
                        {/* Thanh bên trái */}
                        <div className="col-md-2 sidebar">
                            <h3>Menu</h3>
                            <ul className="nav flex-column">
                                <li className="nav-item product-remove">
                                    <NavLink to={'/admin'} className="nav-link active ">
                                        Product
                                    </NavLink>
                                </li>
                                <li className="nav-item product-remove">
                                    <NavLink className="nav-link">
                                        Account
                                    </NavLink>
                                </li>
                                <li className="nav-item product-remove">
                                    <NavLink className="nav-link">
                                        Order
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                        <div className='col-md-10' style={{ maxHeight: '400px', overflowY: 'auto' }}>
                            <h3 style={{ textAlign: 'center' }}>Order</h3>
                            <table>
                                <tr>
                                    <th>#</th>
                                    <th>Date</th>
                                    <th>Total Amount</th>
                                    <th>Status</th>
                                    <th>Detail</th>
                                    <th>Account</th>
                                </tr>
                                {carts.length !== 0 ? (
                                    carts.map((cart, index) => (

                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{cart.createDate}</td>
                                            <td>{cart.totalPrice ? <span>{cart.totalPrice} $</span> : "UnPain no have total"}</td>
                                            <td>{cart.status ? <span style={{ color: 'blue' }}>Pain</span> : <span style={{ color: 'red' }}>UnPain</span>}</td>
                                            <td>
                                                <button onClick={() => handleClick(cart)} style={{ backgroundColor: "rgb(113,192,239)" }}>View detail</button>
                                            </td>
                                            <td>
                                                <Link onClick={() => handleClickEmail(cart)}>
                                                    {cart.account.email}

                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (<span>Empty</span>)}
                            </table>
                        </div>

                    </div>

                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Order;