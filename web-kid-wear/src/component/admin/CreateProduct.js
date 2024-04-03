import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { storage } from '../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { v4 } from 'uuid';
import * as Yup from 'yup';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import * as service from "../../service/ProductServie"
import { ToastContainer, toast } from 'react-toastify';
import Swal from "sweetalert2";

const CreateProduct = () => {
    const [imageUpload, setImageUpload] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [categories, setCategories] = useState([])
    const accessToken = sessionStorage.getItem('accessToken');
    const [isSubmit, setIsSubmit] = useState(false)
    const navigate = useNavigate()
    const uploadImage = () => {
        console.log(imageUpload);
        if (imageUpload == "") return;
        const imageRef = ref(storage, `productImage/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload).then(() => {
            // alert("Image upload")
            getDownloadURL(imageRef).then((url) => {
                setImageUrl(url)
            })
        })

    }

    const handleSubmit = async (values) => {
        values.image = imageUrl
        let category = JSON.parse(values.category)
        if (category === null) {
            Swal.fire({
                title: "Fail !",
                icon: "success",
                confirmButtonText: "OK",
                customClass: {
                    confirmButton: 'my-swal-confirmButton',

                }
            });
        }
        values.category = category;
        let res = await service.saveProduct(values, accessToken)

        Swal.fire({
            title: "Add product successfully !",
            icon: "success",
            confirmButtonText: "OK",
            customClass: {
                confirmButton: 'my-swal-confirmButton',

            }
        });
        setIsSubmit(true)
        navigate('/admin')
        console.log(values);
    }
    const getCategory = async () => {
        const result1 = await service.getAllCate()
        setCategories(result1)
    }

    useEffect(() => {
        uploadImage()
        getCategory()

    }, [imageUpload])
    return (
        <div>
            <Header />
            <div style={{ paddingTop: '100px', marginBottom: '50px' }}>
                <button className='btn btn-primary' style={{ width: '200px' }}>
                    <Link to={'/create'}>Create Product</Link>
                </button>
                <div className="row">
                    <div className="col-md-3 sidebar border-right">
                        <h3>Menu</h3>
                        <ul className="nav flex-column">
                            <li className="nav-item product-remove">
                                <NavLink to={'/admin'} className="nav-link active ">
                                    Product
                                </NavLink>
                            </li>
                            <li className="nav-item product-remove">
                                <NavLink className="nav-link">
                                    Account
                                </NavLink>
                            </li>
                            <li className="nav-item product-remove">
                                <NavLink className="nav-link">
                                    Oder
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className='col-md-6 border-right'>

                        <Formik
                            initialValues={{
                                name: "",
                                price: 0,
                                image: "",
                                producer: "",
                                description: "",
                                viewer: 0,
                                quantity: 0,
                                category: {}
                            }}
                            validationSchema={Yup.object({
                                name: Yup.string().required("Not empty"),
                                price: Yup.number().required("Not empty").min(0, "Must be great 0"),
                                description: Yup.string().required("Not empty"),
                                quantity: Yup.number().integer("Must be integer").min(1, "Must be > 0"),
                                producer: Yup.string().required("Not empty")
                            })}
                            onSubmit={(values) => handleSubmit(values)}
                        >
                            <Form style={{ marginLeft: '100px' }}>
                                <h1 style={{ marginRight: '130px', textAlign: 'center', color: 'white', backgroundColor: 'rgb(113,192,239)' }}>Create Product</h1>

                                <div style={{ marginTop: '10px' }}>
                                    <label style={{ width: '90px' }}>Name: </label>
                                    <Field name="name" type='text' style={{ width: '400px', marginLeft: '20px' }} />
                                    <ErrorMessage name='name' component='p' style={{ color: 'red' }} />
                                </div>
                                <div style={{ marginTop: '10px' }}>
                                    <label style={{ width: '90px' }} >Producer: </label>
                                    <Field name="producer" type='text' style={{ width: '400px', marginLeft: '20px' }} />
                                    <ErrorMessage name='producer' component='p' style={{ color: 'red' }} />
                                </div>
                                <div style={{ marginTop: '10px' }}>
                                    <label style={{ width: '90px' }} >Price: </label>
                                    <Field name="price" type='number' style={{ width: '400px', marginLeft: '20px' }} />
                                    <ErrorMessage name='name' component='p' style={{ color: 'red' }} />
                                </div>
                                <div style={{ marginTop: '10px' }}>
                                    <label style={{ width: '90px' }} >Description: </label>
                                    <Field as='textarea' rows={5} name="description" className='form-control' style={{ width: '510px' }} />
                                    <ErrorMessage name='description' component='p' style={{ color: 'red' }} />
                                </div>
                                <div style={{ marginTop: '10px' }}>
                                    <label style={{ width: '90px' }}>Quantity: </label>
                                    <Field name="quantity" type='number' style={{ width: '400px', marginLeft: '20px' }} />
                                    <ErrorMessage name='quantity' component='p' style={{ color: 'red' }} />
                                </div>

                                <div style={{ marginTop: '10px' }}>
                                    <label style={{ width: '90px' }}>Category: </label>
                                    <Field name="category" as='select' style={{ width: '400px', marginLeft: '20px' }} >
                                        <option value={null}>Select category</option>
                                        {categories ? (
                                            categories.map((category, index) => (
                                                <option value={JSON.stringify(category)} key={index}>{category.name}</option>
                                            ))
                                        ) : (<span></span>)}
                                    </Field>
                                    <ErrorMessage name='quantity' component='p' style={{ color: 'red' }} />
                                </div>
                                <div style={{ marginTop: '10px' }}>
                                    <label style={{ width: '90px' }} >Image: </label>
                                    <input style={{ marginLeft: '20px' }} type='file' onChange={(event) => {
                                        setImageUpload(event.target.files[0])
                                        uploadImage();
                                    }} />
                                </div>

                                {imageUrl && !isSubmit ? (
                                    <div style={{ display: 'flex', justifyContent: 'right', marginRight: '120px' }}>

                                        <button style={{ backgroundColor: 'rgb(113,192,239)' }} type='submit' >Submit</button>
                                    </div>
                                ) : (
                                    <div style={{ display: 'flex', justifyContent: 'right', marginRight: '120px' }}>

                                        <button style={{ backgroundColor: 'rgb(113,192,239)' }} type='button'>Loading........</button></div>)}



                            </Form>
                        </Formik>
                    </div>
                    <div className='col-md-2 '>
                        <div>

                            {imageUrl ? (


                                <img style={{ width: '300px', height: '300px' }} src={imageUrl} />

                            ) : (
                                <img src='https://lovekids.vn/wp-content/uploads/2021/09/anh-mac-dinh-lovekids-3.jpg'></img>
                            )}
                            {/* <input value={imageUrl} style={{ width: '400px', marginLeft: '20px' }} /> */}
                            {/* <button type='button' onClick={uploadImage}>Select Image</button> */}
                        </div>
                    </div>
                    {/* </div> */}
                    {/* </div> */}

                </div>
            </div>
            <ToastContainer />
            <Footer />
        </div>
    );
};

export default CreateProduct;