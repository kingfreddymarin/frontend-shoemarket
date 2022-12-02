import React from 'react';
import Header from '../SharedComponents/Header';
import { useSelector } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import './DataTableDemo.css';

const Cart = () => {
  const carrito = useSelector(state => state.cart.cart);

  const formatCurrency = (value) => {
      return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }

  const imageBodyTemplate = (rowData) => {
      return <img src={`Imagen/${rowData.image}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={rowData.image} className="product-image" />;
  }

  const priceBodyTemplate = (rowData) => {
      return formatCurrency(rowData.precio);
  }

  const totalBodyTemplate = (rowData) => {
    return formatCurrency(rowData.total);
  }

  const header = (
      <div className="table-header">
          Productos en el Carrito
          <Button icon="pi pi-refresh" />
      </div>
  );

  const totalOrden = carrito.reduce( (preValue, currValue) => preValue + currValue.total, 0);

  const footer = `El total es ${formatCurrency(totalOrden)}`;

  const footer2 = (
    <div className="table-header">
        El total es {formatCurrency(totalOrden)}
        <Button label="Pagar" icon="pi pi-angle-right" iconPos='right' />
    </div>
);

  /*
         id: data.id,
         quantity: 1,
         name: data.name,
         image: data.imagen,
         precio: data.price
    */


  return (
    <>
      <Header />
      <div className="datatable-templating-demo">
          <div className="card">
              <DataTable value={carrito} header={header} footer={footer2} responsiveLayout="scroll">
                  <Column field="name" header="Nombre"></Column>
                  <Column header="Imagen" body={imageBodyTemplate}></Column>
                  <Column field="precio" header="Precio Unitario" body={priceBodyTemplate}></Column>
                  <Column field="quantity" header="Cantidad"></Column>
                  <Column field="total" header="Total" body={totalBodyTemplate}></Column>
              </DataTable>
          </div>
      </div>
    </>
      
  );
}

export default Cart;