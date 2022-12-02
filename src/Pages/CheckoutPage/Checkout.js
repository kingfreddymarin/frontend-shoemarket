import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import { Splitter, SplitterPanel } from "primereact/splitter";
import { InputText } from "primereact/inputtext";
import Header from "../SharedComponents/Header";
import { cartActions } from "../../store";

const Checkout = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [direccion, setDireccion] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [codigoPostal, setCodigoPostal] = useState("");

  const [titular, setTitular] = useState("");
  const [numTarjeta, setNumTarjeta] = useState("");
  const [expiracion, setExpiracion] = useState("");
  const [cvc, setCvc] = useState("");

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
    //Cosas que hacer
    //hacer un npm install ya que agregue nuevas dependecias - done
    //Agregar un este handler al btn de pagar
    //Realizar un post a order/save
    //Para eso creo que hay que mandar un post a client/save
    //Enviar correo al comprador con los detalles de la orden con EmailJs - https://www.emailjs.com/docs/examples/reactjs/ - Tenes que crear una cuenta - Sino le entendes ver tutorial
    //navegar al home
    //reiniciar el carrito y totalItems en redux

    const dataToSend = {
      client: {
        address: direccion,
        email: email,
        firstName: nombre,
      },
    };

    axios.post("http://localhost:8181/api/order/save");

    //Reseteando carrito
    dispatch(cartActions.reset());
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
          <span className="p-float-label" style={{ marginBottom: "2rem" }}>
            <InputText
              id="ciudad"
              value={ciudad}
              required
              onChange={(e) => setCiudad(e.target.value)}
            />
            <label htmlFor="ciudad">Ciudad</label>
          </span>
          <span className="p-float-label" style={{ marginBottom: "2rem" }}>
            <InputText
              id="depart"
              value={departamento}
              required
              onChange={(e) => setDepartamento(e.target.value)}
            />
            <label htmlFor="depart">Departamento</label>
          </span>
          <span className="p-float-label" style={{ marginBottom: "2rem" }}>
            <InputText
              id="codPostal"
              value={codigoPostal}
              required
              onChange={(e) => setCodigoPostal(e.target.value)}
            />
            <label htmlFor="codPostal">Código Postal</label>
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
            <Button label="Pagar" icon="pi pi-check" iconPos="right" />
          </div>
        </SplitterPanel>
      </Splitter>
    </>
  );
};

export default Checkout;
