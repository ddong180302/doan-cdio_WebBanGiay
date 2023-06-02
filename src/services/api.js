import { current } from "@reduxjs/toolkit";
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

