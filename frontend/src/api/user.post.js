import authAxios from './client';

export const UserLogin = async (payload) => {
  const result = authAxios.post(`/user/signin`, payload);
  return result;
};

export const UserRegister = async (payload) => {
  const result = authAxios.post(`/user/signup`, payload);
  return result;
};

export const AddNewProduct = async (payload) => {
  const result = authAxios.post(`/product`, payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
    },
  });
  return result;
};

// update post views
export const UpdatePostViews = async (id) => {
  const result = authAxios.post(`/posts/views/${id}`);
  return result;
};

// Add new post
export const AddNewPost = async (payload) => {
  const result = authAxios.post(`/posts`, payload);
  return result;
};
