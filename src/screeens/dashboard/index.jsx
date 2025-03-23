import React from 'react'
import OrderStatusGraph from './components/OrderStatusGraph'
import ProductCountGraph from './components/ProductCountGraph'
import ProductsTable from './components/ProductsTable'
import { Button } from '@/components/ui/button'

function index() {
  return (
    <div className='w-[100vw] h-[100vh] p-8'>
      <div className='flex gap-2 w-[90%] m-auto'>
        <div className='w-[70%]'>
          <ProductCountGraph />
        </div>
        <div className='w-[30%] py-4'>
          <OrderStatusGraph />
        </div>
      </div>
      <div className='w-[90%] m-auto mt-5 mb-3'>
        <div className='flex justify-between items-center mb-5'>
          <h1 className='text-xl font-bold'>Products</h1>
          <Button className="bg-black text-white">Add New Product</Button>
        </div>
        <ProductsTable />
      </div>
      <p>thank you</p>
    </div>
  )
}

export default index
