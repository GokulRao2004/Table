import { BrowserRouter,Route,Routes  } from 'react-router-dom'
import './App.css'
import { Table } from './components/Table/Table'
import { Upload } from './pages/Upload'
import { Trail } from './components/trial/Trail'

function App() {

  return (
    <div className='app'>
      {/* <Table /> */}
    <BrowserRouter>
      <Routes>
        <Route path="/table/:id" element={<Table/>} />
        <Route path=":id" element={<Trail/>}></Route>
        <Route path="/upload" element = {<Upload/>} ></Route>
        
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
