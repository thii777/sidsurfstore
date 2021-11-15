import React, { Component } from "react";

import DadosPedido from "../Checkout/DadosPedido";
import OrderNumber from "./OrderNumber";
import PaymentForm from "./PaymentForm";
import DeliveryDetails from "./DeliveryDetails";

class UpdateOrCreateNewDelivery extends Component {
  render() {
    return (
      <div className="checkout container">
        <div className="checkout-title flex flex-center">
          <h2>Pedido concluido</h2>
        </div>
        <div className="checkout-title flex flex-center">
          <p>
            Obá, seu pedido foi concluido com sucesso e será entregue em até 3
            dias uteis, Você receberá atualizaçoes sobre o seu pedido por email
            e também poderá acompanhar aqui no site na aba dos meus pedidos
          </p>
        </div>
        <br />
        <br />
        <br />
        <div className="finished-order container">
          <OrderNumber />
          <PaymentForm />
          <DeliveryDetails />
          <DadosPedido />
        </div>
      </div>
    );
  }
}

export default UpdateOrCreateNewDelivery;
