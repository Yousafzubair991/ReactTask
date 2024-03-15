import authAxios from './client';

export const UpdateProduct = async (id, payload) => {
  console.log('====================================');
  console.log('id', id);
  console.log('payload', payload);
  console.log('====================================');
  const result = authAxios.put(`/product/${id}`, payload);
  return result;
};
