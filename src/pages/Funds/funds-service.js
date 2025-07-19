import api from "../../services/apiService";

export const getFundsList = async (payload) => {
    const res = await api.get(`fund/list`, payload);
    return res.data;
};

export const getFundsDetailsById = async (payload) => {
    const res = await api.post(`fund-scheme/getFundScheme`, payload)
    return res.data
}

export const updateFundsCategory = async (payload) => {
    const res = await api.post(`fund-scheme/updateCategory`, payload)
    return res.data
}

export const getAMCList = async (payload) => {
    const res = await api.post(`amc/list`, payload);
    return res.data;
};

export const assignFundsToCategory = async (payload) => {
    const res = await api.post('category/assignFunds', payload);
    return res.data;
};

export const addCategory = async (payload) => {
    const res = await api.post('category/add', payload);
    return res.data;
};

export const reorderCategories = async (payload) => {
    const res = await api.post('category/reorder', payload);
    return res.data;
};

export const updateCategory = async (payload) => {
    const res = await api.post('category/update', payload);
    return res.data;
};

export const deleteCategory = async (payload) => {
    const res = await api.post('category/delete', payload);
    return res.data;
};

export const getAllCategories = async (payload = {}) => {
    const res = await api.get('category/list', payload);
    return res.data;
};

export const exploreCategories = async (payload) => {
    const res = await api.post('category/explore', payload);
    return res.data;
};