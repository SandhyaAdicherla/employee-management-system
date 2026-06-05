import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Employees from './pages/Employees'
import ProtectedRoute from './components/ProtectedRoute'
import AddEmployee from './pages/AddEmployee'
import EditEmployee from './pages/EditEmployee'
import { ToastContext } from './Context/ToastContext'
import { useContext } from 'react'
import Toast from './components/Toast'
import EmployeeDetails from './pages/EmployeeDetails'
import '../src/components/Toast.css'

function App() {
  const { toast } =
  useContext(ToastContext);
  return (
    <>
    <Toast
      show={toast.show}
      message={toast.message}
      type={toast.type}
    />
    <BrowserRouter>
    <Routes>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/dashboard' element={<Dashboard/>} />
      <Route path='/employees' 
        element={
        <ProtectedRoute>
          <Employees/>
          </ProtectedRoute>
        } />
      <Route path="/add-employee"
          element={
            <ProtectedRoute>
              <AddEmployee />
            </ProtectedRoute>
          }
        />
      <Route
        path="/edit-employee/:id"
        element={
          <ProtectedRoute>
            <EditEmployee />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employees/:id"
        element={
          <ProtectedRoute>
            <EmployeeDetails />
          </ProtectedRoute>
        }
      />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
