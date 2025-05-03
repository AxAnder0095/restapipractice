import './App.css'
import {Routes, Route} from 'react-router-dom'
import { Navbar } from './components/Navbar';
import { Showroom } from './views/Showroom';
import { AddCar } from './views/AddCar';
import { Manage } from './views/Manage';

function App() {
  return (
    <div className='App'>
      <div className='app-wrapper'>
        <Navbar/>
        <Routes>
          <Route index element={<Showroom/>}/>
          <Route path={'/addcar'} element={<AddCar/>}/>
          <Route path={'/manage'} element={<Manage/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App