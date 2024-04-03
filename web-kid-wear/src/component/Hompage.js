import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/animate.css'
import '../assets/css/bootstrap.min.css'
// import '../assets/css/chosen.min.css'
import '../assets/css/dreaming-attribute.css'
import '../assets/css/font-awesome.min.css'
import '../assets/css/jquery.scrollbar.css'
import '../assets/css/lightbox.min.css'
import '../assets/css/magnific-popup.css'
import '../assets/css/megamenu.css'
import '../assets/css/pe-icon-7-stroke.css'
import '../assets/css/slick.min.css'
import '../assets/css/style.css'
import Header2 from './Header2';
import { MdOutlineSearch } from "react-icons/md";
import * as service from "../service/ProductServie"
import { Link, useNavigate } from 'react-router-dom';
import { FaCartPlus } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import ReactPaginate from "react-paginate";
import { CiHeart } from "react-icons/ci";
import "./style.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LikedByManyPeople from './likedByManyPeople';




const Hompage = () => {
    const navigate = useNavigate();
    const [sum, setSum] = useState(false);
    const [nameSearch, setNameSearch] = useState("")
    const [categoryId, setCategoryId] = useState(0)
    const [status, setStatus] = useState("")
    const [like, setLike] = useState([])
    const [flag, setFlag] = useState(false)
    const accessToken = sessionStorage.getItem('accessToken');
    const userIdSt = sessionStorage.getItem('userId')




    const handleSearchName = (value) => {
        setNameSearch(value);
    };

    const [category, setCategory] = useState([])
    const [productList, setProductList] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const submitSearch = async () => {
        try {
            let res = await service.getAllProduct(0, nameSearch, categoryId);
            setProductList(res.content);
            setTotalPages(res.totalPages);
            setCurrentPage(0);
            console.log(productList);
            console.log(nameSearch);
            console.log(categoryId);
        } catch (e) {
            console.log(e);
        }
    };

    const handleChange = (event) => {
        setCategoryId(event.target.value);
    };






    const handlePageClick = async (event) => {
        try {
            const pageNumber = event.selected;
            setCurrentPage(pageNumber);
            const result = await service.getAllProduct(pageNumber, nameSearch, categoryId);
            setProductList(result.content);
            setTotalPages(result.totalPages);
        } catch (error) {
            console.log(error);
        }
    };
    const handleCheck = (array, num) => {
        if (array == null) {
            return false
        }
        let flagA = false;
        for (let i = 0; i < array.length; i++) {
            if (array[i].product.id === num) {
                flagA = true;
                break;
            }
        }
        return flagA;
    }
    // const handleCheck = (array, num) => {
    //     return array !== null && array.some(item => item.product.id === num);
    // }

    const fetchApi = async (page, nameSearch, categoryId) => {
        try {
            const result = await service.getAllProduct(page, nameSearch, categoryId);
            console.log(categoryId);
            const result1 = await service.getAllCate()
            console.log(result);
            setCategory(result1);
            setProductList(result.content);
            setTotalPages(result.totalPages);
            document.title = "Product List"
        } catch (e) {
            console.log(e);
        }
    };


    useEffect(() => {

        let checkLike = async (accountId) => {
            const result2 = await service.checkLike(accountId, accessToken);
            setLike(result2)
        }
        console.log(userIdSt);
        checkLike(userIdSt)

        fetchApi(0, nameSearch, categoryId)

    }, [flag]);

    const handlePush = async (value) => {
        if (accessToken) {
            console.log("dang goi api");
            console.log(value);
            let res = await service.addToCart(value, userIdSt, 1, accessToken);
            console.log(res);
            toast.success('Add to cart successfully!', {
                autoClose: 3000 // Tự đóng sau 3 giây (3000 ms)
            });

            if (!sum) {

                setSum(true);
            } else {
                setSum(false)
            }
        } else {
            navigate('/login')
        }
    };

    const handleLike = async (product) => {
        await service.like(userIdSt, product.id, accessToken)
        setFlag(!flag)
    }




    return (
        <div>
            <Header props={sum} />
            {/* <Header2 props={sum} /> */}

            <div className="fullwidth-template" >
                <div className="slide-home-02">
                    <div
                        classname="response-product product-list-owl owl-slick equal-container better-height"
                        data-slick='{"arrows":false,"slidesMargin":0,"dots":true,"infinite":false,"speed":300,"slidesToShow":1,"rows":1}'
                        data-responsive='[{"breakpoint":480,"settings":{"slidesToShow":1,"slidesMargin":"0"}},{"breakpoint":768,"settings":{"slidesToShow":1,"slidesMargin":"0"}},{"breakpoint":992,"settings":{"slidesToShow":1,"slidesMargin":"0"}},{"breakpoint":1200,"settings":{"slidesToShow":1,"slidesMargin":"0"}},{"breakpoint":1500,"settings":{"slidesToShow":1,"slidesMargin":"0"}}]'>
                        <div className="slide-wrap">
                            <Carousel>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src="https://dreamingtheme.kiendaotac.com/html/kodory/assets/images/slide21.jpg"
                                        alt="First slide"
                                    />
                                    <div className="slide-info">
                                        <Carousel.Caption>
                                            <div className="container">
                                                <div className="slide-inner">
                                                    <h2>This Week Only</h2>
                                                    <h1>For Children<br />
                                                        New Collection</h1>

                                                </div>
                                            </div>

                                        </Carousel.Caption>
                                    </div>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src="https://dreamingtheme.kiendaotac.com/html/kodory/assets/images/slide22.jpg"
                                        alt="Second slide"
                                    />
                                    <div className="slide-info">
                                        <Carousel.Caption>
                                            <div className="container">
                                                <div className="slide-inner">
                                                    <h2>For Your Children</h2>
                                                    <h1>New Arrival<br />
                                                        Girl's Clothes</h1>

                                                </div>
                                            </div>
                                        </Carousel.Caption>
                                    </div>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src="https://dreamingtheme.kiendaotac.com/html/kodory/assets/images/slide23.jpg"
                                        alt="Third slide"
                                    />
                                    <div className="slide-info">

                                        <Carousel.Caption>
                                            <div className="container">
                                                <div className="slide-inner">
                                                    <h2>For Your Children</h2>
                                                    <h1>New Arrival<br />
                                                        Girl's Clothes</h1>
                                                </div>
                                            </div>
                                        </Carousel.Caption>
                                    </div>
                                </Carousel.Item>
                            </Carousel>
                        </div>
                    </div>
                </div>

            </div>
            <h1 style={{ textAlign: 'center', color: 'rgb(113,192,239)' }}>KODORY'S PRODUCT</h1>
            <div className="header style-04" >

                <div className="header-middle">
                    <div className="container row">
                        <div className='col-1 block-search-form'>

                            <select style={{ marginTop: '5px' }} >
                                <option >Sort by price ascending</option>
                                <option>Sort by price in descending order</option>
                                <option>Sort by name from A-Z</option>
                                <option>Sort by name from Z-A</option>
                            </select>
                        </div>
                        <div className='col-1'>

                            <div className="header-search">
                                <div>
                                    <div
                                        className="form-search block-search-form kodory-live-search-form"
                                    >

                                        <div className="form-content search-box results-search">
                                            <div className="inner" >
                                                <input
                                                    autoComplete="off"
                                                    className="searchfield txt-livesearch input"
                                                    defaultValue=""
                                                    placeholder="Search here..."
                                                    onChange={(event => handleSearchName(event.target.value))}
                                                    name="startDate"
                                                />
                                            </div>
                                        </div>
                                        <input name="post_type" defaultValue="product" type="hidden" />
                                        <input
                                            name="taxonomy"
                                            defaultValue="product_cat"
                                            type="hidden"
                                        />
                                        <div className="category">
                                            <select
                                                title="product_cat"
                                                name="product_cat"
                                                className="category-search-option"
                                                tabIndex={-1}
                                                style={{ display: "block" }}
                                                value={categoryId} // Giá trị của dropdown được gán bằng biến state categoryId
                                                onChange={handleChange} // Xử lý sự kiện onChange
                                            >
                                                <option value={0}>All Categories</option>
                                                {category.map((category, index) => (
                                                    <option key={category.id} value={category.id}> {/* Chú ý key và value */}
                                                        {category.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <button type="button" className="btn-submit" onClick={() => submitSearch()}>
                                            <span><MdOutlineSearch /></span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="main-container shop-page no-sidebar">
                <div className="container">
                    <div className="row">
                        <div className="main-content col-md-12">
                            <div className=" auto-clear kodory-products">
                                <ul className="row products columns-3">
                                    {productList ? (
                                        productList.map((product, index) => (

                                            <li className="product-item wow fadeInUp product-item rows-space-30 col-bg-3 col-xl-3 col-lg-4 col-md-6 col-sm-6 col-ts-6 style-01 post-24 product type-product status-publish has-post-thumbnail product_cat-chair product_cat-table product_cat-new-arrivals product_tag-light product_tag-hat product_tag-sock first instock featured shipping-taxable purchasable product-type-variable has-default-attributes"
                                                data-wow-duration="1s" data-wow-delay="0ms" data-wow="fadeInUp">
                                                <div className="product-inner tooltip-left">
                                                    <div className="product-thumb">
                                                        {accessToken ? (
                                                            handleCheck(like, product.id) ? (
                                                                <span onClick={() => handleLike(product)}>
                                                                    <CiHeart style={{ color: 'red' }} />
                                                                </span>
                                                            ) : (
                                                                <span onClick={() => handleLike(product)}>
                                                                    <CiHeart style={{ color: 'black' }} />
                                                                </span>
                                                            )
                                                        ) : (
                                                            <span onClick={() => handleLike(product)}>
                                                                <CiHeart style={{ color: 'black' }} />
                                                            </span>
                                                        )}


                                                        <span style={{ marginLeft: '5px', paddingTop: '3px' }}>{product.viewer}</span>
                                                        <Link className="thumb-link" to={`/product/${product.id}`}>
                                                            <img className="img-responsive" src={product.image}
                                                                alt="Kid Backpack" style={{ width: '600px', height: '300px' }} />
                                                        </Link>
                                                        <Link><p style={{ height: "30px" }}>{product.name}</p></Link>
                                                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                            <span style={{ color: "red", fontSize: "30px", paddingTop: '10px' }}>{product.price}$</span>
                                                            {product.quantity ? (
                                                                <button className="btn-submit" value={product.id} onClick={(event) => handlePush(event.target.value)} style={{ background: "rgb(113,192,239)" }}>
                                                                    Add to cart
                                                                </button>

                                                            ) : (
                                                                <button className="btn-submit" style={{ backgroundColor: 'rgb(237,113,163)' }} type='button'>
                                                                    Out of stock
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className="text-danger h5">
                                                Không tìm thấy dữ liệu
                                            </td>
                                        </tr>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {productList ? (
                <div >
                    <div >
                        <ReactPaginate
                            forcePage={currentPage}
                            breakLabel="..."
                            nextLabel="Next"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={2}
                            marginPagesDisplayed={2}
                            pageCount={totalPages}
                            previousLabel="Previous"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            breakClassName="page-item"
                            breakLinkClassName="page-link"
                            containerClassName="pagination"
                            activeClassName="active"
                        />
                    </div>
                </div>
            ) : (<div></div>)}
            <LikedByManyPeople />
            <Footer />

            <ToastContainer />
            {/* <ToastContainer enableMultiContainer containerId={'B'} position={toast.POSITION.TOP_RIGHT}/> */}
        </div >
    );
};

export default Hompage;