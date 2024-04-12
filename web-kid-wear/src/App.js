
import { Route, Routes } from 'react-router-dom';
import Hompage from './component/Hompage';
import Cart from './component/Cart';
import DetailProduct from './component/DetailProduct';
import Blog from './component/Blog';
import Login from './component/Login';
import AccountDetail from './component/AccountDetail';
import About from './component/About';
import ListProduct from './component/admin/ListProduct';
import CreateProduct from './component/admin/CreateProduct';
import HistoryCart from './component/HistoryCart';
import Edit from './component/admin/Edit';
import ChangePassword from './component/ChangePassword';
import Order from './component/admin/Order';


function App() {
  return (

    <Routes>
      <Route path='/' element={<Hompage />}></Route>
      <Route path='/cart' element={<Cart />}></Route>
      <Route path='/product/:id' element={<DetailProduct />}></Route>
      <Route path='/blog' element={<Blog />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/account/:id' element={<AccountDetail />}></Route>
      <Route path='/about' element={<About />}></Route>
      <Route path='/admin' element={<ListProduct />}></Route>
      <Route path='/create' element={<CreateProduct />}></Route>
      <Route path='/history' element={<HistoryCart />}></Route>
      <Route path='/admin/edit/:id' element={<Edit />}></Route>
      <Route path='/changePassword/:id' element={<ChangePassword />}></Route>
      <Route path='/order' element={<Order />}></Route>


    </Routes>
  );
}

export default App;
