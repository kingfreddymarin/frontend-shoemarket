import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa'
import Order from './Order'

const Header = ({ cart }) => {
   const [toggleOrder, setToggleOrder] = useState(false);

   return (
      <>
         {toggleOrder && <Order toggleOrder={toggleOrder} setToggleOrder={setToggleOrder} cart={cart} />}
         {!toggleOrder && (
            <div className='header-container'>
               <div className='logo-container'>
                  <h1>ShoeMarket</h1>
               </div>
               <div className='contents-container'>
                  <div className="categories-container">
                     <a href="#">Categorias</a>
                     <a href="/">Todos</a>
                  </div>
                  <div className="cart-container" onClick={() => setToggleOrder(true)}>
                     <FaShoppingCart />
                  </div>
               </div>
            </div>
         )}
      </>
   );
}

export default Header;