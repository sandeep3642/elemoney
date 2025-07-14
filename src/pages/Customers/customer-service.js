import api from "../../services/apiService";

export const getAllCustomer = async () => {
    const res = await api.post(`customer/customerList`, {});
    return res.data;
};

export const getCutomerDetailsById = async (payload) => {
    const res = await api.post(`customer/customerDetails`, payload)
    return res.data
}