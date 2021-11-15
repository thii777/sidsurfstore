import React, { Component } from "react";

import FormSimples from "../../../components/Inputs/FormSimples";
import { connect } from "react-redux";
import actions from "../../../redux/actions";

class FormularioSenha extends Component {
  state = {
    senhaAntiga: "",
    password: "",
    confirmarNovaSenha: "",
  };

  onChangeInput(field, value) {
    this.setState({ [field]: value });
  }

  handleUpdateUser() {
    const { password, confirmarNovaSenha } = this.state;
    
    if (password !== confirmarNovaSenha) return alert("Senhas não conferem");

    this.props.updateUser(this.state, this.props.token, (error) => {
      if (error)
        this.setState({ aviso: { status: false, message: error.message } });
      else this.setState({ aviso: null });
    });

    alert("atualizado com sucesso")
  }

  render() {
    const { senhaAntiga, password, confirmarNovaSenha } = this.state;
    return (
      <div className="flex-4 conteudo-area-cliente">
        <h2>ALTERAR SENHA</h2>
        <br />
        <br />
        <div className="form-dados">
          <br />
          <FormSimples
            value={senhaAntiga}
            name="senhaAntiga"
            type="password"
            placeholder="Senha Antiga"
            onChange={(e) => this.onChangeInput("senhaAntiga", e.target.value)}
          />
          <FormSimples
            value={password}
            name="password"
            type="password"
            placeholder="Nova Senha"
            onChange={(e) => this.onChangeInput("password", e.target.value)}
          />
          <FormSimples
            value={confirmarNovaSenha}
            name="confirmarNovaSenha"
            type="password"
            placeholder="Confirmar Nova Senha"
            onChange={(e) =>
              this.onChangeInput("confirmarNovaSenha", e.target.value)
            }
          />
        </div>
        <br />
        <div className="flex flex-start">
          <button
            className="btn btn-primary"
            onClick={() => this.handleUpdateUser()}
          >
            SALVAR
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  updateUser: state.client.updateUser,
  token: state.auth.token,
});

export default connect(mapStateToProps, actions)(FormularioSenha);
