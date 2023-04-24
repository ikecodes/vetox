import Image from "next/image";
import React from "react";

const Customers = () => {
  return (
    <div className='container p-5'>
      <h6 className='text-center mb-5'>Trusted by 50K Customers</h6>
      <div className='row'>
        <div className='col-lg-3 text-center'>
          <Image
            src='/customers/hospital.svg'
            alt='Glo'
            height='100'
            width='100'
          />
        </div>
        <div className='col-lg-3  text-center'>
          <Image
            src='/customers/deloitte.svg'
            alt='Glo'
            height='100'
            width='100'
          />
        </div>
        <div className='col-lg-3  text-center'>
          <Image src='/customers/mtn.svg' alt='Glo' height='100' width='100' />
        </div>
        <div className='col-lg-3  text-center'>
          <Image src='/customers/map.svg' alt='Glo' height='100' width='100' />
        </div>
      </div>
    </div>
  )
}



export default Customers;
