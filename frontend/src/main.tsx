import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Cart } from './pages/Cart';
import { Home } from './pages/Home';
import { CoffeeDetails } from './pages/CoffeeDetails';
import { Success } from './pages/Success';
import { App } from './App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/coffees/:id',
        element: <CoffeeDetails />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/order/:orderId/success',
        element: <Success />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);