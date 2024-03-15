import { Helmet } from 'react-helmet-async';

import AllProductsPage from 'src/sections/products/view/all-products-view';

// ----------------------------------------------------------------------

export default function AllProducts() {
  return (
    <>
      <Helmet>
        <title>All Products</title>
      </Helmet>
      <AllProductsPage />
    </>
  );
}
