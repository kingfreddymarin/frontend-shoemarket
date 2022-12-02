import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { useSelector } from 'react-redux';
import logoShoeMarket from '../../images/logo.jpeg'

const Header = () => {
  const navigate = useNavigate();
  const totalItems = useSelector(state => state.cart.totalItems);

  const navigateHomeHandler= () => {
    navigate('/');
  }

  const navigateCarritoHandler = () => {
    navigate('/cart');
  }


  const items = [
    {
       label:'Productos',
       command: () => {navigateHomeHandler()}
    },
  ];

  const image = <img style={{height: '5rem', width: '5rem'}} src={logoShoeMarket} alt="Logo ShoeMarket" onClick={navigateHomeHandler} />
  const cartEl = <Button type="button" label='Carrito' icon='pi pi-shopping-cart' className="" onClick={navigateCarritoHandler} badge={totalItems} iconPos="left">
    </Button>;

  return (
    <Menubar style={{justifyContent: 'space-between'}} model={items} start={image} end={cartEl}/>
  );
}

export default Header;