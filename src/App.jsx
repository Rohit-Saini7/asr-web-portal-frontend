import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import PrimaryPage from './pages/PrimaryPage';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import Login from './pages/Login';
import Preview from './pages/Preview';

/*
  TODO: 5. Add collaboration of docs.
  TODO: 6. Some design Changes required.
  TODO: 7. Deployment on AWS.

*/

/* 
1. language of video in transcript
2. add home tab "Name not set yet" have Video in english, translation in hindi, timing of specific sentence output is video
3. dropdown for using a previously uploaded/generated file
4. add other tabs in preview page
5. if if transcript is generating then only transcript will have previewButtons
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
