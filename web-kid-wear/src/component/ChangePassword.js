import React from 'react';

const ChangePassword = () => {
    return (
        <div>
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
                            initialValues={initValues}
                            validationSchema={Yup.object(validateObject)}
                            onSubmit={(values) => handleSubmit(values)}
                        >
                            <Form className=' col-md-8 main-content'>

                                <table className="shop_table shop_table_responsive cart kodory-cart-form__contents">
                                    <thead>
                                        <Field type='hidden' id='id' name='id' />
                                        <Field type='hidden' id='role' name='role' />
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
                                            <td className='product-remove'>
                                                <Field className='form-control date' type="date" name='birthday' />
                                                <ErrorMessage name="birthday" component='p'
                                                    style={{ color: 'red' }} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="product-remove "></th>
                                            <td className='product-remove'>
                                                <button style={{ width: '200px', borderRadius: '10px' }} className="btn btn-primary" type='submit'>Update</button>
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
        </div>
    );
};

export default ChangePassword;