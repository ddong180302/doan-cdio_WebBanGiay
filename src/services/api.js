///api user
import axios from "../utils/axios-customize";

export const callRegister = (fullName, email, password, phone) => {
    return axios.post('/api/v1/user/register', { fullName, email, password, phone });
}

export const callLogin = (email, password) => {
    return axios.post('/api/v1/auth/login', { email, password });
}

export const callFetchAccount = () => {
    return axios.get('/api/v1/auth/account');
}

export const callLogout = () => {
    return axios.post('/api/v1/auth/logout')
}

export const callFetchListUser = (query) => {
    //return axios.get(`/api/v1/get-all-paginate?current=${current}&pageSize=${pageSize}`)
    return axios.get(`/api/v1/user/get-all-paginate?${query}`)
}

export const callCreateAUser = (fullName, email, password, phone, role) => {
    return axios.post('/api/v1/user/create-new-user', { fullName, email, password, phone, role });
}

export const callBulkCreateUser = (data) => {
    return axios.post('/api/v1/user/bulk-create', data);
}


export const callUpdateUser = (id, fullName, phone) => {
    return axios.put('/api/v1/user/update', { id, fullName, phone });
}

export const callDeleteUser = (id) => {
    return axios.delete(`/api/v1/user/delete/${id}`);
}



//api category

export const callCreateACategory = (name) => {
    return axios.post('/api/v1/category/create-new-category', { name });
}


export const callFetchCategory = () => {
    //return axios.get(`/api/v1/get-all-paginate?current=${current}&pageSize=${pageSize}`)
    return axios.get(`/api/v1/category/get-all`)
}

export const callFetchListCategory = (query) => {
    //return axios.get(`/api/v1/get-all-paginate?current=${current}&pageSize=${pageSize}`)
    return axios.get(`/api/v1/category/get-all-paginate?${query}`)
}

export const callDeleteCategory = (id) => {
    return axios.delete(`/api/v1/category/delete/${id}`);
}


export const callUpdateCategory = (name) => {
    return axios.put('/api/v1/category/update', { name });
}



//api product
export const callCreateAProduct = (category_id,
    name,
    price,
    quantity,
    sold,
    thumbnail,
    slider
) => {
    const data = new FormData();
    data.append('category_id', category_id);
    data.append('name', name);
    data.append('price', price);
    data.append('quantity', quantity);
    data.append('sold', sold);
    data.append('thumbnail', thumbnail);
    for (let i = 0; i < slider.length; i++) {
        data.append('slider[]', slider[i]);
    }
    return axios.post('/api/v1/product/create-new-product', data);
}

export const callFetchListProduct = (query) => {
    return axios.get(`/api/v1/product/get-all-paginate?${query}`)
}

export const callDeleteProduct = (id) => {
    return axios.delete(`/api/v1/product/delete/${id}`);
}

export const callUpdateProduct = (id, name, price, quantity, thumbnail) => {
    const data = new FormData();
    data.append('id', id);
    data.append('name', name);
    data.append('price', price);
    data.append('quantity', quantity);
    data.append('thumbnail', thumbnail);
    return axios.put('/api/v1/product/update', data);
}

export const callFetchProductById = (id) => {
    return axios.get(`/api/v1/detail-product/${id}`);
}

export const callPlaceOrder = (data) => {
    return axios.post(`/api/v1/order`, {
        ...data
    });
}



