import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { cartActions } from '../store';
import { Button } from "primereact/button";


const Product = ({ closeModal, data }) => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   console.log(data);

   const addToCartHandler = () => {
      dispatch(cartActions.addProduct({
         id: data.id,
         quantity: 1,
         name: data.name,
         image: data.imagen,
         precio: data.price
      }));
      navigate('/cart')
   }

   return (
      <>
         <div className='ml-5 product-container'>
            <button className='x  mt-2' onClick={() => closeModal(false)}><i className="fa-solid fa-xmark"></i></button>
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
                                       <a href="#" onClick={addToCartHandler} className="btn btn-dark w-100">Add To Cart</a>
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