import React from 'react'
import noData from '../../../../assets/images/no-data.png'

export default function DeleteConfirmation({deleteItem}) {
  return (


    <>  <div className="modal-body text-center">
      <img src={noData} alt="" />
      <h4 className='mt-4'>Delete This {deleteItem} ?</h4>
      <span className='text-muted'>are you sure you want to delete this item ? if you are sure just click on delete it</span>
    </div>
    </>



  )
}
