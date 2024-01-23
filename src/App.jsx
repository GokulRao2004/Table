import { useState } from 'react'
import './App.css'
import { Table } from './components/Table/Table'
import { Table2 } from './components/Table/table2';
import { Payment } from './components/payment/Payment';


function App() {


  return (
    <div className='app'>
     <Table />
     <Table2 />
    </div>
  )
}

export default App
