import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import * as service from "../service/ProductServie"
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from "formik";
import SweetAlert from "sweetalert";
import Swal from "sweetalert2";

import "./style.css"

const Login = () => {
    const navigate = useNavigate();
    const [isSubmitLogin, setIsSubmitLogin] = useState(false);
    const [error, setError] = useState("")
    const [show, setShow] = useState(false)
    const [params, setParams] = useState({
        email: "",
        password: "",
    });
    const handleParamsChange = (e) => {
        const { name, value } = e.target;
        setParams((prevParams) => ({
            ...prevParams,
            [name]: value,
        }));
        console.log(params);
    };
    const initValues = {
        email: "",
        password: "",
        address: ""
    }
    const validateObject = {
        password: Yup.string().required("Password not empty").min(6, "Password great 6 character").max(20, "Password less 20 character"),
        email: Yup.string()
            .required("Email not empty")
            .matches(/^[\w\-.]+@([\w\-]+\.)+[\w\-]{2,}$/, "Email is not valid"),
        address: Yup.string().required("Address not empty"),
        phoneNumber: Yup.string().required("Phone number is not empty").matches("^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$", "Phone number must be valid format"),


    }


    const handleLogin = async () => {
        console.log(params);
        try {
            // setIsSubmitLogin(true);
            if (params.password === "" || params.email === "") {
                setError("Tên đăng nhập và mật khẩu không được để trống!");
                setIsSubmitLogin(false);
            } else {
                const req = await service.loginAccount(params);
                if (req) {

                    setError("");
                    Swal.fire({
                        title: 'Successfully',
                        text: 'Welcome to Kodory Shop',
                        icon: 'success',
                        confirmButtonColor: '#3085d6', // Thay đổi màu sắc nút OK
                        confirmButtonText: 'OK', // Thay đổi văn bản của nút OK
                        customClass: {
                            confirmButton: 'my-swal-confirmButton' // Thêm class cho nút OK
                        }
                    })
                    sessionStorage.setItem("accessToken", req.accessToken);
                    sessionStorage.setItem("userName", req.accountDTO.email);
                    sessionStorage.setItem("roleUser", req.accountDTO.role.name)
                    sessionStorage.setItem("userId", req.accountDTO.id);
                    setIsSubmitLogin(false);
                    navigate("/")
                } else {

                    await SweetAlert(
                        "Fail",
                        `Email or password are wrong`,
                        "error"
                    );
                    setIsSubmitLogin(false);
                }
            }



        } catch (err) {
            setError("Tên đăng nhập hoặc mật khẩu không chính xác!");
        }
    };

    const registerAccount = async (values) => {
        const result = await service.register(values);
        setError(result)
        console.log(result);
        if (result) {
            setShow(!show)
            await SweetAlert(
                "Successfully",
                `Login to use service!`,
                "success"
            );
        } else {
            await SweetAlert(
                "Fail",
                `Email is exist, choose other email address`,
                "error"
            );
        }

    }
    return (
        <div>
            <Header />

            <main className="site-main  main-container no-sidebar">
                <div className="container">
                    <div className="row">
                        <div className="main-content col-md-12">
                            <div className="page-main-content">
                                <div className="kodory">
                                    <div className="kodory-notices-wrapper" />
                                    <div className="u-columns col2-set" id="customer_login">
                                        <div className="u-column1 col-1">
                                            <h2>Login</h2>
                                            <form
                                                className="kodory-form kodory-form-login login"
                                                method="post"
                                            >
                                                <p className="kodory-form-row kodory-form-row--wide form-row form-row-wide">
                                                    <label htmlFor="username">
                                                        Email address&nbsp;
                                                        <span className="required">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name='email'
                                                        className="kodory-Input kodory-Input--text input-text"
                                                        onChange={(e) => handleParamsChange(e)}
                                                    />
                                                </p>
                                                <p className="kodory-form-row kodory-form-row--wide form-row form-row-wide">
                                                    <label htmlFor="password">
                                                        Password&nbsp;<span className="required">*</span>
                                                    </label>
                                                    <input
                                                        name='password'
                                                        className="kodory-Input kodory-Input--text input-text"
                                                        type="password"
                                                        onChange={(e) => handleParamsChange(e)}
                                                    />
                                                </p>
                                                <p className="form-row">
                                                    <input
                                                        type="hidden"
                                                        id="kodory-login-nonce"
                                                        name="kodory-login-nonce"
                                                        defaultValue="832993cb93"
                                                    />
                                                    <input
                                                        type="hidden"
                                                        name="_wp_http_referer"
                                                        defaultValue="/kodory/my-account/"
                                                    />
                                                    <div>
                                                        <span style={{ color: "red", fontSize: "1em" }}>{error}</span>
                                                    </div>
                                                    {isSubmitLogin ?
                                                        <button
                                                            type='button'
                                                            className="kodory-Button button"
                                                            name="login"
                                                            value="Log in"

                                                        >
                                                            Loading.........
                                                        </button> :
                                                        <button
                                                            type='button'
                                                            className="kodory-Button button"
                                                            name="login"
                                                            value="Log in"
                                                            onClick={handleLogin}
                                                        >
                                                            Log in
                                                        </button>}

                                                    <label className="kodory-form__label kodory-form__label-for-checkbox inline">
                                                        <input
                                                            className="kodory-form__input kodory-form__input-checkbox"
                                                            name="rememberme"
                                                            type="checkbox"
                                                            id="rememberme"
                                                            defaultValue="forever"
                                                        />
                                                        <span>Remember me</span>
                                                    </label>
                                                </p>
                                                <p className="kodory-LostPassword lost_password">
                                                    <a href="#">Lost your password?</a>
                                                </p>
                                                <p className="kodory-LostPassword lost_password">
                                                    No account yet, <Link onClick={() => setShow(!show)}>sign up</Link>
                                                </p>
                                                <div className="kodory-social-login">
                                                    <h6>Connect a social network</h6>
                                                    <ul>
                                                        <li>
                                                            <a className="login-facebook" href="#" target="_blank">
                                                                <i className="fa fa-facebook" />
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a className="login-google" href="#" target="_blank">
                                                                <i className="fa fa-google" />
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a className="login-twitter" href="#" target="_blank">
                                                                <i className="fa fa-twitter" />
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </form>
                                        </div>
                                        {show && (
                                            <Formik initialValues={initValues} validationSchema={Yup.object(validateObject)}
                                                onSubmit={(values) => registerAccount(values)}>
                                                <div className="u-column2 col-2">
                                                    <h2>Register</h2>
                                                    <Form method="post" className="kodory-form kodory-form-register register">
                                                        <p className="kodory-form-row kodory-form-row--wide form-row form-row-wide">
                                                            <label htmlFor="reg_email">
                                                                Email address&nbsp;<span className="required">*</span>
                                                            </label>
                                                            <Field
                                                                className="kodory-Input kodory-Input--text input-text"
                                                                type="text" id="email" name="email"
                                                                placeholder="Ex: example@gmail.com"
                                                            />
                                                            <ErrorMessage name="email" component='p'
                                                                style={{ color: 'red' }} />
                                                        </p>
                                                        <p className="kodory-form-row kodory-form-row--wide form-row form-row-wide">
                                                            <label htmlFor="reg_email">
                                                                Password&nbsp;<span className="required">*</span>
                                                            </label>
                                                            <Field
                                                                className="kodory-Input kodory-Input--text input-text"
                                                                Field type="password" id="password" name="password"
                                                            />
                                                            <ErrorMessage name="password" component='p'
                                                                style={{ color: 'red' }} />
                                                        </p>
                                                        <p className="kodory-form-row kodory-form-row--wide form-row form-row-wide">
                                                            <label htmlFor="reg_email">
                                                                Address&nbsp;<span className="required">*</span>
                                                            </label>
                                                            <Field
                                                                className="kodory-Input kodory-Input--text input-text"
                                                                Field type="text" id="address" name="address"
                                                            />
                                                            <ErrorMessage name="address" component='p'
                                                                style={{ color: 'red' }} />
                                                        </p>
                                                        <p className="kodory-form-row kodory-form-row--wide form-row form-row-wide">
                                                            <label htmlFor="reg_email">
                                                                Phone number&nbsp;<span className="required">*</span>
                                                            </label>
                                                            <Field
                                                                className="kodory-Input kodory-Input--text input-text"
                                                                Field type="text" id="phoneNumber" name="phoneNumber"
                                                            />
                                                            <ErrorMessage name="phoneNumber" component='p'
                                                                style={{ color: 'red' }} />
                                                        </p>
                                                        {/* <div>
                                                            <span style={{ color: "red", fontSize: "1em" }}>{error}</span>
                                                        </div> */}
                                                        <div className="kodory-privacy-policy-text">
                                                            <p>
                                                                Your personal data will be used to support your experience throughout
                                                                this website, to manage access to your account, and for other purposes
                                                                described in our{" "}
                                                                <a href="#" className="kodory-privacy-policy-link" target="_blank">
                                                                    privacy policy
                                                                </a>
                                                                .
                                                            </p>
                                                        </div>
                                                        <p className="kodory-FormRow form-row">
                                                            <input
                                                                type="hidden"
                                                                id="kodory-register-nonce"
                                                                name="kodory-register-nonce"
                                                                defaultValue="45fae70a87"
                                                            />
                                                            <input
                                                                type="hidden"
                                                                name="_wp_http_referer"
                                                                defaultValue="/kodory/my-account/"
                                                            />
                                                            <button
                                                                type="submit"
                                                                className="kodory-Button button"
                                                                name="register"
                                                                value="Register"
                                                            >
                                                                Register
                                                            </button>
                                                        </p>
                                                    </Form>
                                                </div>
                                            </Formik>

                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>




            <Footer />
        </div>
    );
};

export default Login;