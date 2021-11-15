import React, { Component } from "react";
import Router from "next/router";
import FormSimples from "../components/Inputs/FormSimples";

import action from "../redux/actions";
import { connect } from "react-redux";

class Validate extends Component {
  state = {
    email: "",
  };

  componentDidMount() {
    const { fetchClient, token } = this.props;
    
    fetchClient(token);
  }

  onChangeInput(field, value) {
    this.setState({ [field]: value });
  }

  handleValidateCustomer() {
    const { email: emailBack } = this.props;
    const { email: emailFront } = this.state;

    if (emailFront == emailBack) return Router.push("/customer-area");

    return Router.push("/checkout");
  }

  render() {
    return (
      <div className="validate">
        <FormSimples
          value={this.email}
          type="text"
          onChange={(e) => this.onChangeInput("email", e.target.value)}
        />
        <button onClick={() => this.handleValidateCustomer()}>Ok</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  client: state.client.cliente,
  token: state.auth.token,
});

export default connect(mapStateToProps, action)(Validate);
