import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import PrimaryPage from './pages/PrimaryPage';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import Login from './pages/Login';
import Preview from './pages/Preview';

/*
 ✅ TODO: 1. Remove source and destination lang from transcript.
 ✅ TODO: 2. Add another tab for Video to Video conversion.
  TODO: 3. Preview for TTS.
  TODO: 4. Make dictionaries to work again.
  TODO: 5. Add colaboration of docs.
  TODO: 6. Some design Changes required.
  TODO: 7. Deployment on AWS.

*/

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
