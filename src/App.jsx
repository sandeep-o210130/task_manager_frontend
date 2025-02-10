import {BrowserRouter as Router,Routes,Route,Navigate} from "react-router-dom"
import { useEffect, useState } from 'react';
import {nanoid} from 'nanoid'
import './App.css';
import Register from './register';
import Login from './login';
import Task from "./task";
import ProtectedRoute from "./protectedRoute";

function App() {
  return(
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/task" element={<ProtectedRoute><Task /></ProtectedRoute>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
