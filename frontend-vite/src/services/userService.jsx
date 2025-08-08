import axios from "axios";

const BASE_URL = "http://localhost:8080/api/user";

export const addUser = (userData) => axios.post(`${BASE_URL}/register`, userData);

export const updateUser = (id, userData) => axios.put(`${BASE_URL}/update/${id}`, userData);

export const deleteUser = (id) => axios.delete(`${BASE_URL}/delete/${id}`);

export const getAllUsers = () => axios.get(`${BASE_URL}/all`);

export const getUserById = (id) => axios.get(`${BASE_URL}/get/${id}`);
