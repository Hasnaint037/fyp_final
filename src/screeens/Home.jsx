import PageLoader from '@/components/static/PageLoader';
import ProductCard from '@/components/static/ProductCard'
import { GetAllProduct } from '@/store/features/product/product.slice';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function Home() {
  const dispatch = useDispatch();
  const { allProducts, allProductLoading } = useSelector(state => state?.product);

  useEffect(() => {
    dispatch(GetAllProduct());
  }, [])

  return (
    allProductLoading ? <PageLoader /> :
      <div className='w-[85%] m-auto mt-5 mb-5'>
        <h1 className='text-2xl font-semibold'>Here you can explore!</h1>
        <div className="flex-1 mt-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allProducts?.map((product) => (
              <ProductCard product={product} />
            ))}
          </div>
        </div>
      </div>
  )
}

export default Home
