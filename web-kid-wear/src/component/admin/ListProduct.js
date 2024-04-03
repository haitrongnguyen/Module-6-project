import React, { useEffect, useState } from 'react';
import * as service from "../../service/ProductServie"
import ReactPaginate from "react-paginate";
import Header from '../Header';
import Footer from '../Footer';
import { Link, NavLink } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Swal from "sweetalert2";


const ListProduct = () => {
    const [category, setCategory] = useState([])
    const [productList, setProductList] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [nameSearch, setNameSearch] = useState("")
    const [categoryId, setCategoryId] = useState(0)
    const [full, setFull] = useState(false);
    const accessToken = sessionStorage.getItem('accessToken');
    const [flag, setFlag] = useState(false)


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
        fetchApi(0, nameSearch, categoryId)
    }, [flag]);

    const alert = (product) => {
        Swal.fire({
            title: "Do you want to delete this product? ",
            text: "You definitely want to delete the product " + product.name + " ?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
            customClass: {
                popup: 'my-swal-popup',
                header: 'my-swal-header',
                title: 'my-swal-title',
                closeButton: 'my-swal-closeButton',
                content: 'my-swal-content',
                actions: 'my-swal-actions',
                confirmButton: 'my-swal-confirmButton',
                cancelButton: 'my-swal-cancelButton',
                footer: 'my-swal-footer'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                setFlag(!flag)
                Swal.fire({
                    title: "Done !",
                    icon: "success",
                    confirmButtonText: "OK",
                    customClass: {
                        confirmButton: 'my-swal-confirmButton',

                    }
                });

                service.deleteProduct(product.id, accessToken)
            }
        });
    }
    const handleDelete = async (cartItem) => {
        alert(cartItem)
    }
    return (
        <div>
            <Header />
            <div style={{ paddingTop: '100px' }}>
                <div className="container-fluid">
                    <button style={{ backgroundColor: "rgb(113,192,239)" }}>
                        <Link to={'/create'} style={{ color: 'white' }}>Create Product</Link>
                    </button>
                    <div className="row">
                        {/* Thanh bên trái */}
                        <div className="col-md-2 sidebar">
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
                        <div className='col-md-10'>
                            <h1 style={{ backgroundColor: 'rgb(113,192,239)', color: 'white' }}>Product List</h1>
                            <table className='table table-hover' >
                                <tr>
                                    <th style={{ width: '5%' }}>#</th>
                                    <th style={{ width: '10%' }}>Name</th>
                                    <th style={{ width: '10%' }}>Image</th>
                                    <th style={{ width: '3%' }}>Quantity</th>
                                    <th style={{ width: '20%' }}>Description</th>
                                    <th style={{ width: '10%' }}>Producer</th>
                                    <th style={{ width: '5%' }}>Category</th>
                                    <th style={{ width: '12%' }} colSpan={2}>Action</th>
                                </tr>
                                {productList ? (
                                    productList.map((product, index) => (
                                        <tr>

                                            <td>{index + 1}</td>
                                            <td>{product.name}</td>
                                            <td>
                                                <img src={product.image} style={{ width: '100px', height: '100px' }} /></td>
                                            <td>{product.quantity}</td>
                                            <td>
                                                {/* {!full ? (
                                                    <span>
                                                        {product.description.substring(0, 10)}
                                                        <span onClick={() => setFull(!full)}>...</span>
                                                    </span>
                                                ) : (
                                                    <span>
                                                        {product.description}
                                                        <a style={{ color: 'blue' }} onClick={() => setFull(!full)}>(little)</a>
                                                    </span>

                                                )} */}
                                                {product.description}
                                            </td>
                                            <td>{product.producer}</td>
                                            <td>{product.category ? (product.category.name) : (<span>Loading....</span>)}</td>
                                            <td>
                                                <Link to={`/admin/edit/${product.id}`}>
                                                    <button className='btn btn-sm btn-warning'>Edit</button>
                                                </Link>
                                                <span>

                                                    <button className='btn btn-sm btn-danger' onClick={() => handleDelete(product)}>Delete</button>
                                                </span>
                                            </td>
                                        </tr>

                                    ))
                                ) : (<div>List empty</div>)}
                            </table>
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
            <ToastContainer />
            <Footer />
        </div>
    );
};

export default ListProduct;