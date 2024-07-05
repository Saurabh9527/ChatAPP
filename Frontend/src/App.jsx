
import { Button } from '@chakra-ui/react'
import React from 'react';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import './App.css'
import Home from './components/Home.jsx';
import ChatPage from './components/ChatPage.jsx';
import Error from './components/Error.jsx';

const App = () => {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/chats',
      element: <ChatPage />,
    },
    {
      path: '*',
      element: <Error />,
    },
  ]);

  return (
    <div className='App'>
    <RouterProvider router={router} />
    </div>
  )
}

export default App
