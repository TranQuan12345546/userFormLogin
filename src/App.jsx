import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UserList from './components/user/UserList';
import UserDetail from "./components/user/UserDetail";
import UserCreate from './components/user/UserCreate';
import ResourceNotFound from "./components/ResourceNotFound";
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {

  return (
    <>
        <Routes>
        <Route path="">
          <Route index element={<UserList />}></Route>
          <Route path="create" element={<UserCreate/>}></Route>
          <Route path=":userId" element={<UserDetail />}></Route>
        </Route>
        <Route path="*" element={<ResourceNotFound />}></Route>
      </Routes>
    </>
  )
}

export default App
