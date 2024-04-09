import React, { useEffect, useState } from 'react';
import * as service from "../service/ProductServie"
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { CiHeart } from "react-icons/ci";
import "./style.css"
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
// import "./like.css"

const LikedByManyPeople = () => {
    const [sum, setSum] = useState(false);
    const accessToken = sessionStorage.getItem('accessToken')
    const [like, setLike] = useState([])
    const userId = sessionStorage.getItem('userId')
    const [flag, setFlag] = useState(false)
    const handlePush = async (value) => {
        console.log(value);
        let res = await service.addToCart(value, userId, 1, accessToken);
        toast.success('Add to cart successfully!', {
            autoClose: 3000 // Tự đóng sau 3 giây (3000 ms)
        });

        if (!sum) {

            setSum(true);
        } else {
            setSum(false)
        }
    };
    const handleLike = async (product) => {
        await service.like(1, product.id)
        setFlag(!flag)
    }
    const handleCheck = (array, num) => {
        if (array === null) {
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
    const settings = {
        arrows: true,
        slidesMargin: 30,
        dots: false,
        infinite: false,
        speed: 300,
        slidesToShow: 1,
        rows: 1,
        responsive: [
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesMargin: 10
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesMargin: 10
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesMargin: 20
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 1,
                    slidesMargin: 20
                }
            },
            {
                breakpoint: 1500,
                settings: {
                    slidesToShow: 1,
                    slidesMargin: 30
                }
            }
        ]
    }
    const [productListLike, setProductListLike] = useState([])
    let res = async () => {
        let result = await service.getProductLikedByManyPeople()
        setProductListLike(result);
        console.log(result);
    }
    useEffect(() => {
        res()
    }, [])
    return (
        // <div>
        //     <div className="section-007">
        //         <div className="container">
        //             <div className="row">
        //                 <div className="col-md-12 col-lg-4">
        //                     <div className="kodory-products style-06">
        //                         <h3 className="title">
        //                             <span>Many People Like</span>
        //                         </h3>
        //                         <Slider {...settings}
        //                         >
        //                             {productListLike ? (
        //                                 productListLike.map((product, index) => (

        //                                     <div className="product-item best-selling style-06 rows-space-30 post-25 product type-product status-publish has-post-thumbnail product_cat-light product_cat-chair product_cat-specials product_tag-light product_tag-sock first instock sale featured shipping-taxable purchasable product-type-simple">
        //                                         <div className="product-inner">
        //                                             <div className="product-thumb">
        //                                                 <a
        //                                                     className="thumb-link"
        //                                                     href="single-product.html"
        //                                                     tabIndex={0}
        //                                                 >
        //                                                     <img
        //                                                         className="img-responsive"
        //                                                         src={product.image}
        //                                                         alt="Modern Platinum"
        //                                                         width={90}
        //                                                         height={90}
        //                                                     />
        //                                                 </a>
        //                                             </div>
        //                                             <div className="product-info">
        //                                                 <h3 className="product-name product_title">
        //                                                     <a href="single-product.html" tabIndex={0}>
        //                                                         Modern Platinum
        //                                                     </a>
        //                                                 </h3>
        //                                                 <div className="rating-wapper nostar">
        //                                                     <div className="star-rating">
        //                                                         <span style={{ width: "0%" }}>
        //                                                             Rated <strong className="rating">0</strong> out of 5
        //                                                         </span>
        //                                                     </div>
        //                                                     <span className="review">(0)</span>
        //                                                 </div>
        //                                                 <span className="price">
        //                                                     <del>
        //                                                         <span className="kodory-Price-amount amount">
        //                                                             <span className="kodory-Price-currencySymbol">$</span>
        //                                                             89.00
        //                                                         </span>
        //                                                     </del>{" "}
        //                                                     <ins>
        //                                                         <span className="kodory-Price-amount amount">
        //                                                             <span className="kodory-Price-currencySymbol">$</span>
        //                                                             79.00
        //                                                         </span>
        //                                                     </ins>
        //                                                 </span>
        //                                             </div>
        //                                         </div>
        //                                     </div>
        //                                 ))
        //                             ) : (<div></div>)}
        //                         </Slider>
        //                     </div>
        //                 </div>
        //                 <div className="col-md-12 col-lg-4">
        //                     <div className="kodory-products style-06">
        //                         <h3 className="title">
        //                             <span>Top Rated</span>
        //                         </h3>
        //                         <div
        //                             className="response-product product-list-owl owl-slick equal-container better-height"
        //                             data-slick='{"arrows":true,"slidesMargin":30,"dots":false,"infinite":false,"speed":300,"slidesToShow":1,"rows":3}'
        //                             data-responsive='[{"breakpoint":480,"settings":{"slidesToShow":1,"slidesMargin":"10"}},{"breakpoint":768,"settings":{"slidesToShow":1,"slidesMargin":"10"}},{"breakpoint":992,"settings":{"slidesToShow":2,"slidesMargin":"20"}},{"breakpoint":1200,"settings":{"slidesToShow":1,"slidesMargin":"20"}},{"breakpoint":1500,"settings":{"slidesToShow":1,"slidesMargin":"30"}}]'
        //                         >
        //                             <div className="product-item top-rated style-06 rows-space-30 post-26 product type-product status-publish has-post-thumbnail product_cat-light product_cat-chair product_cat-sofas product_tag-light product_tag-hat first instock featured shipping-taxable product-type-external">
        //                                 <div className="product-inner">
        //                                     <div className="product-thumb">
        //                                         <a
        //                                             className="thumb-link"
        //                                             href="single-product.html"
        //                                             tabIndex={0}
        //                                         >
        //                                             <img
        //                                                 className="img-responsive"
        //                                                 src="assets/images/apro141-1-90x90.jpg"
        //                                                 alt="Red Car"
        //                                                 width={90}
        //                                                 height={90}
        //                                             />
        //                                         </a>
        //                                     </div>
        //                                     <div className="product-info">
        //                                         <h3 className="product-name product_title">
        //                                             <a href="single-product.html" tabIndex={0}>
        //                                                 Red Car
        //                                             </a>
        //                                         </h3>
        //                                         <div className="rating-wapper ">
        //                                             <div className="star-rating">
        //                                                 <span style={{ width: "100%" }}>
        //                                                     Rated <strong className="rating">5.00</strong> out of 5
        //                                                 </span>
        //                                             </div>
        //                                             <span className="review">(1)</span>
        //                                         </div>
        //                                         <span className="price">
        //                                             <span className="kodory-Price-amount amount">
        //                                                 <span className="kodory-Price-currencySymbol">$</span>
        //                                                 207.00
        //                                             </span>
        //                                         </span>
        //                                     </div>
        //                                 </div>
        //                             </div>
        //                             <div className="product-item top-rated style-06 rows-space-30 post-28 product type-product status-publish has-post-thumbnail product_cat-light product_cat-chair product_cat-sofas product_tag-light product_tag-sock  instock sale featured shipping-taxable purchasable product-type-simple">
        //                                 <div className="product-inner">
        //                                     <div className="product-thumb">
        //                                         <a
        //                                             className="thumb-link"
        //                                             href="single-product.html"
        //                                             tabIndex={0}
        //                                         >
        //                                             <img
        //                                                 className="img-responsive"
        //                                                 src="assets/images/apro1211-2-90x90.jpg"
        //                                                 alt="Blue Shoes"
        //                                                 width={90}
        //                                                 height={90}
        //                                             />
        //                                         </a>
        //                                     </div>
        //                                     <div className="product-info">
        //                                         <h3 className="product-name product_title">
        //                                             <a href="single-product.html" tabIndex={0}>
        //                                                 Blue Shoes
        //                                             </a>
        //                                         </h3>
        //                                         <div className="rating-wapper ">
        //                                             <div className="star-rating">
        //                                                 <span style={{ width: "100%" }}>
        //                                                     Rated <strong className="rating">5.00</strong> out of 5
        //                                                 </span>
        //                                             </div>
        //                                             <span className="review">(1)</span>
        //                                         </div>
        //                                         <span className="price">
        //                                             <del>
        //                                                 <span className="kodory-Price-amount amount">
        //                                                     <span className="kodory-Price-currencySymbol">$</span>
        //                                                     138.00
        //                                                 </span>
        //                                             </del>{" "}
        //                                             <ins>
        //                                                 <span className="kodory-Price-amount amount">
        //                                                     <span className="kodory-Price-currencySymbol">$</span>
        //                                                     119.00
        //                                                 </span>
        //                                             </ins>
        //                                         </span>
        //                                     </div>
        //                                 </div>
        //                             </div>
        //                             <div className="product-item top-rated style-06 rows-space-30 post-32 product type-product status-publish has-post-thumbnail product_cat-light product_cat-chair product_cat-sofas product_tag-hat product_tag-sock last instock sale featured shipping-taxable purchasable product-type-simple">
        //                                 <div className="product-inner">
        //                                     <div className="product-thumb">
        //                                         <a
        //                                             className="thumb-link"
        //                                             href="single-product.html"
        //                                             tabIndex={0}
        //                                         >
        //                                             <img
        //                                                 className="img-responsive"
        //                                                 src="assets/images/apro71-1-90x90.jpg"
        //                                                 alt="Kid Backpack"
        //                                                 width={90}
        //                                                 height={90}
        //                                             />
        //                                         </a>
        //                                     </div>
        //                                     <div className="product-info">
        //                                         <h3 className="product-name product_title">
        //                                             <a href="single-product.html" tabIndex={0}>
        //                                                 Kid Backpack
        //                                             </a>
        //                                         </h3>
        //                                         <div className="rating-wapper nostar">
        //                                             <div className="star-rating">
        //                                                 <span style={{ width: "0%" }}>
        //                                                     Rated <strong className="rating">0</strong> out of 5
        //                                                 </span>
        //                                             </div>
        //                                             <span className="review">(0)</span>
        //                                         </div>
        //                                         <span className="price">
        //                                             <del>
        //                                                 <span className="kodory-Price-amount amount">
        //                                                     <span className="kodory-Price-currencySymbol">$</span>
        //                                                     109.00
        //                                                 </span>
        //                                             </del>{" "}
        //                                             <ins>
        //                                                 <span className="kodory-Price-amount amount">
        //                                                     <span className="kodory-Price-currencySymbol">$</span>
        //                                                     89.00
        //                                                 </span>
        //                                             </ins>
        //                                         </span>
        //                                     </div>
        //                                 </div>
        //                             </div>
        //                             <div className="product-item top-rated style-06 rows-space-30 post-20 product type-product status-publish has-post-thumbnail product_cat-light product_cat-new-arrivals product_cat-specials product_tag-table product_tag-hat product_tag-sock first instock sale featured shipping-taxable purchasable product-type-simple">
        //                                 <div className="product-inner">
        //                                     <div className="product-thumb">
        //                                         <a
        //                                             className="thumb-link"
        //                                             href="single-product.html"
        //                                             tabIndex={-1}
        //                                         >
        //                                             <img
        //                                                 className="img-responsive"
        //                                                 src="assets/images/apro201-1-90x90.jpg"
        //                                                 alt="Red Car"
        //                                                 width={90}
        //                                                 height={90}
        //                                             />
        //                                         </a>
        //                                     </div>
        //                                     <div className="product-info">
        //                                         <h3 className="product-name product_title">
        //                                             <a href="single-product.html" tabIndex={-1}>
        //                                                 Red Car
        //                                             </a>
        //                                         </h3>
        //                                         <div className="rating-wapper nostar">
        //                                             <div className="star-rating">
        //                                                 <span style={{ width: "0%" }}>
        //                                                     Rated <strong className="rating">0</strong> out of 5
        //                                                 </span>
        //                                             </div>
        //                                             <span className="review">(0)</span>
        //                                         </div>
        //                                         <span className="price">
        //                                             <del>
        //                                                 <span className="kodory-Price-amount amount">
        //                                                     <span className="kodory-Price-currencySymbol">$</span>
        //                                                     150.00
        //                                                 </span>
        //                                             </del>{" "}
        //                                             <ins>
        //                                                 <span className="kodory-Price-amount amount">
        //                                                     <span className="kodory-Price-currencySymbol">$</span>
        //                                                     139.00
        //                                                 </span>
        //                                             </ins>
        //                                         </span>
        //                                     </div>
        //                                 </div>
        //                             </div>
        //                             <div className="product-item top-rated style-06 rows-space-30 post-33 product type-product status-publish has-post-thumbnail product_cat-chair product_cat-table product_cat-lamp product_tag-light product_tag-table product_tag-hat  instock shipping-taxable purchasable product-type-variable has-default-attributes">
        //                                 <div className="product-inner">
        //                                     <div className="product-thumb">
        //                                         <a
        //                                             className="thumb-link"
        //                                             href="single-product.html"
        //                                             tabIndex={-1}
        //                                         >
        //                                             <img
        //                                                 className="img-responsive"
        //                                                 src="assets/images/apro83-1-90x90.jpg"
        //                                                 alt="Glasses"
        //                                                 width={90}
        //                                                 height={90}
        //                                             />
        //                                         </a>
        //                                     </div>
        //                                     <div className="product-info">
        //                                         <h3 className="product-name product_title">
        //                                             <a href="single-product.html" tabIndex={-1}>
        //                                                 Baby Shirt
        //                                             </a>
        //                                         </h3>
        //                                         <div className="rating-wapper nostar">
        //                                             <div className="star-rating">
        //                                                 <span style={{ width: "0%" }}>
        //                                                     Rated <strong className="rating">0</strong> out of 5
        //                                                 </span>
        //                                             </div>
        //                                             <span className="review">(0)</span>
        //                                         </div>
        //                                         <span className="price">
        //                                             <span className="kodory-Price-amount amount">
        //                                                 <span className="kodory-Price-currencySymbol">$</span>
        //                                                 56.00
        //                                             </span>{" "}
        //                                             –{" "}
        //                                             <span className="kodory-Price-amount amount">
        //                                                 <span className="kodory-Price-currencySymbol">$</span>
        //                                                 60.00
        //                                             </span>
        //                                         </span>
        //                                     </div>
        //                                 </div>
        //                             </div>
        //                             <div className="product-item top-rated style-06 rows-space-30 post-21 product type-product status-publish has-post-thumbnail product_cat-light product_cat-bed product_cat-lamp product_tag-light product_tag-sock last outofstock featured shipping-taxable purchasable product-type-simple">
        //                                 <div className="product-inner">
        //                                     <div className="product-thumb">
        //                                         <a
        //                                             className="thumb-link"
        //                                             href="single-product.html"
        //                                             tabIndex={-1}
        //                                         >
        //                                             <img
        //                                                 className="img-responsive"
        //                                                 src="assets/images/apro191-1-90x90.jpg"
        //                                                 alt="Baby Shirt"
        //                                                 width={90}
        //                                                 height={90}
        //                                             />
        //                                         </a>
        //                                     </div>
        //                                     <div className="product-info">
        //                                         <h3 className="product-name product_title">
        //                                             <a href="single-product.html" tabIndex={-1}>
        //                                                 Baby Shirt
        //                                             </a>
        //                                         </h3>
        //                                         <div className="rating-wapper nostar">
        //                                             <div className="star-rating">
        //                                                 <span style={{ width: "0%" }}>
        //                                                     Rated <strong className="rating">0</strong> out of 5
        //                                                 </span>
        //                                             </div>
        //                                             <span className="review">(0)</span>
        //                                         </div>
        //                                         <span className="price">
        //                                             <span className="kodory-Price-amount amount">
        //                                                 <span className="kodory-Price-currencySymbol">$</span>
        //                                                 35.00
        //                                             </span>
        //                                         </span>
        //                                     </div>
        //                                 </div>
        //                             </div>
        //                             <div className="product-item top-rated style-06 rows-space-30 post-34 product type-product status-publish has-post-thumbnail product_cat-light product_cat-new-arrivals product_tag-light product_tag-hat product_tag-sock first instock sale featured shipping-taxable product-type-grouped">
        //                                 <div className="product-inner">
        //                                     <div className="product-thumb">
        //                                         <a
        //                                             className="thumb-link"
        //                                             href="single-product.html"
        //                                             tabIndex={-1}
        //                                         >
        //                                             <img
        //                                                 className="img-responsive"
        //                                                 src="assets/images/apro61-1-90x90.jpg"
        //                                                 alt="Shark Shirt"
        //                                                 width={90}
        //                                                 height={90}
        //                                             />
        //                                         </a>
        //                                     </div>
        //                                     <div className="product-info">
        //                                         <h3 className="product-name product_title">
        //                                             <a href="#" tabIndex={-1}>
        //                                                 Shark Shirt
        //                                             </a>
        //                                         </h3>
        //                                         <div className="rating-wapper nostar">
        //                                             <div className="star-rating">
        //                                                 <span style={{ width: "0%" }}>
        //                                                     Rated <strong className="rating">0</strong> out of 5
        //                                                 </span>
        //                                             </div>
        //                                             <span className="review">(0)</span>
        //                                         </div>
        //                                         <span className="price">
        //                                             <span className="kodory-Price-amount amount">
        //                                                 <span className="kodory-Price-currencySymbol">$</span>
        //                                                 79.00
        //                                             </span>{" "}
        //                                             –{" "}
        //                                             <span className="kodory-Price-amount amount">
        //                                                 <span className="kodory-Price-currencySymbol">$</span>
        //                                                 139.00
        //                                             </span>
        //                                         </span>
        //                                     </div>
        //                                 </div>
        //                             </div>
        //                             <div className="product-item top-rated style-06 rows-space-30 post-22 product type-product status-publish has-post-thumbnail product_cat-table product_cat-bed product_cat-lamp product_tag-table product_tag-hat product_tag-sock  instock featured downloadable shipping-taxable purchasable product-type-simple">
        //                                 <div className="product-inner">
        //                                     <div className="product-thumb">
        //                                         <a
        //                                             className="thumb-link"
        //                                             href="single-product.html"
        //                                             tabIndex={-1}
        //                                         >
        //                                             <img
        //                                                 className="img-responsive"
        //                                                 src="assets/images/apro181-2-90x90.jpg"
        //                                                 alt="Soccer Shoes"
        //                                                 width={90}
        //                                                 height={90}
        //                                             />
        //                                         </a>
        //                                     </div>
        //                                     <div className="product-info">
        //                                         <h3 className="product-name product_title">
        //                                             <a href="single-product.html" tabIndex={-1}>
        //                                                 Soccer Shoes
        //                                             </a>
        //                                         </h3>
        //                                         <div className="rating-wapper nostar">
        //                                             <div className="star-rating">
        //                                                 <span style={{ width: "0%" }}>
        //                                                     Rated <strong className="rating">0</strong> out of 5
        //                                                 </span>
        //                                             </div>
        //                                             <span className="review">(0)</span>
        //                                         </div>
        //                                         <span className="price">
        //                                             <span className="kodory-Price-amount amount">
        //                                                 <span className="kodory-Price-currencySymbol">$</span>
        //                                                 98.00
        //                                             </span>
        //                                         </span>
        //                                     </div>
        //                                 </div>
        //                             </div>
        //                             <div className="product-item top-rated style-06 rows-space-30 post-35 product type-product status-publish has-post-thumbnail product_cat-chair product_cat-new-arrivals product_cat-lamp product_tag-light product_tag-hat product_tag-sock last instock shipping-taxable purchasable product-type-simple">
        //                                 <div className="product-inner">
        //                                     <div className="product-thumb">
        //                                         <a
        //                                             className="thumb-link"
        //                                             href="single-product.html"
        //                                             tabIndex={-1}
        //                                         >
        //                                             <img
        //                                                 className="img-responsive"
        //                                                 src="assets/images/apro41-1-90x90.jpg"
        //                                                 alt="Cute Shoes"
        //                                                 width={90}
        //                                                 height={90}
        //                                             />
        //                                         </a>
        //                                     </div>
        //                                     <div className="product-info">
        //                                         <h3 className="product-name product_title">
        //                                             <a href="single-product.html" tabIndex={-1}>
        //                                                 Cute Shoes
        //                                             </a>
        //                                         </h3>
        //                                         <div className="rating-wapper nostar">
        //                                             <div className="star-rating">
        //                                                 <span style={{ width: "0%" }}>
        //                                                     Rated <strong className="rating">0</strong> out of 5
        //                                                 </span>
        //                                             </div>
        //                                             <span className="review">(0)</span>
        //                                         </div>
        //                                         <span className="price">
        //                                             <span className="kodory-Price-amount amount">
        //                                                 <span className="kodory-Price-currencySymbol">$</span>
        //                                                 134.00
        //                                             </span>
        //                                         </span>
        //                                     </div>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //                 <div className="col-md-12 col-lg-4">
        //                     <div className="kodory-products style-06">
        //                         <h3 className="title">
        //                             <span>Featured</span>
        //                         </h3>
        //                         <div
        //                             className="response-product product-list-owl owl-slick equal-container better-height"
        //                             data-slick='{"arrows":true,"slidesMargin":30,"dots":false,"infinite":false,"speed":300,"slidesToShow":1,"rows":3}'
        //                             data-responsive='[{"breakpoint":480,"settings":{"slidesToShow":1,"slidesMargin":"10"}},{"breakpoint":768,"settings":{"slidesToShow":1,"slidesMargin":"10"}},{"breakpoint":992,"settings":{"slidesToShow":2,"slidesMargin":"20"}},{"breakpoint":1200,"settings":{"slidesToShow":1,"slidesMargin":"20"}},{"breakpoint":1500,"settings":{"slidesToShow":1,"slidesMargin":"30"}}]'
        //                         >
        //                             <div className="product-item featured_products style-06 rows-space-30 post-34 product type-product status-publish has-post-thumbnail product_cat-light product_cat-new-arrivals product_tag-light product_tag-hat product_tag-sock first instock sale featured shipping-taxable product-type-grouped">
        //                                 <div className="product-inner">
        //                                     <div className="product-thumb">
        //                                         <a
        //                                             className="thumb-link"
        //                                             href="single-product.html"
        //                                             tabIndex={0}
        //                                         >
        //                                             <img
        //                                                 className="img-responsive"
        //                                                 src="assets/images/apro61-1-90x90.jpg"
        //                                                 alt="Shark Shirt"
        //                                                 width={90}
        //                                                 height={90}
        //                                             />
        //                                         </a>
        //                                     </div>
        //                                     <div className="product-info">
        //                                         <h3 className="product-name product_title">
        //                                             <a href="single-product.html" tabIndex={0}>
        //                                                 Shark Shirt
        //                                             </a>
        //                                         </h3>
        //                                         <div className="rating-wapper nostar">
        //                                             <div className="star-rating">
        //                                                 <span style={{ width: "0%" }}>
        //                                                     Rated <strong className="rating">0</strong> out of 5
        //                                                 </span>
        //                                             </div>
        //                                             <span className="review">(0)</span>
        //                                         </div>
        //                                         <span className="price">
        //                                             <span className="kodory-Price-amount amount">
        //                                                 <span className="kodory-Price-currencySymbol">$</span>
        //                                                 79.00
        //                                             </span>{" "}
        //                                             –{" "}
        //                                             <span className="kodory-Price-amount amount">
        //                                                 <span className="kodory-Price-currencySymbol">$</span>
        //                                                 139.00
        //                                             </span>
        //                                         </span>
        //                                     </div>
        //                                 </div>
        //                             </div>
        //                             <div className="product-item featured_products style-06 rows-space-30 post-32 product type-product status-publish has-post-thumbnail product_cat-light product_cat-chair product_cat-sofas product_tag-hat product_tag-sock  instock sale featured shipping-taxable purchasable product-type-simple">
        //                                 <div className="product-inner">
        //                                     <div className="product-thumb">
        //                                         <a
        //                                             className="thumb-link"
        //                                             href="single-product.html"
        //                                             tabIndex={0}
        //                                         >
        //                                             <img
        //                                                 className="img-responsive"
        //                                                 src="assets/images/apro71-1-90x90.jpg"
        //                                                 alt="Kid Backpack"
        //                                                 width={90}
        //                                                 height={90}
        //                                             />
        //                                         </a>
        //                                     </div>
        //                                     <div className="product-info">
        //                                         <h3 className="product-name product_title">
        //                                             <a href="single-product.html" tabIndex={0}>
        //                                                 Kid Backpack
        //                                             </a>
        //                                         </h3>
        //                                         <div className="rating-wapper nostar">
        //                                             <div className="star-rating">
        //                                                 <span style={{ width: "0%" }}>
        //                                                     Rated <strong className="rating">0</strong> out of 5
        //                                                 </span>
        //                                             </div>
        //                                             <span className="review">(0)</span>
        //                                         </div>
        //                                         <span className="price">
        //                                             <del>
        //                                                 <span className="kodory-Price-amount amount">
        //                                                     <span className="kodory-Price-currencySymbol">$</span>
        //                                                     109.00
        //                                                 </span>
        //                                             </del>{" "}
        //                                             <ins>
        //                                                 <span className="kodory-Price-amount amount">
        //                                                     <span className="kodory-Price-currencySymbol">$</span>
        //                                                     89.00
        //                                                 </span>
        //                                             </ins>
        //                                         </span>
        //                                     </div>
        //                                 </div>
        //                             </div>
        //                             <div className="product-item featured_products style-06 rows-space-30 post-30 product type-product status-publish has-post-thumbnail product_cat-light product_cat-bed product_cat-specials product_tag-light product_tag-table product_tag-sock last instock featured downloadable shipping-taxable purchasable product-type-simple">
        //                                 <div className="product-inner">
        //                                     <div className="product-thumb">
        //                                         <a
        //                                             className="thumb-link"
        //                                             href="single-product.html"
        //                                             tabIndex={0}
        //                                         >
        //                                             <img
        //                                                 className="img-responsive"
        //                                                 src="assets/images/apro101-1-90x90.jpg"
        //                                                 alt="Penguin Hoodie"
        //                                                 width={90}
        //                                                 height={90}
        //                                             />
        //                                         </a>
        //                                     </div>
        //                                     <div className="product-info">
        //                                         <h3 className="product-name product_title">
        //                                             <a href="single-product.html" tabIndex={0}>
        //                                                 Penguin Hoodie
        //                                             </a>
        //                                         </h3>
        //                                         <div className="rating-wapper nostar">
        //                                             <div className="star-rating">
        //                                                 <span style={{ width: "0%" }}>
        //                                                     Rated <strong className="rating">0</strong> out of 5
        //                                                 </span>
        //                                             </div>
        //                                             <span className="review">(0)</span>
        //                                         </div>
        //                                         <span className="price">
        //                                             <span className="kodory-Price-amount amount">
        //                                                 <span className="kodory-Price-currencySymbol">$</span>
        //                                                 60.00
        //                                             </span>
        //                                         </span>
        //                                     </div>
        //                                 </div>
        //                             </div>
        //                             <div className="product-item featured_products style-06 rows-space-30 post-31 product type-product status-publish has-post-thumbnail product_cat-light product_cat-sofas product_tag-hat first instock sale featured shipping-taxable product-type-grouped">
        //                                 <div className="product-inner">
        //                                     <div className="product-thumb">
        //                                         <a
        //                                             className="thumb-link"
        //                                             href="single-product.html"
        //                                             tabIndex={-1}
        //                                         >
        //                                             <img
        //                                                 className="img-responsive"
        //                                                 src="assets/images/apro91-1-90x90.jpg"
        //                                                 alt="Elegant Diamond"
        //                                                 width={90}
        //                                                 height={90}
        //                                             />
        //                                         </a>
        //                                     </div>
        //                                     <div className="product-info">
        //                                         <h3 className="product-name product_title">
        //                                             <a href="single-product.html" tabIndex={-1}>
        //                                                 Elegant Diamond
        //                                             </a>
        //                                         </h3>
        //                                         <div className="rating-wapper nostar">
        //                                             <div className="star-rating">
        //                                                 <span style={{ width: "0%" }}>
        //                                                     Rated <strong className="rating">0</strong> out of 5
        //                                                 </span>
        //                                             </div>
        //                                             <span className="review">(0)</span>
        //                                         </div>
        //                                         <span className="price">
        //                                             <span className="kodory-Price-amount amount">
        //                                                 <span className="kodory-Price-currencySymbol">$</span>
        //                                                 89.00
        //                                             </span>{" "}
        //                                             –{" "}
        //                                             <span className="kodory-Price-amount amount">
        //                                                 <span className="kodory-Price-currencySymbol">$</span>
        //                                                 139.00
        //                                             </span>
        //                                         </span>
        //                                     </div>
        //                                 </div>
        //                             </div>
        //                             <div className="product-item featured_products style-06 rows-space-30 post-29 product type-product status-publish has-post-thumbnail product_cat-new-arrivals product_cat-specials product_tag-light product_tag-sock  instock featured downloadable shipping-taxable purchasable product-type-simple">
        //                                 <div className="product-inner">
        //                                     <div className="product-thumb">
        //                                         <a
        //                                             className="thumb-link"
        //                                             href="single-product.html"
        //                                             tabIndex={-1}
        //                                         >
        //                                             <img
        //                                                 className="img-responsive"
        //                                                 src="assets/images/apro1113-90x90.jpg"
        //                                                 alt="Ethereal Toys"
        //                                                 width={90}
        //                                                 height={90}
        //                                             />
        //                                         </a>
        //                                     </div>
        //                                     <div className="product-info">
        //                                         <h3 className="product-name product_title">
        //                                             <a href="single-product.html" tabIndex={-1}>
        //                                                 Ethereal Toys
        //                                             </a>
        //                                         </h3>
        //                                         <div className="rating-wapper nostar">
        //                                             <div className="star-rating">
        //                                                 <span style={{ width: "0%" }}>
        //                                                     Rated <strong className="rating">0</strong> out of 5
        //                                                 </span>
        //                                             </div>
        //                                             <span className="review">(0)</span>
        //                                         </div>
        //                                         <span className="price">
        //                                             <span className="kodory-Price-amount amount">
        //                                                 <span className="kodory-Price-currencySymbol">$</span>
        //                                                 129.00
        //                                             </span>
        //                                         </span>
        //                                     </div>
        //                                 </div>
        //                             </div>
        //                             <div className="product-item featured_products style-06 rows-space-30 post-28 product type-product status-publish has-post-thumbnail product_cat-light product_cat-chair product_cat-sofas product_tag-light product_tag-sock last instock sale featured shipping-taxable purchasable product-type-simple">
        //                                 <div className="product-inner">
        //                                     <div className="product-thumb">
        //                                         <a
        //                                             className="thumb-link"
        //                                             href="single-product.html"
        //                                             tabIndex={-1}
        //                                         >
        //                                             <img
        //                                                 className="img-responsive"
        //                                                 src="assets/images/apro1211-2-90x90.jpg"
        //                                                 alt="Blue Shoes"
        //                                                 width={90}
        //                                                 height={90}
        //                                             />
        //                                         </a>
        //                                     </div>
        //                                     <div className="product-info">
        //                                         <h3 className="product-name product_title">
        //                                             <a href="single-product.html" tabIndex={-1}>
        //                                                 Blue Shoes
        //                                             </a>
        //                                         </h3>
        //                                         <div className="rating-wapper ">
        //                                             <div className="star-rating">
        //                                                 <span style={{ width: "100%" }}>
        //                                                     Rated <strong className="rating">5.00</strong> out of 5
        //                                                 </span>
        //                                             </div>
        //                                             <span className="review">(1)</span>
        //                                         </div>
        //                                         <span className="price">
        //                                             <del>
        //                                                 <span className="kodory-Price-amount amount">
        //                                                     <span className="kodory-Price-currencySymbol">$</span>
        //                                                     138.00
        //                                                 </span>
        //                                             </del>{" "}
        //                                             <ins>
        //                                                 <span className="kodory-Price-amount amount">
        //                                                     <span className="kodory-Price-currencySymbol">$</span>
        //                                                     119.00
        //                                                 </span>
        //                                             </ins>
        //                                         </span>
        //                                     </div>
        //                                 </div>
        //                             </div>
        //                             <div className="product-item featured_products style-06 rows-space-30 post-26 product type-product status-publish has-post-thumbnail product_cat-light product_cat-chair product_cat-sofas product_tag-light product_tag-hat first instock featured shipping-taxable product-type-external">
        //                                 <div className="product-inner">
        //                                     <div className="product-thumb">
        //                                         <a
        //                                             className="thumb-link"
        //                                             href="single-product.html"
        //                                             tabIndex={-1}
        //                                         >
        //                                             <img
        //                                                 className="img-responsive"
        //                                                 src="assets/images/apro141-1-90x90.jpg"
        //                                                 alt="Red Car"
        //                                                 width={90}
        //                                                 height={90}
        //                                             />
        //                                         </a>
        //                                     </div>
        //                                     <div className="product-info">
        //                                         <h3 className="product-name product_title">
        //                                             <a href="single-product.html" tabIndex={-1}>
        //                                                 Red Car
        //                                             </a>
        //                                         </h3>
        //                                         <div className="rating-wapper ">
        //                                             <div className="star-rating">
        //                                                 <span style={{ width: "100%" }}>
        //                                                     Rated <strong className="rating">5.00</strong> out of 5
        //                                                 </span>
        //                                             </div>
        //                                             <span className="review">(1)</span>
        //                                         </div>
        //                                         <span className="price">
        //                                             <span className="kodory-Price-amount amount">
        //                                                 <span className="kodory-Price-currencySymbol">$</span>
        //                                                 207.00
        //                                             </span>
        //                                         </span>
        //                                     </div>
        //                                 </div>
        //                             </div>
        //                             <div className="product-item featured_products style-06 rows-space-30 post-25 product type-product status-publish has-post-thumbnail product_cat-light product_cat-chair product_cat-specials product_tag-light product_tag-sock  instock sale featured shipping-taxable purchasable product-type-simple">
        //                                 <div className="product-inner">
        //                                     <div className="product-thumb">
        //                                         <a
        //                                             className="thumb-link"
        //                                             href="single-product.html"
        //                                             tabIndex={-1}
        //                                         >
        //                                             <img
        //                                                 className="img-responsive"
        //                                                 src="assets/images/apro151-1-90x90.jpg"
        //                                                 alt="Modern Platinum"
        //                                                 width={90}
        //                                                 height={90}
        //                                             />
        //                                         </a>
        //                                     </div>
        //                                     <div className="product-info">
        //                                         <h3 className="product-name product_title">
        //                                             <a href="single-product.html" tabIndex={-1}>
        //                                                 Modern Platinum
        //                                             </a>
        //                                         </h3>
        //                                         <div className="rating-wapper nostar">
        //                                             <div className="star-rating">
        //                                                 <span style={{ width: "0%" }}>
        //                                                     Rated <strong className="rating">0</strong> out of 5
        //                                                 </span>
        //                                             </div>
        //                                             <span className="review">(0)</span>
        //                                         </div>
        //                                         <span className="price">
        //                                             <del>
        //                                                 <span className="kodory-Price-amount amount">
        //                                                     <span className="kodory-Price-currencySymbol">$</span>
        //                                                     89.00
        //                                                 </span>
        //                                             </del>{" "}
        //                                             <ins>
        //                                                 <span className="kodory-Price-amount amount">
        //                                                     <span className="kodory-Price-currencySymbol">$</span>
        //                                                     79.00
        //                                                 </span>
        //                                             </ins>
        //                                         </span>
        //                                     </div>
        //                                 </div>
        //                             </div>
        //                             <div className="product-item featured_products style-06 rows-space-30 post-24 product type-product status-publish has-post-thumbnail product_cat-chair product_cat-table product_cat-new-arrivals product_tag-light product_tag-hat product_tag-sock last instock featured shipping-taxable purchasable product-type-variable has-default-attributes">
        //                                 <div className="product-inner">
        //                                     <div className="product-thumb">
        //                                         <a
        //                                             className="thumb-link"
        //                                             href="single-product.html"
        //                                             tabIndex={-1}
        //                                         >
        //                                             <img
        //                                                 className="img-responsive"
        //                                                 src="assets/images/apro161-1-90x90.jpg"
        //                                                 alt="Kid Backpack"
        //                                                 width={90}
        //                                                 height={90}
        //                                             />
        //                                         </a>
        //                                     </div>
        //                                     <div className="product-info">
        //                                         <h3 className="product-name product_title">
        //                                             <a href="single-product.html" tabIndex={-1}>
        //                                                 Kid Backpack
        //                                             </a>
        //                                         </h3>
        //                                         <div className="rating-wapper nostar">
        //                                             <div className="star-rating">
        //                                                 <span style={{ width: "0%" }}>
        //                                                     Rated <strong className="rating">0</strong> out of 5
        //                                                 </span>
        //                                             </div>
        //                                             <span className="review">(0)</span>
        //                                         </div>
        //                                         <span className="price">
        //                                             <span className="kodory-Price-amount amount">
        //                                                 <span className="kodory-Price-currencySymbol">$</span>
        //                                                 45.00
        //                                             </span>{" "}
        //                                             –{" "}
        //                                             <span className="kodory-Price-amount amount">
        //                                                 <span className="kodory-Price-currencySymbol">$</span>
        //                                                 54.00
        //                                             </span>
        //                                         </span>
        //                                     </div>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>

        // </div>
        <div className="section-012">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="kodory-heading style-01">
                            <div className="heading-inner">
                                <h3 className="title">
                                    Many People Like <span />
                                </h3>
                                <div className="subtitle">Many like it, because it is fit</div>
                            </div>
                        </div>
                        <div className="kodory-products style-03">
                            <Slider {...settings}
                            >
                                {productListLike ? (
                                    productListLike.map((product, index) => (
                                        <div
                                            className="product-item on_sale style-03 rows-space-0 post-36 product type-product status-publish has-post-thumbnail product_cat-table product_cat-bed product_tag-light product_tag-table product_tag-sock first instock sale shipping-taxable purchasable product-type-simple"
                                            data-slick-index={0}
                                            style={{ marginRight: 30, width: 520 }}
                                            aria-hidden="false"
                                            tabIndex={0}
                                            role="tabpanel"
                                            id="slick-slide10"
                                        >
                                            <div className="product-inner">
                                                <div className="product-thumb">
                                                    <Link
                                                        className="thumb-link"
                                                        href="single-product.html"
                                                        tabIndex={0}
                                                        to={`/product/${product.id}`}
                                                    >
                                                        <img
                                                            className="img-responsive"
                                                            src={product.image}
                                                            alt="Dazzling Toys"
                                                            width={275}
                                                            height={310}
                                                        />
                                                    </Link>
                                                </div>
                                                <div className="product-info equal-elem">
                                                    <h3 className="product-name product_title">
                                                        <Link to={`/product/${product.id}`} tabIndex={0}>
                                                            {product.name}
                                                        </Link>
                                                    </h3>
                                                    <span className="price">
                                                        {product.price} $
                                                    </span>

                                                    <div className="countdown-product">
                                                        <div
                                                            className="kodory-countdown"
                                                        >

                                                            <span><CiHeart style={{ color: 'red' }} /></span>

                                                            <span>{product.viewer}</span>

                                                        </div>
                                                        <div
                                                            className="kodory-countdown"
                                                        >



                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h3>Description</h3>
                                                        <p>{product.description}</p>
                                                    </div>
                                                    <div className="add-to-cart">
                                                        <button
                                                            className="btn-submit" value={product.id} onClick={(event) => handlePush(event.target.value)} style={{ background: "rgb(113,192,239)" }}
                                                        >
                                                            Add to cart
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>))) : (<div></div>)}
                            </Slider>
                        </div>
                    </div>
                </div>
            </div >
        </div >

    );
};

export default LikedByManyPeople;