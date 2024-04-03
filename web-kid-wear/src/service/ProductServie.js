import axios from "axios";
export const getAllProduct = async (page, searchName, categoryId) => {
    try {
        let rs = await axios.get(`http://localhost:8080/api/home?page=${page}&searchName=${searchName}&categoryId=${categoryId}`);
        return rs.data
    } catch (e) {
        return undefined
    }
}
export const getAllProductPro = async (page, searchName, categoryId) => {
    try {
        let rs = await axios.get(`http://localhost:8080/api/home/search?page=${page}&searchName=${searchName}&categoryId=${categoryId}`);
        return rs.data
    } catch (e) {
        return undefined
    }
}
export const addToCart = async (product, id, quantity, accessToken) => {
    console.log(product, id, quantity, accessToken);
    try {
        let rs = await axios.post(`http://localhost:8080/api/user/add-to-cart?accountId=${id}&productId=${product}&quantity=${quantity}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
        return rs.data
    } catch (e) {
        console.log(e);
    }
}

export const getCart = async (accountId, accessToken) => {
    console.log(accountId, accessToken);
    try {
        let rs = await axios.get(`http://localhost:8080/api/user/cart/${accountId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return rs.data
    } catch (e) {
        console.log(e);
    }
}

export const getAllCart = async (accountId, accessToken) => {
    console.log(accountId, accessToken);
    try {
        let rs = await axios.get(`http://localhost:8080/api/user/history/${accountId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return rs.data
    } catch (e) {
        console.log(e);
    }
}

export const getCartId = async (accountId, accessToken) => {
    console.log(accountId, accessToken);
    try {
        let rs = await axios.get(`http://localhost:8080/api/user/cartId/${accountId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return rs.data
    } catch (e) {
        console.log(e);
    }
}

export const getSum = async (accountId, accessToken) => {
    try {
        let rs = await axios.get(`http://localhost:8080/api/user/cart/sum/${accountId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return rs.data
    } catch (e) {
        console.log(e);
    }
}
// export const getSumCart = async (accountId) => {
//     try {
//         let rs = await axios.get(`http://localhost:8080/api/home/cart/cart/${accountId}`);
//         return rs.data
//     } catch (e) {
//         return undefined
//     }
// }

export const getProduct = async (id) => {
    try {
        let rs = await axios.get(`http://localhost:8080/api/home/product/${id}`);
        return rs.data
    } catch (e) {
        return undefined
    }
}
export const plusQuantity = async (id, accessToken) => {
    try {
        let rs = await axios.get(`http://localhost:8080/api/user/cart/plus/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return rs
    } catch (e) {
        console.log(e);
    }
}

export const divQuantity = async (id, accessToken) => {
    try {
        let rs = await axios.get(`http://localhost:8080/api/user/cart/div/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return rs.data
    } catch (e) {
        return undefined
    }
}

export const deleteCartItem = async (id, accessToken) => {
    try {
        let rs = await axios.get(`http://localhost:8080/api/user/cart/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return rs.data
    } catch (e) {
        return undefined
    }
}

export const getAllCate = async () => {
    try {
        let rs = await axios.get(`http://localhost:8080/api/home/cate`);
        return rs.data
    } catch (e) {
        return undefined
    }
}

export const checkLike = async (accountId, accessToken) => {
    try {
        let rs = await axios.get(`http://localhost:8080/api/user/check?accountId=${accountId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return rs.data
    } catch (e) {
        return undefined
    }
}

export const like = async (accountId, productId, accessToken) => {
    try {
        let rs = await axios.get(`http://localhost:8080/api/user/like/${productId}/${accountId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return rs.data
    } catch (e) {
        console.log(e);
    }
}

export const getProductLikedByManyPeople = async () => {
    try {
        let rs = await axios.get(`http://localhost:8080/api/home/like`);
        return rs.data
    } catch (e) {
        console.log(e);
    }
}

export const loginAccount = async (params) => {
    try {
        let rs = await axios.post(`http://localhost:8080/login`, params);
        return rs.data
    } catch (e) {
        return undefined
    }
}

export const handleSuccess = async (cartId, amount, accessToken) => {
    try {
        console.log(`http://localhost:8080/user/checkout?cartId=${cartId}&amount=${amount}`)
        let rs = await axios.get(`http://localhost:8080/api/user/checkout?cartId=${cartId}&amount=${amount}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return rs.data
    } catch (e) {
        return undefined
    }
}

export const register = async (user) => {
    try {
        let rs = await axios.post(`http://localhost:8080/register`, user);
        return rs.data
    } catch (e) {
        return e.data;
    }
}
export const getAccount = async (id, accessToken) => {
    try {
        let rs = await axios.get(`http://localhost:8080/api/user/account?accountId=${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return rs.data
    } catch (e) {
        console.log(e);;
    }
}

export const updateAccount = async (account, accessToken) => {
    try {
        let rs = await axios.patch(`http://localhost:8080/api/user/account/update`, account, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return rs.data
    } catch (e) {
        console.log(e);;
    }
}

export const saveProduct = async (product, accessToken) => {
    try {
        let rs = await axios.post(`http://localhost:8080/api/admin/add-product`, product, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return rs.data
    } catch (e) {
        console.log(e);;
    }
}

export const saveProductEdit = async (product, accessToken) => {
    try {
        let rs = await axios.patch(`http://localhost:8080/api/admin/save-product`, product, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return rs.data
    } catch (e) {
        console.log(e);;
    }
}

export const getCartItemByCartId = async (id, accessToken) => {
    try {
        let rs = await axios.get(`http://localhost:8080/api/user/getCartItem/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return rs.data
    } catch (e) {
        console.log(e);;
    }
}

export const deleteProduct = async (id, accessToken) => {
    try {
        let rs = await axios.get(`http://localhost:8080/api/admin/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return rs.data
    } catch (e) {
        console.log(e);;
    }
}



