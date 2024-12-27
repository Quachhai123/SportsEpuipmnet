import Sidebar from './Sidebar'
import { Route, Routes } from 'react-router-dom'
import AddProduct from './AddProduct'
import ListProduct from './ListProduct'
import Dashboard from './Dashboard'
import AddBrand from './AddBrand'
import ListBrand from './ListBrand'

const Admin = () => {
  return (
    <div className=''>
      <Sidebar />
      <Routes>
      <Route path='/dashboard' element={<Dashboard />}/>
        <Route path='/addProduct' element={<AddProduct />}/>
        <Route path='/listProduct' element={<ListProduct />}/>
        <Route path='/addBrand' element={<AddBrand />}/>
        <Route path='/listBrand' element={<ListBrand />}/>
      </Routes>

    </div>
  )
}

export default Admin
