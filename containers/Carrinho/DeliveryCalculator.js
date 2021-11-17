import React, { Component } from "react";
import FormSimples from "../../components/Inputs/FormSimples";
import { formatMoney } from "../../utils/";

const dataShipping = [
  {
    value: 22,
    deadLine: 2,
    type: "Sedex",
  }
];

class DeliveryCalculator extends Component {
  state = {
    zipcode: "",
    isDeliveryCalculated: false,
  };

  calculate() {
    //chamar api do correio
    //validar se frete foi calculado
    let shipmentExist = true;

    if (shipmentExist) {
      this.setState({ isDeliveryCalculated: true });
    }
  }

  renderShippingResult() {
    return dataShipping.map((shipping) => {
      return (
        <div className="delivery-calculated">
          <i className="fa fa-truck"></i>
          <p>{formatMoney(shipping.value)}</p>
          <p>{`${shipping.type}, prazo ${shipping.deadLine} dias uteis`}</p>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="delivery-calculator">
        <div className="delivery-container">
          <div className="delivery-calculator-box">
            <p>Calcular Frete</p>
            <div>
              <FormSimples
                label=""
                value={this.state.zipcode}
                name=""
                type="text"
                placeholder=""
                onChange={(e) => this.setState({ zipcode: e.target.value })}
              />
            </div>

            <button
              className="btn-mobile btn-success"
              onClick={() => this.calculate()}
            >
              OK
            </button>
          </div>
          {this.state.isDeliveryCalculated == true
            ? this.renderShippingResult()
            : ""}
        </div>
      </div>
    );
  }
}

export default DeliveryCalculator;
