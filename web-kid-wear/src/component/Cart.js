import React, { useEffect, useState } from 'react';
import Header2 from './Header2';
import Footer from './Footer';
import * as service from "../service/ProductServie"
import Swal from "sweetalert2";
import "./style.css"
import { Link } from 'react-router-dom';
import Header from './Header';
import Paypal from './Paypal';
import { ToastContainer, toast } from 'react-toastify';
import { set } from 'firebase/database';


const Cart = () => {
    const [flag, setFlag] = useState(false)
    const [cart, setCart] = useState([]);
    const [show, setShow] = useState(false)
    const [cartId, setCartId] = useState(0);
    const [sum, setSum] = useState(0)
    const [status, setStatus] = useState(false)
    const userId = sessionStorage.getItem('userId')
    const accessToken = sessionStorage.getItem('accessToken')
    const [nameProduct, setNameProduct] = useState([])
    useEffect(() => {
        const fetchApi = async (accountId, accessToken) => {
            console.log(userId);
            console.log(accessToken);
            try {
                const cartId = await service.getCartId(accountId, accessToken);
                setCartId(cartId)
                const result = await service.getCart(accountId, accessToken);
                setCart(result)
                console.log(result);
                const result1 = await service.getSum(accountId, accessToken);
                setSum(result1)
                console.log(sum);
                document.title = "Cart"
            } catch (e) {
                console.log(e);
            }
        };
        fetchApi(userId, accessToken)
    }, [flag, nameProduct]);
    const handlePlus = async (cartItem, id) => {
        await service.plusQuantity(id, accessToken)
        setFlag(!flag)
    }
    const handleDiv = async (id) => {

        await service.divQuantity(id, accessToken)
        setFlag(!flag)
    }
    const alert = (cartItem) => {
        Swal.fire({
            title: "Do you want to delete this product? ",
            text: "You definitely want to delete the product " + cartItem.product.name + " ?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
            customClass: {
                popup: 'my-swal-popup',
                header: 'my-swal-header',
                title: 'my-swal-title',
                closeButton: 'my-swal-closeButton',
                content: 'my-swal-content',
                actions: 'my-swal-actions',
                confirmButton: 'my-swal-confirmButton',
                cancelButton: 'my-swal-cancelButton',
                footer: 'my-swal-footer'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                setFlag(!flag)
                Swal.fire({
                    title: "Done !",
                    icon: "success",
                    confirmButtonText: "OK",
                    customClass: {
                        confirmButton: 'my-swal-confirmButton',

                    }
                });

                service.deleteCartItem(cartItem.id, accessToken)
            }
        });
    }
    const handleDelete = async (cartItem) => {
        alert(cartItem)
    }
    // const handleCheck = async (cartId) => {
    //     let res = await service.checkQuantity(cartId, accessToken);
    //     setFlag(!flag)
    //     console.log(res);
    //     if (res === "Ok") {
    //         setShow(true)
    //     } else {
    //         const productList = [];
    //         {
    //             res.map((cartItem, index) => (
    //                 productList.push(cartItem.product.name)
    //             ))
    //             setNameProduct(productList)
    //         }
    //         console.log(productList);
    //         await Swal.fire({
    //             title: "Done !",
    //             icon: "error",
    //             text: `Product ${nameProduct} don't enought quanlity`,
    //             confirmButtonText: "OK",
    //             customClass: {
    //                 confirmButton: 'my-swal-confirmButton',

    //             }
    //         });
    //     }
    // }
    const handleCheck = async (cartId) => {
        let res = await service.checkQuantity(cartId, accessToken);
        setFlag(!flag)
        console.log(res);
        if (res === "Ok") {
            setShow(true)
        } else {
            const productList = res.map((cartItem) => cartItem.product.name);
            setNameProduct(productList);
            await Swal.fire({
                title: "Done !",
                icon: "error",
                // Sử dụng giá trị của biến nameProduct tại đây
                text: `Product ${productList.join(", ")} don't enought quantity`,
                confirmButtonText: "OK",
                customClass: {
                    confirmButton: 'my-swal-confirmButton',
                }
            });
        }
    }
    return (
        <div>
            <Header />
            <div class="banner-wrapper has_background">
                <img src="https://dreamingtheme.kiendaotac.com/html/kodory/assets/images/banner-for-all2.jpg"
                    class="img-responsive attachment-1920x447 size-1920x447" alt="img" />
                <div class="banner-wrapper-inner container">
                    <h1 class="page-title">Cart</h1>
                    <div role="navigation" aria-label="Breadcrumbs" class="breadcrumb-trail breadcrumbs">
                        <ul class="trail-items breadcrumb">
                            <li class="trail-item trail-begin"><Link to={'/'}><span>Home</span></Link></li>
                            <li class="trail-item trail-end active"><span>Cart</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <main className="site-main main-container no-sidebar">
                <div className="container">
                    <div className="row">
                        <div className="main-content col-md-12">
                            <div className="page-main-content">
                                <div className="kodory">
                                    <div className="kodory-notices-wrapper" />
                                    <form className="kodory-cart-form">
                                        <table className="shop_table shop_table_responsive cart kodory-cart-form__contents">
                                            <thead>
                                                <tr>
                                                    <th className="product-remove ">Remove</th>
                                                    <th className="product-thumbnail ">Image</th>
                                                    <th className="product-name ">Product</th>
                                                    <th className="product-price ">Price</th>
                                                    <th className="product-quantity">Quantity</th>
                                                    <th className="product-subtotal">Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cart ? (
                                                    cart.map((cartItem, index) => (

                                                        <tr className="kodory-cart-form__cart-item cart_item" key={index}>

                                                            <td className="product-remove">
                                                                <a
                                                                    onClick={() => handleDelete(cartItem)}
                                                                    className="remove"
                                                                    aria-label="Remove this item"
                                                                    data-product_id={27}
                                                                    data-product_sku="885B712"
                                                                >
                                                                    ×
                                                                </a>
                                                            </td>
                                                            <td className="product-thumbnail">
                                                                <Link to={`/product/${cartItem.product.id}`}>
                                                                    <img
                                                                        src={cartItem.product.image}
                                                                        className="attachment-kodory_thumbnail size-kodory_thumbnail"
                                                                        alt="img"
                                                                        width={600}
                                                                        height={778}
                                                                    />
                                                                </Link>
                                                            </td>
                                                            <td className="product-name" data-title="Product">
                                                                <Link to={`/product/${cartItem.product.id}`}>
                                                                    {cartItem.product.name}
                                                                </Link>
                                                            </td>
                                                            <td className="product-price" data-title="Price">
                                                                <span className="kodory-Price-amount amount">
                                                                    <span className="kodory-Price-currencySymbol">$</span>
                                                                    {cartItem.price}
                                                                </span>
                                                            </td>
                                                            <td className="product-quantity" data-title="Quantity">
                                                                <div className="quantity" >

                                                                    <span className="qty-label">Quantiy:</span>
                                                                    <div className="control">
                                                                        {cartItem.quantity > 1 ? (

                                                                            <a
                                                                                className="btn-number qtyminus quantity-minus"
                                                                                onClick={() => handleDiv(cartItem.id)}
                                                                            >
                                                                                -
                                                                            </a>
                                                                        ) : (<span></span>)}
                                                                        {/* <p style={{ marginTop: '5px' }}>{cartItem.quantity}</p> */}
                                                                        <input title="Qty" value={cartItem.quantity}
                                                                            className="input-qty input-text qty text" />
                                                                        {cartItem.quantity < cartItem.product.quantity ? (

                                                                            <a
                                                                                className="btn-number qtyplus quantity-plus"
                                                                                onClick={() => handlePlus(cartItem, cartItem.id)}
                                                                            >
                                                                                +
                                                                            </a>
                                                                        ) : (<span></span>)}
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="product-subtotal" data-title="Total">
                                                                <span className="kodory-Price-amount amount">
                                                                    <span className="kodory-Price-currencySymbol">$</span>
                                                                    {(cartItem.price * cartItem.quantity).toFixed(2)}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (<p>Cart Emty</p>)}


                                            </tbody>
                                        </table>
                                    </form>
                                    <div className="cart-collaterals">
                                        <div className="cart_totals ">
                                            <h2>Cart totals</h2>
                                            <table className="shop_table shop_table_responsive">
                                                <tbody>
                                                    <tr className="cart-subtotal">
                                                        <th>Subtotal</th>
                                                        <td data-title="Subtotal">
                                                            <span className="kodory-Price-amount amount">
                                                                <span className="kodory-Price-currencySymbol">$</span>
                                                                <span className="kodory-Price-currencySymbol">{sum.toFixed(2)}</span>
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr className="order-total">
                                                        <th>Total</th>
                                                        <td data-title="Total">
                                                            <strong>
                                                                <span className="kodory-Price-amount amount">
                                                                    <span className="kodory-Price-currencySymbol">
                                                                        $
                                                                    </span>
                                                                    {sum.toFixed(2)}
                                                                </span>
                                                            </strong>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            {show ? (

                                                <div className="kodory-proceed-to-checkout">
                                                    <div className="btn" style={{ width: '100%', marginLeft: '15%' }}>

                                                        <Paypal data={{
                                                            "id": cartId,
                                                            "amount": sum.toFixed(2)
                                                        }} />
                                                    </div>
                                                </div>

                                            ) : (

                                                <div className="kodory-proceed-to-checkout">
                                                    <a
                                                        onClick={() => handleCheck(cartId)}
                                                        className="checkout-button button alt kodory-forward"
                                                        style={{ color: 'white' }}
                                                    >
                                                        Proceed to checkout
                                                    </a>
                                                </div>

                                            )
                                            }


                                        </div>
                                    </div>
                                    <div className="col-md-12 col-sm-12 dreaming_crosssell-product">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main >
            <ToastContainer />
            <Footer />
        </div >
    );
};

export default Cart;