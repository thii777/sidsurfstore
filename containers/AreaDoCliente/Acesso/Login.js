import React, { Component } from "react";

import { connect } from "react-redux";
import actions from "../../../redux/actions";
import TextField from "@material-ui/core/TextField";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

class LoginContainer extends Component {
  state = {
    showPassword: false,
    email: "",
    senha: "",
    aviso: null,
    erros: {},
  };

  validate() {
    const { email, senha } = this.state;
    const erros = {};

    if (!email) erros.email = "Preencha aqui com o seu email";
    if (!senha) erros.senha = "Preencha aqui com a sua senha";

    this.setState({ erros, aviso: null });
    return Object.keys(erros).length === 0;
  }

  handleLogin() {
    const { email, senha } = this.state;

    if (!email || !senha) alert("Favor inserir email e senha");

    this.props.autenticar({ email, password: senha }, false, (error) => {
      if (error) {
        this.setState({ aviso: { status: false, message: error.message } });
      }
      this.setState({ aviso: null });
    });
  }

  onChangeInput(field, e) {
    this.setState({ [field]: e.target.value });
  }

  onChangeShowPassword = async () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  render() {
    const { email, senha, showPassword } = this.state;

    return (
      <div className="Login-Container">
        <h2 className="text-center">Minha Conta</h2>
        <div className="flex-1 text-field_input">
          <TextField
            required
            id="outlined-required"
            label="Email"
            variant="standard"
            fullWidth={true}
            value={email}
            onChange={(e) => this.onChangeInput("email", e)}
          />
          <TextField
            id="outlined-required"
            required
            label="Senha"
            fullWidth={true}
            variant="standard"
            value={senha}
            type={showPassword ? "text" : "Password"}
            onChange={(e) => this.onChangeInput("senha", e)}
            InputProps={{
              endAdornment: showPassword ? (
                <RemoveRedEyeIcon />
              ) : (
                <VisibilityOffIcon />
              ),
              onClick: () => this.onChangeShowPassword(),
            }}
          />

          <br />
          <div className="flex flex-center">
            <button
              className="btn btn-primary button-responsive"
              onClick={() => this.handleLogin()}
            >
              ENTRAR
            </button>
          </div>
          <br />
          <hr />
          <div className="link-acesso text-center">
            <span onClick={this.props.changeAcesso}>
              Não tem conta? Clique aqui para cadastrar
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, actions)(LoginContainer);
