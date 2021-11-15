import React, { Component } from "react";
import FormSimples from "../../components/Inputs/FormSimples";


class DeliveryCalculator extends Component {
  state = {
    zipcode: "",
    isDeliveryCalculated: false
  }

  calculate() {
    //chamar api do correio 
    //validar se frete foi calculado
    let shipmentExist = true
    
    if(shipmentExist) {
      this.setState({ isDeliveryCalculated: true })
    }
  }

  render() {
    console.log(this.state, "state")
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

            <button className="btn-mobile btn-success" onClick={() => this.calculate()}>Calcular</button>
          </div>
          {this.state.isDeliveryCalculated == true ?
            <div className="delivery-calculated">
              <i className="fa fa-truck"></i>
              <p>22</p>
              <p>PAC, entrega em 3 dias uteis</p>
            </div>
            : ""
          }
        </div>
      </div>
    );
  }
}

export default DeliveryCalculator;
