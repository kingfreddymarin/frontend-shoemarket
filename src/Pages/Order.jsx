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
               return (
                  <div key={item.id} className='order-items'>
                     <h1 > {item.name}</h1>
                     <img className="item-image" src={`Imagen/${item.imagen}`} alt={item.name} />
                     <p>{item.quantity}</p>
                  </div>
               )
            })}
         </div>
      </div>
   );
}

export default Order;