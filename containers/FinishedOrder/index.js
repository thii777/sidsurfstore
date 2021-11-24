import React, { Component } from "react";
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import { getToken } from '../../utils/token';

import DadosPedido from "../Checkout/DadosPedido";
import OrderNumber from "./OrderNumber";
import PaymentForm from "./PaymentForm";
import DeliveryDetails from "./DeliveryDetails";

class UpdateOrCreateNewDelivery extends Component {
  state = {
    order: {}
  }

  componentDidMount() {
    const { id } = this.props.router.query
    const token = getToken()
    this.props.fetchPedido(id, token)
  }
  
  render() {
    console.log(this.props, "thissss")
    const { Id, payment } = this.props.pedido && this.props.pedido.order ? this.props.pedido.order : ""

    return (
      <div className="success-container">
        <div className="success-components">
          <div className="success-title flex flex-center">
            <h2 className="success-title_h2">Pedido realizado com sucesso</h2>
          </div>
          <div className="finished-order">
            <OrderNumber orderId={Id} />
            <PaymentForm payment={payment}/>
            <DeliveryDetails />
            <DadosPedido />
          </div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  pedido: state.pedido.pedido
})

export default connect(mapStateToProps, actions)(withRouter(UpdateOrCreateNewDelivery));
