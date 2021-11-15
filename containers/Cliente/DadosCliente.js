import React, { Component } from "react";
import FormSimples from "../../components/Inputs/FormSimples";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import actions from "../../redux/actions";

class DadosClienteContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      senha: "",
      confirmeSenha: "",
      nome: "",
      CPF: "",
      telefone: "",
      dataDeNascimento: "",
    };
  }

  // chamar função de atualizaçao se necessario

  onChangeInput = (field, value) => this.setState({ [field]: value });

  renderDadosRegistro() {
    const { email, senha, confirmeSenha } = this.state;

    return (
      <div className="flex-1 flex vertical">
        <div className="textField text-field_input">
          <TextField
            id="outlined-required"
            required
            label="email"
            fullWidth={true}
            variant="outlined"
            value={email || " "}
            onChange={(event) =>
              this.onChangeInput("email", event.target.value)
            }
          />
        </div>
        <div className="textField text-field_input">
          <TextField
            id="outlined-required"
            required
            label="senha"
            fullWidth={true}
            variant="outlined"
            value={senha || " "}
            hintText="Password"
            onChange={(event) =>
              this.onChangeInput("senha", event.target.value)
            }
          />
        </div>
        <div className="textField text-field_input">
          <TextField
            id="outlined-required"
            required
            label="confirme sua senha"
            fullWidth={true}
            variant="outlined"
            value={confirmeSenha || " "}
            onChange={(event) =>
              this.onChangeInput("confirmeSenha", event.target.value)
            }
          />
        </div>
      </div>
    );
  }

  renderDadosUsuario() {
    const { nome, CPF, dataDeNascimento, telefone } = this.state;
    return (
      <div className="flex-1 flex vertical input">
        <div className="flex-1 text-field_input">
          <TextField
            id="outlined-required"
            required
            label="nome"
            fullWidth={true}
            variant="outlined"
            value={nome || " "}
            onChange={(event) => this.onChangeInput("nome", event.target.value)}
          />
        </div>
        <div className="flex-1 text-field_input">
          <TextField
            id="outlined-required"
            required
            label="CPF"
            fullWidth={true}
            variant="outlined"
            value={CPF || " "}
            onChange={(event) => this.onChangeInput("CPF", event.target.value)}
          />
        </div>
        {/* <div className="flex-1 text-field_input">
          <TextField
            id="outlined-required"
            required
            label="dataDeNascimento"
            fullWidth={true}
            variant="outlined"
            value={dataDeNascimento || " "}
            onChange={(event) =>
              this.onChangeInput("dataDeNascimento", event.target.value)
            }
          />
        </div>
        <div className="flex-1 text-field_input">
          <TextField
            id="outlined-required"
            required
            label="telefone"
            fullWidth={true}
            variant="outlined"
            value={telefone || " "}
            onChange={(event) =>
              this.onChangeInput("telefone", event.target.value)
            }
          />
        </div> */}
      </div>
    );
  }

  render() {
    return (
      <div className="flex-1">
        <div>
          <h2>Dados Do Cliente</h2>
        </div>
        {this.renderDadosRegistro()}
        {this.renderDadosUsuario()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  carrinho: state.carrinho.carrinho,
  freteSelecionado: state.carrinho.freteSelecionado,
  cliente: state.client.cliente,
  autenticar: state.auth.usuario,
  token: state.auth.token,
});

export default connect(mapStateToProps, actions)(DadosClienteContainer);
