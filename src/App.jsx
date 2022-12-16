import React from 'react';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import PrimaryPage from './pages/PrimaryPage';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import Login from './pages/Login';
import Preview from './pages/Preview';

// Todo: End to End

// Todo: ✅ User can upload a video.
// Todo: ✅ video will get transcripted
// Todo:  user can dawnload generated transcript
// Todo: Translation will get generated
// Todo: user can dawnload generated Translation

//Todo: UI changes

//Todo: ✅ Remove Upload button from tts.

// const router =;

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
