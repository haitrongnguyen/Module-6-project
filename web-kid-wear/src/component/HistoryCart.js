import React, { useEffect, useState } from 'react';
import * as service from "../service/ProductServie"
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import MySwal from "sweetalert2";
import { Button, Modal } from 'react-bootstrap';
import './style.css'
const HistoryCart = () => {
    const [carts, setCarts] = useState([])
    const [arr, setArr] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [account, setAccount] = useState({})
    const accessToken = sessionStorage.getItem('accessToken')
    const userId = sessionStorage.getItem('userId')
    const fetchApi = async () => {
        let res = await service.getAllCart(userId, accessToken)
        setCarts(res)
        // let res2 = await service.getCart(userId, accessToken)
        // setCartItems(res2)
        let res1 = await service.getAccount(userId, accessToken)
        setAccount(res1)
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

    return (
        <div style={{ backgroundColor: 'white' }}>
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
                            {cartItems && (

                                cartItems.map((cartItem, index) => (
                                    <tr key={`cart-page-result-${index}`}>
                                        <td>{cartItem.product.name}</td>
                                        <td>
                                            <img src={cartItem.product.image} style={{ width: '100px', height: '100px' }} />
                                        </td>
                                        <td>{cartItem.product.category.name}</td>

                                        <td className="item-title">{cartItem.quantity}</td>
                                        <td className="item-price">
                                            <span className="amount full-price" style={{ color: "rgb(113,192,239)" }}>{formatNumber(cartItem.price * cartItem.quantity)}$</span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className='btn btn-danger' onClick={handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
            <Header />
            <div class="banner-wrapper has_background">
                <img src="https://dreamingtheme.kiendaotac.com/html/kodory/assets/images/banner-for-all2.jpg"
                    class="img-responsive attachment-1920x447 size-1920x447" alt="img" />
                <div class="banner-wrapper-inner container">
                    <h1 class="page-title">Account Detail</h1>
                    <div role="navigation" aria-label="Breadcrumbs" class="breadcrumb-trail breadcrumbs">
                        <ul class="trail-items breadcrumb">
                            <li class="trail-item trail-begin"><a href="index.html"><span>Home</span></a></li>
                            <li class="trail-item trail-end active"><span>Account Detail</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div style={{ paddingTop: '50px' }}>
                <div className="container-fluid">
                    <div className="row">
                        {/* Thanh bên trái */}
                        <div className="col-md-3 sidebar">
                            <h3>Menu</h3>
                            <ul className="nav flex-column">
                                <li className="nav-item product-remove">
                                    <Link className="nav-link active " to={`/account/${userId}`}>
                                        Account Detail
                                    </Link>
                                </li>
                                <li className="nav-item product-remove">
                                    <Link className="nav-link" to={`/changePassword/${userId}`}>
                                        Change Password
                                    </Link>
                                </li>
                                <li className="nav-item product-remove">
                                    <Link className="nav-link" to={'/history'}>
                                        History Booking
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className='col-md-8'>
                            <h3 style={{ textAlign: 'center' }}>History</h3>
                            <table>
                                <tr>
                                    <th>#</th>
                                    <th>Date</th>
                                    <th>Total Amount</th>
                                    <th>Status</th>
                                    <th>Detail</th>
                                </tr>
                                {carts.length !== 0 ? (
                                    carts.map((cart, index) => (
                                        <tr>
                                            <td>{index}</td>
                                            <td>{cart.createDate}</td>
                                            <td>{cart.totalPrice ? <span>{cart.totalPrice} $</span> : "UnPain no have total"}</td>
                                            <td>{cart.status ? <span style={{ color: 'blue' }}>Pain</span> : <span style={{ color: 'red' }}>UnPain</span>}</td>
                                            <td>
                                                <button onClick={() => handleClick(cart)} style={{ backgroundColor: "rgb(113,192,239)" }}>View detail</button>
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

export default HistoryCart;