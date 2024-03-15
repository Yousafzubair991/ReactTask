import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import AddPost from 'src/pages/addpost';
import DashboardLayout from 'src/layouts/dashboard';

import Feed from 'src/sections/feed';
import FeedDetails from 'src/sections/feedDetails';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const AllProductsPage = lazy(() => import('src/pages/allproducts'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const RegisterPage = lazy(() => import('src/pages/register'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const AddProductPage = lazy(() => import('src/sections/products/view/add-product'));
export const AllOrders = lazy(() => import('src/sections/overview/orders/all-orders'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { path: '/', element: <Navigate to="/dashboard" /> },
        { path: 'dashboard', element: <IndexPage />, index: true },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'allproducts', element: <AllProductsPage /> },
        { path: 'addproduct', element: <AddProductPage /> },
        { path: 'allorders', element: <AllOrders /> },
        { path: 'feed', element: <Feed /> },
        { path: 'feedDetails/:id', element: <FeedDetails /> },
        { path: 'addpost', element: <AddPost /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'register',
      element: <RegisterPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
