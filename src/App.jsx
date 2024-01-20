import { useState } from 'react'
import './App.css'
import { Modal } from './components/Modal/Modal'
import { Table } from './components/Table/Table'


function App() {
  const [modalOpen, setmodalOpen] = useState(false);
  return (
    <div className='app'>
     <Table />
     {/* <button className='btn' onClick={() => setmodalOpen(true)}>Add</button>
     {modalOpen && <Modal 
        closeModal = {()=>{
          setmodalOpen(false);
        }}
     />} */}
    </div>
  )
}

export default App
