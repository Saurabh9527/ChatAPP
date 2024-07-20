
import { Button } from '@chakra-ui/react'
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css'
import HomePage from './Pages/HomePage.jsx';
import ChatPage from './Pages/ChatPage.jsx';
import Error from './components/Error.jsx';

const App = () => {

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/chats' element={<ChatPage />}/>
        <Route path='*' element={<Error />}/>
      </Routes>
    </div>
  )
}

export default App
