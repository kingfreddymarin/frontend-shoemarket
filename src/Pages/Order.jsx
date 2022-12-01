import React, { useState } from 'react';


const Order = ({ setToggleOrder }) => {
   const [cart, setCart] = useState([]);
   return (
      <div className='order-container'>
         <div className='top'>
            <h4>Tu Orden</h4>
            <div onClick={() => setToggleOrder(false)}>
               <i className="fa-solid fa-xmark"></i>
            </div>
         </div>
      </div>
   );
}

export default Order;