import React, { useEffect, useState } from 'react';
import { MdOutlineSearch } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import * as service from "../service/ProductServie"

const Header2 = (props) => {
    const [sumCart, setSumCart] = useState(0);

    useEffect(() => {
        const fetchApi1 = async (accountId) => {
            try {
                let res1 = await service.getCart(accountId);
                setSumCart(res1.length)
            } catch (e) {
                setSumCart(0)
            }
        };
        fetchApi1(1);
    }, [props]);
    return (
        <div>
            <header
                id="header"
                className="header style-02 header-dark header-sticky header-transparent" style={{ position: 'fixed' }}
            >
                <div className="header-wrap-stick">
                    <div className="header-position">
                        <div className="header-middle">
                            <div className="kodory-menu-wapper" />
                            <div className="header-middle-inner">
                                <div className="header-search-menu">
                                    <div className="block-menu-bar">
                                        <a className="menu-bar menu-toggle" href="#">
                                            <span />
                                            <span />
                                            <span />
                                        </a>
                                    </div>
                                </div>
                                <div className="header-logo-nav">
                                    <div className="header-logo">
                                        <Link to={'/'}>
                                            <img
                                                alt="Kodory"
                                                src="https://dreamingtheme.kiendaotac.com/html/kodory/assets/images/logo.png"
                                                className="logo"
                                            />
                                        </Link>
                                    </div>
                                    <div className="box-header-nav menu-nocenter">
                                        <ul
                                            id="menu-primary-menu"
                                            className="clone-main-menu kodory-clone-mobile-menu kodory-nav main-menu"
                                        >

                                            <li
                                                id="menu-item-996"
                                                className="menu-item menu-item-type-post_type menu-item-object-megamenu menu-item-996 parent parent-megamenu item-megamenu menu-item-has-children"
                                            >
                                                <Link
                                                    className="kodory-menu-item-title"
                                                    to={'/blog'}
                                                >
                                                    Blog
                                                </Link>

                                            </li>
                                            <li
                                                id="menu-item-237"
                                                className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-237 parent"
                                            >
                                                <a className="kodory-menu-item-title" title="Pages" href="#">
                                                    Pages
                                                </a>
                                                <span className="toggle-submenu" />
                                                <ul role="menu" className="submenu">
                                                    <li
                                                        id="menu-item-987"
                                                        className="menu-item menu-item-type-custom menu-item-object-custom menu-item-987"
                                                    >
                                                        <a
                                                            className="kodory-menu-item-title"
                                                            title="About"
                                                            href="about.html"
                                                        >
                                                            About
                                                        </a>
                                                    </li>
                                                    <li
                                                        id="menu-item-988"
                                                        className="menu-item menu-item-type-custom menu-item-object-custom menu-item-988"
                                                    >
                                                        <a
                                                            className="kodory-menu-item-title"
                                                            title="Contact"
                                                            href="contact.html"
                                                        >
                                                            Contact
                                                        </a>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="header-control">
                                    <div className="header-control-inner">
                                        <div className="meta-dreaming">

                                            <div className="header-search kodory-dropdown">
                                                {/* <div
                                                    className="header-search-inner"
                                                    data-kodory="kodory-dropdown"
                                                >
                                                    <a href="#" className="link-dropdown block-link">
                                                        <span className="flaticon-magnifying-glass-1" />
                                                    </a>
                                                </div> */}
                                                <div className="block-search">
                                                    <form
                                                        role="search"
                                                        method="get"
                                                        className="form-search block-search-form kodory-live-search-form"
                                                    >
                                                        <div className="form-content search-box results-search">
                                                            <div className="inner">
                                                                <input
                                                                    autoComplete="off"
                                                                    className="searchfield txt-livesearch input"
                                                                    name="s"
                                                                    defaultValue=""
                                                                    placeholder="Search here..."
                                                                    type="text"
                                                                />
                                                            </div>
                                                        </div>
                                                        <input
                                                            name="post_type"
                                                            defaultValue="product"
                                                            type="hidden"
                                                        />
                                                        <input
                                                            name="taxonomy"
                                                            defaultValue="product_cat"
                                                            type="hidden"
                                                        />
                                                        <div className="category">
                                                            <select
                                                                title="product_cat"
                                                                name="product_cat"
                                                                id={64788262}
                                                                className="category-search-option"
                                                                tabIndex={-1}
                                                                style={{ display: "none" }}
                                                            >
                                                                <option value={0}>All Categories</option>
                                                                <option className="level-0" value="Toy">
                                                                    Toys
                                                                </option>
                                                                <option className="level-0" value="Teddy Bear">
                                                                    Teddy Bear
                                                                </option>
                                                                <option className="level-0" value="Clothing">
                                                                    Clothing
                                                                </option>
                                                                <option className="level-0" value="Backpack">
                                                                    Backpack
                                                                </option>
                                                                <option className="level-0" value="new-arrivals">
                                                                    New arrivals
                                                                </option>
                                                                <option className="level-0" value="Footwear">
                                                                    Footwear
                                                                </option>
                                                                <option className="level-0" value="T-shirt">
                                                                    T-shirt
                                                                </option>
                                                                <option className="level-0" value="Hoodie">
                                                                    Hoodie
                                                                </option>
                                                            </select>
                                                        </div>
                                                        <button type="submit" className="btn-submit">
                                                            <span className="flaticon-magnifying-glass-1" />
                                                        </button>
                                                    </form>
                                                    {/* block search */}
                                                </div>
                                            </div>
                                            <div className="kodory-dropdown-close">x</div>
                                            <div className="menu-item block-user block-dreaming kodory-dropdown">
                                                <a className="block-link" href="my-account.html">
                                                    <span><FaRegUserCircle /></span>
                                                </a>
                                                <ul className="sub-menu">

                                                    <li className="menu-item kodory-MyAccount-navigation-link kodory-MyAccount-navigation-link--edit-account">
                                                        <a href="#">Account details</a>
                                                    </li>
                                                    <li className="menu-item kodory-MyAccount-navigation-link kodory-MyAccount-navigation-link--customer-logout">
                                                        <a href="#">Logout</a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="block-minicart block-dreaming kodory-mini-cart kodory-dropdown">
                                                <div
                                                    className="shopcart-dropdown block-cart-link"
                                                    data-kodory="kodory-dropdown"
                                                >
                                                    <Link to={"/cart"} className="block-link link-dropdown" href="cart.html">
                                                        <span><IoCartOutline /></span>
                                                        <span className="count">{sumCart}</span>
                                                    </Link>
                                                </div>
                                                <div className="widget kodory widget_shopping_cart">
                                                    <div className="widget_shopping_cart_content">
                                                        <h3 className="minicart-title">
                                                            Your Cart
                                                            <span className="minicart-number-items">3</span>
                                                        </h3>
                                                        <ul className="kodory-mini-cart cart_list product_list_widget">
                                                            <li className="kodory-mini-cart-item mini_cart_item">
                                                                <a
                                                                    href="#"
                                                                    className="remove remove_from_cart_button"
                                                                >
                                                                    ×
                                                                </a>
                                                                <a href="#">
                                                                    <img
                                                                        src="assets/images/apro134-1-600x778.jpg"
                                                                        className="attachment-kodory_thumbnail size-kodory_thumbnail"
                                                                        alt="img"
                                                                        width={600}
                                                                        height={778}
                                                                    />
                                                                    T-shirt with skirt – Pink&nbsp;
                                                                </a>
                                                                <span className="quantity">
                                                                    1 ×{" "}
                                                                    <span className="kodory-Price-amount amount">
                                                                        <span className="kodory-Price-currencySymbol">
                                                                            $
                                                                        </span>
                                                                        150.00
                                                                    </span>
                                                                </span>
                                                            </li>
                                                            <li className="kodory-mini-cart-item mini_cart_item">
                                                                <a
                                                                    href="#"
                                                                    className="remove remove_from_cart_button"
                                                                >
                                                                    ×
                                                                </a>
                                                                <a href="#">
                                                                    <img
                                                                        src="assets/images/apro1113-600x778.jpg"
                                                                        className="attachment-kodory_thumbnail size-kodory_thumbnail"
                                                                        alt="img"
                                                                        width={600}
                                                                        height={778}
                                                                    />
                                                                    Ethereal Toys&nbsp;
                                                                </a>
                                                                <span className="quantity">
                                                                    1 ×{" "}
                                                                    <span className="kodory-Price-amount amount">
                                                                        <span className="kodory-Price-currencySymbol">
                                                                            $
                                                                        </span>
                                                                        129.00
                                                                    </span>
                                                                </span>
                                                            </li>
                                                            <li className="kodory-mini-cart-item mini_cart_item">
                                                                <a
                                                                    href="#"
                                                                    className="remove remove_from_cart_button"
                                                                >
                                                                    ×
                                                                </a>
                                                                <a href="#">
                                                                    <img
                                                                        src="assets/images/apro201-1-600x778.jpg"
                                                                        className="attachment-kodory_thumbnail size-kodory_thumbnail"
                                                                        alt="img"
                                                                        width={600}
                                                                        height={778}
                                                                    />
                                                                    Red Car&nbsp;
                                                                </a>
                                                                <span className="quantity">
                                                                    1 ×{" "}
                                                                    <span className="kodory-Price-amount amount">
                                                                        <span className="kodory-Price-currencySymbol">
                                                                            $
                                                                        </span>
                                                                        139.00
                                                                    </span>
                                                                </span>
                                                            </li>
                                                        </ul>
                                                        <p className="kodory-mini-cart__total total">
                                                            <strong>Subtotal:</strong>
                                                            <span className="kodory-Price-amount amount">
                                                                <span className="kodory-Price-currencySymbol">$</span>
                                                                418.00
                                                            </span>
                                                        </p>
                                                        <p className="kodory-mini-cart__buttons buttons">
                                                            <a href="cart.html" className="button kodory-forward">
                                                                Viewcart
                                                            </a>
                                                            <a
                                                                href="checkout.html"
                                                                className="button checkout kodory-forward"
                                                            >
                                                                Checkout
                                                            </a>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="header-mobile">
                    <div className="header-mobile-left">
                        <div className="block-menu-bar">
                            <a className="menu-bar menu-toggle" href="#">
                                <span />
                                <span />
                                <span />
                            </a>
                        </div>
                        <div className="header-search kodory-dropdown">
                            <div className="header-search-inner" data-kodory="kodory-dropdown">
                                <a href="#" className="link-dropdown block-link">
                                    <span className="flaticon-magnifying-glass-1" />
                                </a>
                            </div>
                            <div className="block-search">
                                <form
                                    role="search"
                                    method="get"
                                    className="form-search block-search-form kodory-live-search-form"
                                >
                                    <div className="form-content search-box results-search">
                                        <div className="inner">
                                            <input
                                                autoComplete="off"
                                                className="searchfield txt-livesearch input"
                                                name="s"
                                                defaultValue=""
                                                placeholder="Search here..."
                                                type="text"
                                            />
                                        </div>
                                    </div>
                                    <input name="post_type" defaultValue="product" type="hidden" />
                                    <input name="taxonomy" defaultValue="product_cat" type="hidden" />
                                    <div className="category">
                                        <select
                                            title="product_cat"
                                            name="product_cat"
                                            className="category-search-option"
                                            tabIndex={-1}
                                        >
                                            <option value={0}>All Categories</option>
                                            <option className="level-0" value="Toy">
                                                Toys
                                            </option>
                                            <option className="level-0" value="Teddy Bear">
                                                Teddy Bear
                                            </option>
                                            <option className="level-0" value="Clothing">
                                                Clothing
                                            </option>
                                            <option className="level-0" value="Backpack">
                                                Backpack
                                            </option>
                                            <option className="level-0" value="new-arrivals">
                                                New arrivals
                                            </option>
                                            <option className="level-0" value="Footwear">
                                                Footwear
                                            </option>
                                            <option className="level-0" value="T-shirt">
                                                T-shirt
                                            </option>
                                            <option className="level-0" value="Hoodie">
                                                Hoodie
                                            </option>
                                        </select>
                                    </div>
                                    <button type="submit" className="btn-submit">
                                        <span className="flaticon-magnifying-glass-1" />
                                    </button>
                                </form>
                                {/* block search */}
                            </div>
                        </div>
                        <ul className="wpml-menu">
                            <li className="menu-item kodory-dropdown block-language">
                                <a href="#" data-kodory="kodory-dropdown">
                                    <img src="assets/images/en.png" alt="en" width={18} height={12} />
                                    English
                                </a>
                                <span className="toggle-submenu" />
                                <ul className="sub-menu">
                                    <li className="menu-item">
                                        <a href="#">
                                            <img
                                                src="assets/images/it.png"
                                                alt="it"
                                                width={18}
                                                height={12}
                                            />
                                            Italiano
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className="menu-item">
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
                            </li>
                        </ul>
                    </div>
                    <div className="header-mobile-mid">
                        <div className="header-logo">
                            <a href="index.html">
                                <img alt="Kodory" src="assets/images/logo.png" className="logo" />
                            </a>
                        </div>
                    </div>
                    <div className="header-mobile-right">
                        <div className="header-control-inner">
                            <div className="meta-dreaming">
                                <div className="menu-item block-user block-dreaming kodory-dropdown">
                                    <a className="block-link" href="my-account.html">
                                        <span className="flaticon-profile" />
                                    </a>
                                    <ul className="sub-menu">

                                        <li className="menu-item kodory-MyAccount-navigation-link kodory-MyAccount-navigation-link--edit-account">
                                            <a href="#">Account details</a>
                                        </li>
                                        <li className="menu-item kodory-MyAccount-navigation-link kodory-MyAccount-navigation-link--customer-logout">
                                            <a href="#">Logout</a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="block-minicart block-dreaming kodory-mini-cart kodory-dropdown">
                                    <div
                                        className="shopcart-dropdown block-cart-link"
                                        data-kodory="kodory-dropdown"
                                    >
                                        <a className="block-link link-dropdown" href="cart.html">
                                            <span className="flaticon-shopping-bag-1" />
                                            <span className="count">3</span>
                                        </a>
                                    </div>
                                    <div className="widget kodory widget_shopping_cart">
                                        <div className="widget_shopping_cart_content">
                                            <h3 className="minicart-title">
                                                Your Cart<span className="minicart-number-items">3</span>
                                            </h3>
                                            <ul className="kodory-mini-cart cart_list product_list_widget">
                                                <li className="kodory-mini-cart-item mini_cart_item">
                                                    <a href="#" className="remove remove_from_cart_button">
                                                        ×
                                                    </a>
                                                    <a href="#">
                                                        <img
                                                            src="assets/images/apro134-1-600x778.jpg"
                                                            className="attachment-kodory_thumbnail size-kodory_thumbnail"
                                                            alt="img"
                                                            width={600}
                                                            height={778}
                                                        />
                                                        T-shirt with skirt – Pink&nbsp;
                                                    </a>
                                                    <span className="quantity">
                                                        1 ×{" "}
                                                        <span className="kodory-Price-amount amount">
                                                            <span className="kodory-Price-currencySymbol">$</span>
                                                            150.00
                                                        </span>
                                                    </span>
                                                </li>
                                                <li className="kodory-mini-cart-item mini_cart_item">
                                                    <a href="#" className="remove remove_from_cart_button">
                                                        ×
                                                    </a>
                                                    <a href="#">
                                                        <img
                                                            src="assets/images/apro1113-600x778.jpg"
                                                            className="attachment-kodory_thumbnail size-kodory_thumbnail"
                                                            alt="img"
                                                            width={600}
                                                            height={778}
                                                        />
                                                        Ethereal Toys&nbsp;
                                                    </a>
                                                    <span className="quantity">
                                                        1 ×{" "}
                                                        <span className="kodory-Price-amount amount">
                                                            <span className="kodory-Price-currencySymbol">$</span>
                                                            129.00
                                                        </span>
                                                    </span>
                                                </li>
                                                <li className="kodory-mini-cart-item mini_cart_item">
                                                    <a href="#" className="remove remove_from_cart_button">
                                                        ×
                                                    </a>
                                                    <a href="#">
                                                        <img
                                                            src="assets/images/apro201-1-600x778.jpg"
                                                            className="attachment-kodory_thumbnail size-kodory_thumbnail"
                                                            alt="img"
                                                            width={600}
                                                            height={778}
                                                        />
                                                        Red Car&nbsp;
                                                    </a>
                                                    <span className="quantity">
                                                        1 ×{" "}
                                                        <span className="kodory-Price-amount amount">
                                                            <span className="kodory-Price-currencySymbol">$</span>
                                                            139.00
                                                        </span>
                                                    </span>
                                                </li>
                                            </ul>
                                            <p className="kodory-mini-cart__total total">
                                                <strong>Subtotal:</strong>
                                                <span className="kodory-Price-amount amount">
                                                    <span className="kodory-Price-currencySymbol">$</span>418.00
                                                </span>
                                            </p>
                                            <p className="kodory-mini-cart__buttons buttons">
                                                <a href="cart.html" className="button kodory-forward">
                                                    Viewcart
                                                </a>
                                                <a
                                                    href="checkout.html"
                                                    className="button checkout kodory-forward"
                                                >
                                                    Checkout
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

        </div>
    );
};

export default Header2;