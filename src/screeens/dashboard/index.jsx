import React from 'react'
import OrderStatusGraph from './components/OrderStatusGraph'
import ProductCountGraph from './components/ProductCountGraph'
import ProductsTable from './components/ProductsTable'
import { Button } from '@/components/ui/button'

function index() {
  return (
    <div className='w-full'>
      <div className='flex gap-2 flex-col lg:flex-row w-[90%] m-auto'>
        <div className='w-[100%] lg:w-[70%]'>
          <ProductCountGraph />
        </div>
        <div className='w-[100%] lg:w-[30%] py-4'>
          <OrderStatusGraph />
        </div>
      </div>
      <div className='w-[90%] m-auto mt-5 mb-5 pb-3'>
        <div className='flex justify-between items-center mb-5'>
          <h1 className='text-xl font-bold'>Products</h1>
          <Button className="bg-black text-white">Add New Product</Button>
        </div>
        <ProductsTable />
      </div>
    </div>
  )
}

export default index
