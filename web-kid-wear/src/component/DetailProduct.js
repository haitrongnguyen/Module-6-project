import React, { useEffect, useState } from 'react';
import Header2 from './Header2';
import Footer from './Footer';
import { Link, useParams } from 'react-router-dom';
import * as service from "../service/ProductServie"
import Header from './Header';
import { ToastContainer, toast } from 'react-toastify';

const DetailProduct = () => {
    const [quantity, setQuantity] = useState(1)
    const [sum, setSum] = useState(false);
    const { id } = useParams()
    const [product, setProduct] = useState({})
    const accessToken = sessionStorage.getItem('accessToken');
    const userIdSt = sessionStorage.getItem('userId')
    useEffect(() => {
        const fetchApi = async (id) => {
            try {
                const result = await service.getProduct(id);
                setProduct(result)
                document.title = result.name;
            } catch (e) {
                console.log(e);
            }
        };
        fetchApi(id)
    }, [quantity])
    const handlePush = async () => {
        let res = await service.addToCart(product.id, userIdSt, quantity, accessToken);
        toast.success('Add to cart successfully!', {
            autoClose: 3000 // Tự đóng sau 3 giây (3000 ms)
        });
        if (!sum) {

            setSum(true);
        } else {
            setSum(false)
        }
    };
    return (
        <div>
            <Header props={sum} />
            <div class="banner-wrapper has_background">
                <img src="https://dreamingtheme.kiendaotac.com/html/kodory/assets/images/banner-for-all2.jpg"
                    class="img-responsive attachment-1920x447 size-1920x447" alt="img" />
                <div class="banner-wrapper-inner container">
                    <h1 class="page-title">Product Detail</h1>
                    <div role="navigation" aria-label="Breadcrumbs" class="breadcrumb-trail breadcrumbs">
                        <ul class="trail-items breadcrumb">
                            <li class="trail-item trail-begin"><Link to={'/'}><span>Home</span></Link></li>
                            <li class="trail-item trail-end active"><span>{product.name}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="single-thumb-vertical main-container shop-page no-sidebar">
                <div className="container">
                    <div className="row">
                        <div className="main-content col-md-12">
                            <div className="kodory-notices-wrapper" />
                            <div
                                id="product-27"
                                className="post-27 product type-product status-publish has-post-thumbnail product_cat-table product_cat-new-arrivals product_cat-lamp product_tag-table product_tag-sock first instock shipping-taxable purchasable product-type-variable has-default-attributes"
                            >
                                <div className="main-contain-summary">
                                    <div className="contain-left has-gallery">
                                        <div className="single-left">
                                            <div className="kodory-product-gallery kodory-product-gallery--with-images kodory-product-gallery--columns-4 images">
                                                <a href="#" className="kodory-product-gallery__trigger">
                                                    <img
                                                        draggable="false"
                                                        className="emoji"
                                                        alt="🔍"
                                                        src="https://s.w.org/images/core/emoji/11/svg/1f50d.svg"
                                                    />
                                                </a>
                                                <div className="flex-viewport">
                                                    <figure className="kodory-product-gallery__wrapper">
                                                        <div className="kodory-product-gallery__image">
                                                            <img alt="img" src={product.image} />
                                                        </div>
                                                        {/* <div className="kodory-product-gallery__image">
                                                            <img src="assets/images/apro134-1.jpg" alt="img" />
                                                        </div>
                                                        <div className="kodory-product-gallery__image">
                                                            <img
                                                                src="assets/images/apro132-1.jpg"
                                                                className=""
                                                                alt="img"
                                                            />
                                                        </div>
                                                        <div className="kodory-product-gallery__image">
                                                            <img
                                                                src="assets/images/apro133-1.jpg"
                                                                className=""
                                                                alt="img"
                                                            />
                                                        </div> */}
                                                    </figure>
                                                </div>
                                                {/* <ol className="flex-control-nav flex-control-thumbs">
                                                    <li>
                                                        <img
                                                            src="assets/images/apro131-2-100x100.jpg"
                                                            alt="img"
                                                        />
                                                    </li>
                                                    <li>
                                                        <img
                                                            src="assets/images/apro134-1-100x100.jpg"
                                                            alt="img"
                                                        />
                                                    </li>
                                                    <li>
                                                        <img
                                                            src="assets/images/apro132-1-100x100.jpg"
                                                            alt="img"
                                                        />
                                                    </li>
                                                    <li>
                                                        <img
                                                            src="assets/images/apro133-1-100x100.jpg"
                                                            alt="img"
                                                        />
                                                    </li>
                                                </ol> */}
                                            </div>
                                        </div>
                                        <div className="summary entry-summary">
                                            <div className="flash">
                                                <span className="onnew">
                                                    <span className="text">New</span>
                                                </span>
                                            </div>
                                            <h1 className="product_title entry-title">
                                                {product.name}
                                            </h1>
                                            <p className="price">
                                                <span className="kodory-Price-amount amount">
                                                    <span>Price:</span><span style={{ marginLeft: '20px' }} className="kodory-Price-currencySymbol">$</span>{product.price}
                                                </span>{" "}
                                            </p>

                                            <p className="stock">
                                                Quantity:
                                                <span style={{ marginLeft: '20px' }}>{product.quantity}</span>
                                            </p>
                                            {product.quantity > 0 ? (

                                                <p className="stock in-stock">
                                                    Availability: <span> In stock</span>
                                                </p>
                                            ) : (
                                                <p className="stock in-stock" >
                                                    Availability: <span style={{ color: "red" }}> Out of stock</span>
                                                </p>
                                            )}
                                            <div className="kodory-product-details__short-description">
                                                <p>
                                                    {product.description}
                                                </p>
                                                {/* <ul>
                                                    <li>
                                                        Water-resistant fabric with soft lycra detailing inside
                                                    </li>
                                                    <li>CLean zip-front, and three piece hood</li>
                                                    <li>Subtle branding and diagonal panel detail</li>
                                                </ul> */}
                                            </div>
                                            <div className="variations_form cart">
                                                {/* <table className="variations">
                                                    <tbody>
                                                        <tr>
                                                            <td className="label">
                                                                <label>Color</label>
                                                            </td>
                                                            <td className="value">
                                                                <select
                                                                    title="box_style"
                                                                    data-attributetype="box_style"
                                                                    data-id="pa_color"
                                                                    className="attribute-select "
                                                                    name="attribute_pa_color"
                                                                    data-attribute_name="attribute_pa_color"
                                                                    data-show_option_none="yes"
                                                                >
                                                                    <option data-type="" data-pa_color="" value="">
                                                                        Choose an option
                                                                    </option>
                                                                    <option
                                                                        data-width={30}
                                                                        data-height={30}
                                                                        data-type="color"
                                                                        data-pa_color="#3155e2"
                                                                        value="blue"
                                                                        className="attached enabled"
                                                                    >
                                                                        Blue
                                                                    </option>
                                                                    <option
                                                                        data-width={30}
                                                                        data-height={30}
                                                                        data-type="color"
                                                                        data-pa_color="#ffe59e"
                                                                        value="pink"
                                                                        className="attached enabled"
                                                                    >
                                                                        Pink
                                                                    </option>
                                                                    <option
                                                                        data-width={30}
                                                                        data-height={30}
                                                                        data-type="color"
                                                                        data-pa_color="#b6b8ba"
                                                                        value="red"
                                                                        className="attached enabled"
                                                                    >
                                                                        Red
                                                                    </option>
                                                                    <option
                                                                        data-width={30}
                                                                        data-height={30}
                                                                        data-type="color"
                                                                        data-pa_color="#e8e120"
                                                                        value="yellow"
                                                                        className="attached enabled"
                                                                    >
                                                                        Yellow
                                                                    </option>
                                                                </select>
                                                                <div
                                                                    className="data-val attribute-pa_color"
                                                                    data-attributetype="box_style"
                                                                >
                                                                    <label>
                                                                        <input type="radio" name="color" />
                                                                        <span
                                                                            className="change-value color"
                                                                            style={{ background: "#3155e2" }}
                                                                            data-value="blue"
                                                                        ></span>
                                                                    </label>
                                                                    <label>
                                                                        <input type="radio" name="color" />
                                                                        <span
                                                                            className="change-value color"
                                                                            style={{ background: "#52b745" }}
                                                                            data-value="green"
                                                                        ></span>
                                                                    </label>
                                                                    <label>
                                                                        <input type="radio" name="color" />
                                                                        <span
                                                                            className="change-value color"
                                                                            style={{ background: "#ffe59e" }}
                                                                            data-value="pink"
                                                                        ></span>
                                                                    </label>
                                                                </div>
                                                                <a
                                                                    className="reset_variations"
                                                                    href="#"
                                                                    style={{ visibility: "hidden" }}
                                                                >
                                                                    Clear
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table> */}
                                                <div className="single_variation_wrap">
                                                    <div className="kodory-variation single_variation">
                                                        <div className="kodory-variation-add-to-cart variations_button ">
                                                            <div className="quantity" style={{ height: '50px' }}>
                                                                <span className="qty-label">Quantiy:</span>
                                                                <div className="control">
                                                                    {product.quantity > 0 ? (
                                                                        <React.Fragment>
                                                                            {quantity > 1 ? (
                                                                                <a
                                                                                    className="btn-number qtyminus quantity-minus"
                                                                                    onClick={() => setQuantity(quantity - 1)}
                                                                                >
                                                                                    -
                                                                                </a>
                                                                            ) : (<span></span>)}

                                                                            <input title="Qty" value={quantity} className="input-qty input-text qty text" readOnly />

                                                                            {quantity < product.quantity ? (
                                                                                <span
                                                                                    className="btn-number qtyplus quantity-plus"
                                                                                    onClick={() => setQuantity(quantity + 1)}
                                                                                >
                                                                                    +
                                                                                </span>
                                                                            ) : (<span></span>)}
                                                                        </React.Fragment>
                                                                    ) : (


                                                                        <span></span>


                                                                    )}
                                                                </div>


                                                            </div>
                                                            {product.quantity > 0 && (

                                                                <button
                                                                    onClick={() => handlePush()}
                                                                    className="single_add_to_cart_button button alt kodory-variation-selection-needed"
                                                                >
                                                                    Add to cart
                                                                </button>
                                                            )}

                                                            <input
                                                                name="add-to-cart"
                                                                defaultValue={27}
                                                                type="hidden"
                                                            />
                                                            <input
                                                                name="product_id"
                                                                defaultValue={27}
                                                                type="hidden"
                                                            />
                                                            <input
                                                                name="variation_id"
                                                                className="variation_id"
                                                                defaultValue={0}
                                                                type="hidden"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="yith-wcwl-add-to-wishlist">
                                                <div className="yith-wcwl-add-button show">
                                                    <a
                                                        href="#"
                                                        rel="nofollow"
                                                        data-product-id={27}
                                                        data-product-type="variable"
                                                        className="add_to_wishlist"
                                                    >
                                                        Add to Wishlist
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="clear" />
                                            <a
                                                href="#"
                                                className="compare button"
                                                data-product_id={27}
                                                rel="nofollow"
                                            >
                                                Compare
                                            </a>
                                            {/* <div className="product_meta">
                                                <div className="wcml-dropdown product wcml_currency_switcher">
                                                    <ul>
                                                        <li className="wcml-cs-active-currency">
                                                            <a className="wcml-cs-item-toggle">USD</a>
                                                            <ul className="wcml-cs-submenu">
                                                                <li>
                                                                    <a>EUR</a>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <span className="posted_in">
                                                    Categories:{" "}
                                                    <a href="#" rel="tag">
                                                        {product.category.name}
                                                    </a>
                                                </span>
                                                <span className="tagged_as">
                                                </span>
                                            </div> */}
                                            <div className="kodory-share-socials">
                                                <h5 className="social-heading">Share: </h5>
                                                <a target="_blank" className="facebook" href="#">
                                                    <i className="fa fa-facebook-f" />
                                                </a>
                                                <a target="_blank" className="twitter" href="#">
                                                    <i className="fa fa-twitter" />
                                                </a>
                                                <a target="_blank" className="googleplus" href="#">
                                                    <i className="fa fa-google-plus" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="kodory-tabs kodory-tabs-wrapper">

                                    <div
                                        className="kodory-Tabs-panel kodory-Tabs-panel--description panel entry-content kodory-tab"
                                        id="tab-description"
                                        role="tabpanel"
                                        aria-labelledby="tab-title-description"
                                    >
                                        <h2>Description</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <ToastContainer />
        </div>
    );
};

export default DetailProduct;