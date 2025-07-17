import api from "../../services/apiService";

export const getAllCustomer = async (payload) => {
  const res = await api.get('customer/List', { params: payload });
  return res.data;
};

export const getCutomerDetailsById = async (payload) => {
  const res = await api.post(`customer/customerDetails`, payload);
  return res.data;
};

export const createCustomer = async (customerData) => {
  const res = await api.post(`customer/create`, customerData);
  return res.data;
};

// Step 2-5: Update customer with additional details
export const updateCustomer = async (customerId, updateData) => {
  const res = await api.put(`customer/update/${customerId}`, updateData);
  return res.data;
};
