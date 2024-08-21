import React from 'react'
import noData from '../../../../assets/images/no-data.png'

export default function NoData() {
  return (
    <>
    <div className="no-data text-center my-5">
      <img src={noData} alt="" />
      <h5 className='mt-5'>No Data!</h5>
    </div>


    </>
  )
}
