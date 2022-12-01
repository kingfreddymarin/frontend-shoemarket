import React, { useState } from 'react';


const Order = ({ setToggleOrder, cart }) => {

   return (
      <div className='order-container'>
         <div className='top'>
            <h4>Tu Orden</h4>
            <div onClick={() => setToggleOrder(false)}>
               <i className="fa-solid fa-xmark"></i>
            </div>
         </div>
         <div className="order-body">
            {cart.map((item) => {
               return <h1>Item {item.id}</h1>
            })}
         </div>
      </div>
   );
}

export default Order;