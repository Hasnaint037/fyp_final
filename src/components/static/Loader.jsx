import React from 'react'
import { ThreeDots } from 'react-loader-spinner'

function Loader() {
  return (
    <div className='a'>
      <ThreeDots
        visible={true}
        height="100"
        width="100"
        color="white"
        radius="12"
        ariaLabel="three-dots-loading"
      />
    </div>
  )
}

export default Loader
