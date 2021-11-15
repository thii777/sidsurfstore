import React, { Component } from "react";

import { connect } from "react-redux";
import actions from "../../redux/actions";

class FormModal extends Component {
  constructor() {
    super();
    this.state = {
      foundCPF: "",
      cpf: "",
      password: "",
    };
  }

  async onChangeInputCPF(field, value) {
    this.setState({ [field]: value });

    await this.props.checkClientExist(value);

    this.setState({ foundCPF: this.props.client_exist.clientExist });
  }

  handleDirectRegister() {
    if (this.state.cpf > 11 && this.state.foundCPF == false) {
      Router.push("/checkout");
      alert("Direcionando para pagina de cadastro");
    }
  }

  render() {
    const { name, checked, label, onChange } = this.props;

    return (
      <div>
        <div id="abrirModal" class="modal">
          <div className="modalTest">
            <a href="#fechar" title="Fechar" class="fechar">
              x
            </a>
            <div>
              <div>
                <h4>Digite seu CPF</h4>
                <FormSimples
                  label=""
                  value={this.cpf}
                  name="cpf"
                  type="text"
                  placeholder=""
                  onChange={(e) =>
                    this.onChangeInput("cpf", e.target.value.replace(/\D/g, ""))
                  }
                />
              </div>
              {this.state.foundCPF ? (
                <div>
                  <div>
                    <h4>Digite sua senha</h4>
                    <FormSimples
                      label=""
                      value={this.password}
                      name="password"
                      type="password"
                      placeholder=""
                      onChange={(e) =>
                        this.onChangeInput("password", e.target.value)
                      }
                    />
                  </div>
                  <button
                    className="btn btn-success"
                    onClick={() => this.handleDirectCheckMyData()}
                  >
                    Enviar
                  </button>
                </div>
              ) : (
                this.handleDirectRegister()
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  carrinho: state.carrinho.carrinho,
  freteSelecionado: state.carrinho.freteSelecionado,
  check_client: state.client.check_client_exist,
});

export default connect(mapStateToProps, actions)(FormModal);
