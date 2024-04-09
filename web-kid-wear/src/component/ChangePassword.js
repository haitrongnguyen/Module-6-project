import React, { useEffect, useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import * as service from "../service/ProductServie"
import Swal from "sweetalert2";
import Header from './Header';
import Footer from './Footer';

const ChangePassword = () => {
    const id = useParams()
    const navigate = useNavigate()
    const [account, setAccount] = useState({})
    const accessToken = sessionStorage.getItem('accessToken');
    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/login')
    }

    const fetchApi = async (id, accessToken) => {
        try {
            console.log(id);
            const result = await service.getAccount(id, accessToken);
            console.log(result);
            setAccount(result)


            document.title = 'Account Detail';
        } catch (e) {
            console.log(e);
        }
    };
    useEffect(() => {
        fetchApi(id.id, accessToken)
        console.log(account.email);
    }, [])
    const handleSubmit = async (values) => {
        console.log(values);
        let res = await service.changePassword(values, accessToken)
        if (res) {
            if (res === "Password duplicate") {
                await Swal.fire({
                    title: "Change Password Fail! Duplicate password",
                    icon: "error",
                    confirmButtonText: "OK",
                    customClass: {
                        confirmButton: 'my-swal-confirmButton',

                    }
                });
            } else {

                await Swal.fire({
                    title: "Change Password Successfully! Please Login to continue",
                    icon: "success",
                    confirmButtonText: "OK",
                    customClass: {
                        confirmButton: 'my-swal-confirmButton',

                    }
                });
                handleLogout()
            }
        } else {
            await Swal.fire({
                title: "Change Password Fail! Please check password to continue",
                icon: "error",
                confirmButtonText: "OK",
                customClass: {
                    confirmButton: 'my-swal-confirmButton',

                }
            });
        }
        console.log(res);
    }
    return (
        <div>
            <Header />
            <div class="banner-wrapper has_background">
                <img src="https://dreamingtheme.kiendaotac.com/html/kodory/assets/images/banner-for-all2.jpg"
                    class="img-responsive attachment-1920x447 size-1920x447" alt="img" />
                <div class="banner-wrapper-inner container">
                    <h1 class="page-title">Change Password</h1>
                    <div role="navigation" aria-label="Breadcrumbs" class="breadcrumb-trail breadcrumbs">
                        <ul class="trail-items breadcrumb">
                            <li class="trail-item trail-begin"><Link to={'/'}>Home</Link></li>
                            <li class="trail-item trail-end active"><span>Change Password</span>
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
                                    <a className="nav-link active " href="#">
                                        Account Detail
                                    </a>
                                </li>
                                <li className="nav-item product-remove">
                                    <Link className="nav-link" to={'/changPassword'}>
                                        Change Password
                                    </Link>
                                </li>
                                <li className="nav-item product-remove">
                                    <a className="nav-link" href="#">
                                        History Booking
                                    </a>
                                </li>
                            </ul>
                        </div>
                        {/* Nội dung chính */}
                        {/* <form className="kodory-cart-form col-8"> */}
                        <Formik
                            enableReinitialize={true}
                            initialValues={{
                                email: account.email,
                                password: "",
                                newPassword: "",
                                confirmPassword: ""

                            }}
                            validationSchema={Yup.object({

                                password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
                                newPassword: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
                                confirmPassword: Yup.string()
                                    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
                                    .required('Confirm password is required'),
                            }
                            )}
                            onSubmit={(values) => handleSubmit(values)}
                        >
                            <Form className=' col-md-8 main-content'>

                                <table className="shop_table shop_table_responsive cart kodory-cart-form__contents">
                                    <thead>
                                        <Field type='hidden' id='id' name='id' />
                                        <Field type='hidden' id='role' name='role' />
                                        <tr>
                                            <th className="product-remove ">Email</th>
                                            <td className='product-remove'>
                                                <Field type='text' id='email' name='email' disabled />
                                                <ErrorMessage name="email" component='p'
                                                    style={{ color: 'red' }} />
                                            </td>
                                        </tr>

                                        <tr>
                                            <th className="product-remove ">Password</th>
                                            <td className='product-remove'>
                                                <Field type='password' id='password' name='password' />
                                            </td>
                                            <ErrorMessage name="password" component='p'
                                                style={{ color: 'red' }} />
                                        </tr>

                                        <tr>
                                            <th className="product-remove ">New Password</th>
                                            <td className='product-remove'>
                                                <Field type='password' id='newPassword' name='newPassword' />
                                            </td>
                                            <ErrorMessage name="newPassword" component='p'
                                                style={{ color: 'red' }} />
                                        </tr>

                                        <tr>
                                            <th className="product-remove ">Confirm Password</th>
                                            <td className='product-remove'>
                                                <Field type='text' id='confirmPassword' name='confirmPassword' />
                                            </td>
                                            <ErrorMessage name="confirmPassword" component='p'
                                                style={{ color: 'red' }} />
                                        </tr>
                                        <tr>
                                            <th>

                                            </th>
                                            <td style={{ textAlign: 'center' }}>

                                                <button type='submit' style={{ width: '200px', borderRadius: '10px', backgroundColor: "rgb(113,192,239)" }}>Submit</button>
                                            </td>
                                        </tr>
                                    </thead>
                                </table>
                            </Form>
                        </Formik>
                        {/* </form> */}
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    );
};

export default ChangePassword;