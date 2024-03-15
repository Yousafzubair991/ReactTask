import authAxios from './client';

// -----------Get All Posts--------------
export const FetchAllPosts = async () => {
  const result = authAxios.get(`/posts/`);
  return result;
};

// -----------Get All Users--------------
export const FetchAllUsers = async () => {
  const result = authAxios.get(`/user/`);
  return result;
};

// -----------Get All Orders--------------
export const FetchAllOrders = async () => {
  const result = authAxios.get(`/order/`);
  return result;
};

// -----------Get All Products--------------
export const FetchAllProducts = async () => {
  const result = authAxios.get(`/product/`);
  return result;
};

// -----------Get Post Details--------------
export const FetchPostDetails = async (id) => {
  const result = authAxios.get(`/posts/${id}`);
  return result;
};
