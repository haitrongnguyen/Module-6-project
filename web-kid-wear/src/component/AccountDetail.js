import React, { useEffect, useState } from 'react';
import './account.css'
import Header from './Header';
import Footer from './Footer';
import { Link, useNavigate, useParams } from 'react-router-dom';
import * as service from "../service/ProductServie"
import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from "formik";
import Swal from "sweetalert2";
import { storage } from './firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { v4 } from 'uuid';

const AccountDetail = () => {
    const idA = useParams()
    console.log(idA);
    const [account, setAccount] = useState({})
    const accessToken = sessionStorage.getItem('accessToken');
    const [imageUpload, setImageUpload] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [flag, setFlag] = useState(false)
    const navigate = useNavigate();




    const fetchApi = async (id, accessToken) => {
        try {
            console.log(id);
            const result = await service.getAccount(id, accessToken);
            console.log(result);
            setAccount(result)
            console.log(account.email);

            document.title = 'Account Detail';
        } catch (e) {
            console.log(e);
        }
    };

    const uploadImage = async () => {
        console.log(imageUpload);
        if (imageUpload == "") return;
        const imageRef = ref(storage, `account/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload).then(() => {
            // alert("Image upload")
            getDownloadURL(imageRef).then((url) => {
                setImageUrl(url)
            })
        })
        console.log(imageUrl);

    }

    useEffect(() => {
        fetchApi(idA.id, accessToken)
        uploadImage(); // Chờ uploadImage hoàn thành trước khi gọi fetchApi
    }, [imageUpload])
    const initValues = {
        email: account.email,
        address: account.address,
        birthday: account.birthday,
        fullName: account.fullName,
        phoneNumber: account.phoneNumber,
        id: account.id,
        role: account.role,
        image: account.image,
        password: account.password
    }
    const validateObject = {
        address: Yup.string().required("Address not empty"),
        phoneNumber: Yup.string().required("Phone number is not empty").matches("^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$", "Phone number must be valid format"),
    }
    console.log(account.birthday);

    if (account === null) {
        return null;
    }

    const handleSubmit = async (values) => {
        console.log(imageUrl);
        if (imageUrl !== "") {
            values.image = imageUrl;
        }
        console.log(values);
        let res = service.updateAccount(values, accessToken);
        setFlag(!flag)
        await Swal.fire({
            title: "Update Successfully !",
            icon: "success",
            confirmButtonText: "OK",
            customClass: {
                confirmButton: 'my-swal-confirmButton',

            }
        });
        console.log(res);
    }
    return (
        <div>

            <Header />
            <div class="banner-wrapper has_background">
                <img src="https://dreamingtheme.kiendaotac.com/html/kodory/assets/images/banner-for-all2.jpg"
                    class="img-responsive attachment-1920x447 size-1920x447" alt="img" />
                <div class="banner-wrapper-inner container">
                    <h1 class="page-title">Account Detail</h1>
                    <div role="navigation" aria-label="Breadcrumbs" class="breadcrumb-trail breadcrumbs">
                        <ul class="trail-items breadcrumb">
                            <li class="trail-item trail-begin"><Link to={'/'}>Home</Link></li>
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
                                    <a className="nav-link active " href="#">
                                        Account Detail
                                    </a>
                                </li>
                                <li className="nav-item product-remove">
                                    <Link className="nav-link" to={`/changePassword/${account.id}`}>
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
                        {/* Nội dung chính */}
                        {/* <form className="kodory-cart-form col-8"> */}
                        <div className='col-6'>
                            <Formik
                                enableReinitialize={true}
                                initialValues={initValues}
                                validationSchema={Yup.object(validateObject)}
                                onSubmit={(values) => handleSubmit(values)}
                            >
                                <Form>
                                    <h1>Detail Account</h1>
                                    <table className="shop_table shop_table_responsive cart kodory-cart-form__contents">
                                        <thead>
                                            <Field type='hidden' id='id' name='id' />
                                            <Field type='hidden' id='role' name='role' />
                                            <Field type='image' id='role' name='image' />
                                            <tr>
                                                <th className="product-remove ">Full name</th>
                                                <td className='product-remove'>
                                                    <Field type='text' id='fullName' name='fullName' />
                                                </td>
                                                <ErrorMessage name="fullName" component='p'
                                                    style={{ color: 'red' }} />
                                            </tr>
                                            <tr>
                                                <th className="product-remove ">Email</th>
                                                <td className='product-remove'>
                                                    <Field type="text" name='email' disabled />
                                                    <ErrorMessage name="email" component='p'
                                                        style={{ color: 'red' }} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th className="product-remove ">Phone number</th>
                                                <td className='product-remove'>
                                                    <Field type="text" name='phoneNumber' />
                                                    <ErrorMessage name="phoneNumber" component='p'
                                                        style={{ color: 'red' }} />
                                                </td>
                                            </tr>

                                            <tr>
                                                <th className="product-remove ">Address</th>
                                                <td className='product-remove'>
                                                    <Field type="text" name='address' />
                                                    <ErrorMessage name="address" component='p'
                                                        style={{ color: 'red' }} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th className="product-remove ">Birthday</th>
                                                <td className='product-remove'  >
                                                    <Field className='form-control date' style={{ display: 'flex', justifyContent: 'center' }} type="date" name='birthday' />
                                                    <ErrorMessage name="birthday" component='p'
                                                        style={{ color: 'red' }} />
                                                </td>
                                            </tr>

                                            {/* <tr>
                                                <th className="product-remove ">Birthday</th>
                                                <td className='product-remove'  >
                                                    <Field className='form-control date' style={{ display: 'flex', justifyContent: 'center' }} type="date" name='birthday' />
                                                    <ErrorMessage name="birthday" component='p'
                                                        style={{ color: 'red' }} />
                                                </td>
                                            </tr> */}


                                            <tr>
                                                <th className="product-remove ">Image</th>
                                                <td className='product-remove' >

                                                    <input className="form-control" type="file" id="formFile" placeholder='Select file'
                                                        onChange={(event) => {
                                                            const selectedFile = event.target.files[0];
                                                            if (selectedFile) {
                                                                setImageUpload(selectedFile);
                                                            }
                                                        }} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th className="product-remove "></th>
                                                <td className='product-remove'>
                                                    <button style={{ width: '200px', borderRadius: '10px', backgroundColor: "rgb(113,192,239)" }} type='submit'>Update</button>
                                                </td>
                                            </tr>

                                        </thead>
                                    </table>
                                </Form>
                            </Formik>

                        </div>
                        <div className='col-3'>
                            {account.image ? (
                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
                                    {imageUrl ? (
                                        <img className='img-thumbnail' src={imageUrl} />
                                    ) : (

                                        <img className='img-thumbnail' src={account.image} />
                                    )}
                                </div>

                            ) :
                                (
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>

                                        <img src='https://inkythuatso.com/uploads/thumbnails/800/2023/03/8-anh-dai-dien-trang-inkythuatso-03-15-26-54.jpg' />
                                    </div>
                                )}
                            <p style={{ textAlign: 'center' }}>{account.email}</p>
                        </div>
                        {/* </form> */}
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    );
};

export default AccountDetail;