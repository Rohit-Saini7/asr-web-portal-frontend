import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import PrimaryPage from './pages/PrimaryPage';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import Login from './pages/Login';
import Preview from './pages/Preview';

export default function App() {
  return (
    <RouterProvider
      router={createBrowserRouter([
        {
          path: '/',
          element: <PrimaryPage />,
          errorElement: <ErrorPage />,
          children: [
            {
              errorElement: <ErrorPage />,
              children: [
                { index: true, element: <Login /> },
                {
                  path: '/home',
                  element: <Home />,
                },
                {
                  path: '/preview',
                  element: <Preview />,
                },
              ],
            },
          ],
        },
      ])}
    />
  );
}
