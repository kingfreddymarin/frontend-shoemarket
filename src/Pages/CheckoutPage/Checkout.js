import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";

// import axios from "axios";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import { Splitter, SplitterPanel } from "primereact/splitter";
import { InputText } from "primereact/inputtext";
import Header from "../SharedComponents/Header";
import { OrderService } from "../service/OrderService";
import { ProductService } from "../service/ProductService";

import { cartActions } from "../../store";

const Checkout = () => {
  const [nombre, setNombre] = useState("");
  const [segundoNombre, setSegundoNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const navigate = useNavigate();
  // const [alert, setAlert] = useState({
  //   state: null,
  //   message: "",
  // });

  const [titular, setTitular] = useState("");
  const [numTarjeta, setNumTarjeta] = useState("");
  const [expiracion, setExpiracion] = useState("");
  const [cvc, setCvc] = useState("");
  const [products, setProducts] = useState(null);

  const productService = new ProductService();

  useEffect(() => {
    productService.getAll().then((data) => setProducts(data));
  }, []);

  const formatCurrency = (value) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const dispatch = useDispatch();
  const carrito = useSelector((state) => state.cart.cart);
  const totalOrden = carrito.reduce(
    (preValue, currValue) => preValue + currValue.total,
    0
  );

  const payHandler = () => {
    const orderService = new OrderService();
    const order = {
      client: {
        address: direccion,
        email: email,
        firstName: nombre,
        lastName: apellido,
        secondName: segundoNombre,
        telephone: telefono,
      },
      detalles: carrito.map((product) => {
        return {
          count: product.quantity,
          idProducto: product.id,
        };
      }),
      numbercard: numTarjeta,
      paymentMethod: "CASH",
      total: totalOrden,
    };
    try {
      orderService.checkout(order);
      for (let product of products) {
        for (let item of order.detalles) {
          if (product.id === item.idProducto) {
            let productToUpdate = {
              ...product,
              quantity: product.quantity - item.count,
            };
            productService.save(productToUpdate);
          }
        }
      }
      //template for emailjs
      const templateParams = {
        name: order.client.firstName,
        price: order.total,
        qty: order.detalles.length,
        email: order.client.email,
        location: order.client.address
      };
      emailjs
        .send(
          "service_bxrt7ga",
          "template_qw8m1mj",
          templateParams,
          "RaU1e-BoQmPLJe1W2"
        )
        .then(
          (result) => {
            console.log(result.text);
          },
          (error) => {
            console.log(error.text);
          }
        );
    } catch (error) {
      console.error(error);
    }
    //Reseteando carrito
    dispatch(cartActions.reset());
    //redirect to home
    navigate("/");
  };

  return (
    <>
      <Header />
      <Splitter
        style={{ padding: "5rem" }}
        contentEditable="false"
        draggable="false"
      >
        <SplitterPanel>
          <h5 style={{ marginBottom: "2rem" }}>Información del Cliente</h5>
          <span className="p-float-label" style={{ marginBottom: "2rem" }}>
            <InputText
              id="name"
              value={nombre}
              required
              onChange={(e) => setNombre(e.target.value)}
            />
            <label htmlFor="name">Nombre</label>
          </span>
          <span className="p-float-label" style={{ marginBottom: "2rem" }}>
            <InputText
              id="secondName"
              value={segundoNombre}
              required
              onChange={(e) => setSegundoNombre(e.target.value)}
            />
            <label htmlFor="name">Segundo nombre </label>
          </span>
          <span className="p-float-label" style={{ marginBottom: "2rem" }}>
            <InputText
              id="lastn"
              value={apellido}
              required
              onChange={(e) => setApellido(e.target.value)}
            />
            <label htmlFor="lastn">Apellido</label>
          </span>
          <span className="p-float-label" style={{ marginBottom: "2rem" }}>
            <InputText
              id="correo"
              value={email}
              required
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="correo">Correo Electrónico</label>
          </span>
          <span className="p-float-label" style={{ marginBottom: "2rem" }}>
            <InputText
              id="telefono"
              value={telefono}
              required
              type="number"
              onChange={(e) => setTelefono(e.target.value)}
            />
            <label htmlFor="correo">Telefono</label>
          </span>

          <Divider />

          <h5 style={{ marginBottom: "2rem" }}>Dirección de Envío</h5>
          <span className="p-float-label" style={{ marginBottom: "2rem" }}>
            <InputText
              id="direcc"
              value={direccion}
              required
              onChange={(e) => setDireccion(e.target.value)}
            />
            <label htmlFor="direcc">Dirección</label>
          </span>
        </SplitterPanel>
        <SplitterPanel>
          <div style={{ paddingLeft: "2rem" }}>
            <h5 style={{ marginBottom: "2rem" }}>Total a Pagar</h5>
            <h5 style={{ marginBottom: "2rem" }}>
              {formatCurrency(totalOrden)}
            </h5>

            <Divider />

            <h5 style={{ marginBottom: "2rem" }}>Información de la Tarjeta</h5>
            <span className="p-float-label" style={{ marginBottom: "2rem" }}>
              <InputText
                id="titular"
                value={titular}
                required
                onChange={(e) => setTitular(e.target.value)}
              />
              <label htmlFor="titular">Titular</label>
            </span>
            <span className="p-float-label" style={{ marginBottom: "2rem" }}>
              <InputText
                id="numTarjeta"
                value={numTarjeta}
                required
                onChange={(e) => setNumTarjeta(e.target.value)}
              />
              <label htmlFor="numTarjeta">Número de la tarjeta</label>
            </span>
            <span className="p-float-label" style={{ marginBottom: "2rem" }}>
              <InputText
                id="expiracion"
                value={expiracion}
                required
                onChange={(e) => setExpiracion(e.target.value)}
              />
              <label htmlFor="expiracion">Fecha de Expiración</label>
            </span>
            <span className="p-float-label" style={{ marginBottom: "2rem" }}>
              <InputText
                id="cvc"
                value={cvc}
                required
                onChange={(e) => setCvc(e.target.value)}
              />
              <label htmlFor="cvc">CVC</label>
            </span>
            <Button
              onClick={payHandler}
              label="Pagar"
              icon="pi pi-check"
              iconPos="right"
              type="submit"
            />
          </div>
        </SplitterPanel>
      </Splitter>
    </>
  );
};

export default Checkout;
