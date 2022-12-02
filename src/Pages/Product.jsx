import React, { useState } from 'react';
import { Button } from "primereact/button";


const Product = ({ closeModal, data, cart, setCart }) => {
   const [newCart, setNewCart] = useState([])

   const addToCart = () => {
      // for (let i = 0; i <= cart.length - 1; i++) {
      //    if (cart[i].idProduct === data.id) {
      //       const item = {
      //          ...
      //       }
      //       cart[i].quantity = cart[i].quantity + 1
      //    } else if (cart[i].idProduct !== data.id) {

      //    }
      // }
      const item = {
         id: new Date().getTime().toString(),
         idProduct: data.id,
         name: data.name,
         description: data.description,
         imagen: data.imagen,
         quantity: 1,
         display: data.display,
         price: data.price
      }
      console.log(item)
      setCart([...cart, item])
   }
   return (
      <>
         <div className='ml-5 product-container'>
            <button className='x  mt-2' onClick={() => closeModal(false)}>X</button>
            <div className="container">
               <div className="col-lg-8 border p-3 main-section bg-white">
                  <div className="row m-0">
                     <div className="col-lg-4 left-side-product-box pb-3">
                        <img src={`Imagen/${data.imagen}`} className="border p-3" />
                        <span className="sub-img" />
                        <span />
                     </div>
                     <div className="col-lg-8">
                        <div className="right-side-pro-detail border p-3 m-0">
                           <div className="row">
                              <div className="col-lg-12">
                                 <p className="m-0 p-0">{data.name}</p>
                              </div>
                              <div className="col-lg-12">
                                 <p className="m-0 p-0 price-pro">${data.price}</p>
                                 <hr className="p-0 m-0" />
                              </div>
                              <div className="col-lg-12 pt-2">
                                 <h5>Product Detail</h5>
                                 <span>{data.description}</span>
                                 <hr className="m-0 pt-2 mt-2" />
                              </div>
                              <div className="col-lg-12 mt-3">
                                 <div className="row">
                                    <div className="col-lg-6 pb-2">
                                       <a href="#" onClick={() => addToCart()} className="btn btn-dark w-100">Add To Cart</a>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

               </div>
            </div >
         </div>
      </>

   );
}

export default Product;