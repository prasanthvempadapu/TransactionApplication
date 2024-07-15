import './App.css';
import Home from './pages/Home'
import AddTransaction from './pages/AddTransaction';
import DeleteTransaction from './pages/DeleteTransaction';
import UpdateTransaction from './pages/UpdateTransaction';
import {Route,BrowserRouter,Routes} from 'react-router-dom';

function App() {
  return (
   <BrowserRouter>
    <Routes>
        <Route exact path='/' element={<Home/>}></Route>
        <Route exact path='/AddTransaction' element={<AddTransaction/>}></Route>
        <Route exact path='/Delete/:id' element={<DeleteTransaction/>}></Route>
        <Route exact path='/Update/:id' element={<UpdateTransaction/>}></Route>
    </Routes>
   </BrowserRouter>
  );
}

export default App;
