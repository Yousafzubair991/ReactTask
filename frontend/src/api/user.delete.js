import authAxios from './client';

export const DeleteProduct = async (id) => {
  const result = authAxios.delete(`/product/${id}`);
  return result;
};
