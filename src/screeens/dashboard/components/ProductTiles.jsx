import React from 'react'
import { SiVirustotal } from "react-icons/si";
import { LiaBullseyeSolid } from "react-icons/lia";
import { IoFlashOffOutline } from "react-icons/io5";
import { MdDoNotDisturbOnTotalSilence } from "react-icons/md";
import { useSelector } from 'react-redux';

function ProductTiles() {
  const { allProducts } = useSelector(state => state.product);
  return (
    <div className='w-[80%] m-auto mt-3 flex gap-5'>
      <div className='flex justify-between w-[33%] py-5 px-5 shadow border rounded'>
        <div className='px-2 h-14 flex justify-center items-center rounded bg-[#1FFAE2]'><SiVirustotal size={30} /></div>
        <div><h2 className='font-bold'>Total Products</h2>
          <p className='fw-semibold'>{allProducts.length}</p></div>
      </div>
      <div className='flex justify-between w-[33%] py-5 px-5 shadow border rounded'>
        <div className='px-2 h-14 flex justify-center items-center  rounded bg-[#3689FF]'><LiaBullseyeSolid size={30} /></div>
        <div><h2 className='font-bold'>InStock Products</h2>
          <p className='fw-semibold'>{allProducts.map(product => product.quantity > 0).length}</p></div>
      </div>
      <div className='flex justify-between w-[33%] py-5 px-5 shadow border rounded'>
        <div className='px-2 h-14 flex justify-center items-center rounded bg-[#8AA0BE]'><IoFlashOffOutline size={30} /></div>
        <div><h2 className='font-bold'>out of stock</h2>
          <p className='fw-semibold'> {allProducts.filter(product => product.quantity === 0).length}</p></div>
      </div>
      <div className='flex justify-between w-[33%] py-5 px-5 shadow border rounded'>
        <div className='px-2 h-14 flex justify-center items-center rounded bg-[#1FFAE2]'><MdDoNotDisturbOnTotalSilence size={30} /></div>
        <div><h2 className='font-bold'>Total Orders</h2>
          <p className='fw-semibold'>31</p></div>
      </div>
    </div>
  )
}

export default ProductTiles
