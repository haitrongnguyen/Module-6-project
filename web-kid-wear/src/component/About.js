import React from 'react';
import Footer from './Footer';
import Header from './Header';
import { Link } from 'react-router-dom';

const About = () => {
    document.title = "About"
    return (
        <div>
            <Header />
            <div class="banner-wrapper has_background">
                <img src="https://dreamingtheme.kiendaotac.com/html/kodory/assets/images/banner-for-all2.jpg"
                    class="img-responsive attachment-1920x447 size-1920x447" alt="img" />
                <div class="banner-wrapper-inner container">
                    <h1 class="page-title">About</h1>
                    <div role="navigation" aria-label="Breadcrumbs" class="breadcrumb-trail breadcrumbs">
                        <ul class="trail-items breadcrumb">
                            <li class="trail-item trail-begin"><Link to={'/'}><span>Home</span></Link></li>
                            <li class="trail-item trail-end active"><span>About</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="site-main  main-container no-sidebar">
                <div className="section-037">
                    <div className="container">
                        <div className="kodory-popupvideo style-01">
                            <div className="popupvideo-inner">
                                <div className="icon">
                                    <img
                                        src="https://dreamingtheme.kiendaotac.com/html/kodory/assets/images/about-img.jpg"
                                        className="attachment-full size-full"
                                        alt="img"
                                    />
                                    <div className="product-video-button">
                                        <a
                                            className="buttonvideo"
                                            href="#"
                                            data-videosite="vimeo"
                                            data-videoid={29420457}
                                            tabIndex={0}
                                        >
                                            <div className="videobox_animation circle_1" />
                                            <div className="videobox_animation circle_2" />
                                            <div className="videobox_animation circle_3" />
                                        </a>
                                    </div>
                                </div>
                                <div className="popupvideo-wrap">
                                    <h4 className="title">Who we are </h4>
                                    <p className="desc">
                                        We believe in a world where you have total freedom to be you,
                                        without judgement. To experiment. To express yourself. To be brave
                                        and grab life as the extraordinary adventure it is. So we make
                                        sure everyone has an equal chance to discover all the amazing
                                        things they’re capable of – no matter who they are, where they’re
                                        from or what looks they like to boss.
                                    </p>
                                    <p>
                                        Our audience (AKA you) is wonderfully unique. And we do everything
                                        we can to help you find your fit, offering our Ciloe Brands in
                                        more than 30 sizes – and we’re committed to providing all sizes at
                                        the same price
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section-001">
                    <div className="container">
                        <div className="kodory-heading style-01">
                            <div className="heading-inner">
                                <h3 className="title">
                                    Meet Our Team <span />
                                </h3>
                                <div className="subtitle">A perfect blend of creativity</div>
                            </div>
                        </div>
                        <div className="kodory-slide">
                            <div
                                className="owl-slick equal-container better-height row"
                                data-slick={{ // Sử dụng cặp dấu ngoặc nhọn để bọc đối tượng JSON
                                    arrows: true,
                                    slidesMargin: 30,
                                    dots: true,
                                    infinite: false,
                                    speed: 300,
                                    slidesToShow: 3,
                                    rows: 1
                                }}
                                data-responsive={[
                                    { breakpoint: 480, settings: { slidesToShow: 1, slidesMargin: 10 } },
                                    { breakpoint: 768, settings: { slidesToShow: 2, slidesMargin: 10 } },
                                    { breakpoint: 992, settings: { slidesToShow: 2, slidesMargin: 20 } },
                                    { breakpoint: 1200, settings: { slidesToShow: 3, slidesMargin: 20 } },
                                    { breakpoint: 1500, settings: { slidesToShow: 3, slidesMargin: 30 } }
                                ]}
                            >

                                <div className="kodory-team style-01 col-4">
                                    <div className="team-inner">
                                        <div className="thumb-avatar">
                                            <a href="#" target="_self" tabIndex={0}>
                                                <img
                                                    src="https://dreamingtheme.kiendaotac.com/html/kodory/assets/images/team-img1.jpg"
                                                    className="attachment-full size-full"
                                                    alt="img"
                                                />
                                            </a>
                                            <div className="list-social">
                                                <a href="#" tabIndex={0}>
                                                    <i className="az_tta-icon fa fa-facebook" />
                                                </a>
                                                <a href="#" tabIndex={0}>
                                                    <i className="az_tta-icon fa fa-twitter" />
                                                </a>
                                                <a href="#" tabIndex={0}>
                                                    <i className="az_tta-icon fa fa-instagram" />
                                                </a>
                                            </div>
                                        </div>
                                        <div className="content-team">
                                            <h3 className="name">
                                                <a href="#" target="_self" tabIndex={0}>
                                                    Annie Taylor{" "}
                                                </a>
                                            </h3>
                                            <p className="positions">Operations</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="kodory-team style-01 col-4">
                                    <div className="team-inner">
                                        <div className="thumb-avatar">
                                            <a href="#" target="_self" tabIndex={0}>
                                                <img
                                                    src="https://dreamingtheme.kiendaotac.com/html/kodory/assets/images/team-img2.jpg"
                                                    className="attachment-full size-full"
                                                    alt="img"
                                                />{" "}
                                            </a>
                                            <div className="list-social">
                                                <a href="#" tabIndex={0}>
                                                    <i className="az_tta-icon fa fa-facebook" />
                                                </a>
                                                <a href="#" tabIndex={0}>
                                                    <i className="az_tta-icon fa fa-twitter" />
                                                </a>
                                                <a href="#" tabIndex={0}>
                                                    <i className="az_tta-icon fa fa-instagram" />
                                                </a>
                                            </div>
                                        </div>
                                        <div className="content-team">
                                            <h3 className="name">
                                                <a href="#" target="_self" tabIndex={0}>
                                                    Ayomide Regan{" "}
                                                </a>
                                            </h3>
                                            <p className="positions">Marketing Personal</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="kodory-team style-01 col-4">
                                    <div className="team-inner">
                                        <div className="thumb-avatar">
                                            <a href="#" target="_self" tabIndex={0}>
                                                <img
                                                    src="https://dreamingtheme.kiendaotac.com/html/kodory/assets/images/team-img3.jpg"
                                                    className="attachment-full size-full"
                                                    alt="img"
                                                />{" "}
                                            </a>
                                            <div className="list-social">
                                                <a href="#" tabIndex={0}>
                                                    <i className="az_tta-icon fa fa-facebook" />
                                                </a>
                                                <a href="#" tabIndex={0}>
                                                    <i className="az_tta-icon fa fa-twitter" />
                                                </a>
                                                <a href="#" tabIndex={0}>
                                                    <i className="az_tta-icon fa fa-instagram" />
                                                </a>
                                            </div>
                                        </div>
                                        <div className="content-team">
                                            <h3 className="name">
                                                <a href="#" target="_self" tabIndex={0}>
                                                    Violet Frase{" "}
                                                </a>
                                            </h3>
                                            <p className="positions">Director</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div >
    );
};

export default About;