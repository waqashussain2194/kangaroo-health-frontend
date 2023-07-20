import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login/login';
import { Provider } from 'react-redux';
import { Store } from './redux/store';
import Dashboard from './pages/dashboard/dashboard';
import PrivateRoute from './private-route';
import Register from './pages/register/register';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const isAuthenticated = localStorage.getItem('jwtToken') ? true : false;

root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Private routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute isSignedIn={isAuthenticated}>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
