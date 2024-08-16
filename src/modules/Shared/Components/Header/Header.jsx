import React from 'react'


export default function Header({ title, decription, imgUrl, item }) {
  return (
    <>
      <div className="container-fluid p-3 header-container">
        <div className="row align-items-center">
          <div className="col-md-6">
            <div className="content">

              <div className="d-flex align-items-center">
                <h2 >{title}</h2>
                <h2 className='mx-3 fw-light '>{item}</h2>
              </div>
              <p>{decription}</p>
            </div>
          </div>
          <div className="col-md-6 d-flex justify-content-end">
            <div className="img">
              <img src={imgUrl} alt="header-image" className='w-75' />
            </div>
          </div>
        </div>
      </div>



    </>
  )
}

