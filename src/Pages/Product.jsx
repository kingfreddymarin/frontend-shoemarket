import React, { useEffect, useState } from 'react';
import { Button } from "primereact/button";


const Product = ({ closeModal, data }) => {


   return (
      <>
         <a id="jump"></a>
         <div className='ml-5 product-container'>
            <button className='x px-1 mt-2' onClick={() => closeModal(false)}>X</button>
            <section className='d-flex p-5'>
               <section >
                  <div className='w-50 mw400' >
                     <h1>{data.name}</h1>
                     <img
                        height={"500"}
                        src={`Imagen/${data.imagen}`}
                /*onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'}*/ alt={
                           data.name
                        }
                     />
                     <h5>${data.price}</h5>
                     <Button
                        icon="pi pi-shopping-cart"
                        label="Add to Cart"
                        disabled={data.quantity == 0}
                     ></Button>
                  </div>
               </section>
               <div className='w50 ml-6 mt-6' >
                  <p>{data.description}</p>
               </div>
            </section>
         </div>
      </>

   );
}

export default Product;