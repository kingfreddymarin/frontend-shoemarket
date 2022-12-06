import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux"; //Dispatch para realizar acciones, selecter para leer de nuestro store
import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { ProductService } from "../service/ProductService";
import Header from "./SharedComponents/Header";
import { cartActions } from "../store"; //Importamos las acciones
import "../styles/DataViewDemo.css";
import Product from "./Product";

const Home = () => {
  const [products, setProducts] = useState(null);
  const [layout, setLayout] = useState("grid");
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [sortField, setSortField] = useState(null);
  const [show, setShow] = useState(false);
  const [current, setCurrent] = useState(null);

  const sortOptions = [
    { label: "De alto a bajo precio", value: "!price" },
    { label: "De bajo a alto precio", value: "price" },
  ];

  const productService = new ProductService();

  useEffect(() => {
    productService.getAll().then((data) => setProducts(data));
  }); // eslint-disable-line react-hooks/exhaustive-deps

  const onSortChange = (event) => {
    const value = event.value;

    if (value.indexOf("!") === 0) {
      setSortOrder(-1);
      setSortField(value.substring(1, value.length));
      setSortKey(value);
    } else {
      setSortOrder(1);
      setSortField(value);
      setSortKey(value);
    }
  };

  const renderListItem = (data) => {
    return (
      <>
        <div
          onClick={() => {
            setShow(true);
            setCurrent(data);
          }}
          className="col-12 hov"
        >
          <div className="product-list-item">
            <img
              src={`Imagen/${data.imagen}`}
              onError={(e) =>
                (e.target.src =
                  "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
              }
              alt={data.name}
            />
            <div className="product-list-detail">
              <div className="product-name">{data.name}</div>
            </div>
            <div className="product-list-action">
              <span className="product-price">${data.price}</span>
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderGridItem = (data) => {
    return (
      <>
        <div
          className="col-12 md:col-4 hov"
          onClick={() => {
            setShow(true);
            setCurrent(data);
          }}
        >
          <div className="product-grid-item card">
            <div className="product-grid-item-top">
              <div>
                <i className="pi pi-tag product-category-icon"></i>
                <span className="product-category">{data.category}</span>
              </div>
            </div>
            <div className="product-grid-item-content">
              <img
                height={"300"}
                src={`Imagen/${data.imagen}`}
                alt={data.name}
              />
              <div className="product-name">{data.name}</div>
            </div>
            <div className="product-grid-item-bottom">
              {data.price ? (
                <span className="product-price">${data.price} </span>
              ) : (
                <span className="product-price">$0.00 </span>
              )}
            </div>
          </div>
        </div>
      </>
    );
  };

  const itemTemplate = (product, layout) => {
    if (!product) {
      return;
    }

    if (layout === "list") return renderListItem(product);
    else if (layout === "grid") return renderGridItem(product);
  };

  const renderHeader = () => {
    return (
      <div className="grid grid-nogutter">
        <div className="col-6" style={{ textAlign: "left" }}>
          <Dropdown
            options={sortOptions}
            value={sortKey}
            optionLabel="label"
            placeholder="Ordenar por precio"
            onChange={onSortChange}
          />
        </div>
        <div className="col-6" style={{ textAlign: "right" }}>
          <DataViewLayoutOptions
            layout={layout}
            onChange={(e) => setLayout(e.value)}
          />
        </div>
      </div>
    );
  };

  const header = renderHeader();
  return (
    <>
      <Header />
      <div className="dataview-demo">
        <div className="card">
          {show && <Product id="prdct" closeModal={setShow} data={current} />}
          {!show && (
            <DataView
              value={products}
              layout={layout}
              header={header}
              itemTemplate={itemTemplate}
              paginator
              rows={9}
              sortOrder={sortOrder}
              sortField={sortField}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
