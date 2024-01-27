
import './App.css'
import { Table } from './components/Table/Table'
import{
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import {Upload} from '../src/pages/Upload'

function App() {


  return (
    <div className='app'>
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Table/>}></Route>
        <Route path="/" element={<Table/>}></Route>
        <Route path="/upload" element = {<Upload/>} ></Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
