import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';

import Applicant from './components/Applicant';
import ApplicantAdd from './components/Applicant/Form/ApplicantAdd';
import ApplicantEdit from './components/Applicant/Form/ApplicantEdit';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        >
          <Route index element={<Applicant />} />
          <Route path="add-applicant" element={<ApplicantAdd />} />
          <Route path="edit-applicant/:id" element={<ApplicantEdit />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
