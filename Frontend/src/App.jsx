import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Components/Layout';

import { AuthContextProvider } from './Context/AuthContext';
import { ToastContextProvider } from './Context/ToastContext';

import CreateOrder from './Pages/CreateOrder';

import Login from './Pages/Login';
import Signup from './Pages/Signup'
import Home from './Pages/Home';
function App() {
  return (

    <BrowserRouter>
      <ToastContextProvider>
        <AuthContextProvider>
          <Layout>
            <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/Signup' element={<Signup />} />
              <Route path='/home' element={<Home />} />
              <Route path='/createOrder' element={<CreateOrder />} />
            </Routes>
          </Layout>
        </AuthContextProvider>
      </ToastContextProvider>
    </BrowserRouter>
  );
}

export default App;