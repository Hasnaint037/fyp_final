import PageLoader from '@/components/static/PageLoader';
import ProductCard from '@/components/static/ProductCard'
import { GetForChildren } from '@/store/features/product/product.slice';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function Childrens() {
  const dispatch = useDispatch();
  const { forChildren, forChildrenLoading } = useSelector(state => state.product);

  useEffect(() => {
    dispatch(GetForChildren())
  }, [])

  return (
    forChildrenLoading ? <PageLoader text="Loading Products" /> :
      <div className='w-[85%] m-auto mt-5 mb-5 min-h-[65vh]'>
        <h1 className='text-2xl font-semibold'>Explore Products for children</h1>
        <div className="flex-1 mt-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {forChildren.length > 0 ? forChildren?.map((product) => (
              <ProductCard product={product} />
            )) : <p className='text-center text-xl font-semibold w-[100vw]'>No Products Found</p>}
          </div>
        </div>
      </div>
  )
}

export default Childrens
