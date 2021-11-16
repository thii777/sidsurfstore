import React, { Component } from "react";

import { toast } from "react-toastify";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import FormSimples from "../../../components/Inputs/FormSimples";
import { connect } from "react-redux";
import actions from "../../../redux/actions";
import { ESTADOS } from "../../../utils";
import { getCookie } from "../../../utils/cookie";
import cepData from "../../helper/cepData";
import { formatCPF, formatCEP, formatNumber } from "../../../utils/format";
import { validateCPF, validateEmail } from "../../../utils/validate";

class CadastroContainer extends Component {
  state = {
    showPassword: false,
    userName: "",
    email: "",
    password: "",
    cpf: "",
    cellphone: "", //TODO - add cellphone on the backend
    dateOfBirth: "",
    zipcode: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    state_code: "",
    country: "",
    storeIdToAddress: 1,
    showAddressInput: false,
  };

  onChangeInput(field, value) {
    this.setState({ [field]: value });
  }

  showAddressInput() {
    this.setState({ showAddressInput: true });
  }

  handleRegistryCustomer() {
    this.props.newClient(this.state, (error) => {
      if (error)
        this.setState({ aviso: { status: false, message: error.message } });
      else this.setState({ aviso: null });
    });
  }

  async handleCepData(cep) {
    this.setState({ zipcode: cep });

    if (cep.length > 8) {
      const addressComplete = await cepData(cep);
      if (addressComplete.cep) {
        this.setState({ CEP: addressComplete.cep || cep });
        this.setState({ addressId: "" });

        // this.setState({ newCep: addressComplete.cep });
        this.setState({ street: addressComplete.logradouro });
        this.setState({ neighborhood: addressComplete.bairro });
        this.setState({ city: addressComplete.localidade });
        this.setState({ state_code: addressComplete.uf });
      }

      if (addressComplete.erro) {
        this.setState({ zipcode: cep });
        this.setState({ street: "" });
        this.setState({ neighborhood: "" });
        this.setState({ city: "" });
        this.setState({ state_code: "" });

        return alert("Por favor, digite um CEP valido");
      }
    }
  }

  onChangeShowPassword = async () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  renderCustomer() {
    const { email, password, userName, cpf, cellphone, showPassword } =
      this.state;

    return (
      <div>
        <TextField
          required
          id="outlined-required"
          label="Nome completo"
          variant="standard"
          fullWidth={true}
          value={userName}
          onChange={(e) => this.onChangeInput("userName", e.target.value)}
        />
        <TextField
          required
          id="outlined-required"
          label="CPF"
          variant="standard"
          fullWidth={true}
          value={cpf}
          onChange={(e) => this.onChangeInput("cpf", formatCPF(e.target.value))}
        />
        <TextField
          required
          id="outlined-required"
          label="Email"
          variant="standard"
          fullWidth={true}
          value={email}
          onChange={(e) => this.onChangeInput("email", e.target.value)}
        />
        <TextField
          id="outlined-required"
          required
          label="password"
          fullWidth={true}
          variant="standard"
          value={password}
          type={showPassword ? "text" : "Password"}
          onChange={(e) => this.onChangeInput("password", e.target.value)}
          InputProps={{
            endAdornment: showPassword ? (
              <RemoveRedEyeIcon />
            ) : (
              <VisibilityOffIcon />
            ),
            onClick: () => this.onChangeShowPassword(),
          }}
        />
        <TextField
          required
          id="outlined-required"
          label="telefone"
          variant="standard"
          fullWidth={true}
          value={cellphone}
          onChange={(e) => this.onChangeInput("cellphone", e.target.value)}
        />
      </div>
    );
  }

  renderAddress() {
    const {
      zipcode,
      street,
      number,
      complement,
      neighborhood,
      city,
      state_code,
    } = this.state;

    return (
      <div>
        {/* {this.renderCustomer()} */}
        <TextField
          required
          id="outlined-required"
          label="Cep"
          variant="standard"
          fullWidth={true}
          value={zipcode}
          onChange={(e) => this.handleCepData(formatCEP(e.target.value))}
        />
        <div className="flex horizontal">
          <div className="flex-3">
            <TextField
              required
              id="outlined-required"
              label="Endereço"
              variant="standard"
              fullWidth={true}
              value={street}
              onChange={(e) => this.onChangeInput("street", e.target.value)}
            />
          </div>
          <div className="flex-1">
            <TextField
              required
              id="outlined-required"
              label="Numero"
              variant="standard"
              fullWidth={true}
              value={number}
              onChange={(e) =>
                this.onChangeInput("number", formatNumber(e.target.value))
              }
            />
          </div>
        </div>
        <div className="flex-1">
          <TextField
            required
            id="outlined-required"
            label="Bairro"
            variant="standard"
            fullWidth={true}
            value={neighborhood}
            onChange={(e) => this.onChangeInput("neighborhood", e.target.value)}
          />
        </div>
        <div className="flex-1">
          <TextField
            required
            id="outlined-required"
            label="Complemento"
            variant="standard"
            fullWidth={true}
            value={complement}
            onChange={(e) => this.onChangeInput("complement", e.target.value)}
          />
        </div>
        <div className="flex horizontal">
          <div className="flex-1">
            <TextField
              required
              id="outlined-required"
              label="Cidade"
              variant="standard"
              fullWidth={true}
              value={city}
              onChange={(e) => this.onChangeInput("city", e.target.value)}
            />
          </div>
          <div>
            <Autocomplete
              value={state_code || ""}
              id="outlined-required"
              options={ESTADOS}
              getOptionLabel={(option) =>
                state_code.length ? state_code : option.uf
              }
              select
              variant="outlined"
              onChange={(event, newValue) =>
                this.onChangeInput("state_code", newValue)
              }
              fullWidth={true}
              renderInput={(params) => (
                <TextField required {...params} label="UF" variant="standard" />
              )}
            />
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="Cadastro-Container">
        <h2 className="text-center">Criar Conta</h2>
        <br />
        <div className="from-cadastro">
          {!this.state.showAddressInput
            ? this.renderCustomer()
            : this.renderAddress()}

          {!this.state.showAddressInput ? (
            <div className="flex flex-center">
              <button
                className="btn btn-primary button-responsive"
                onClick={() => this.showAddressInput()}
              >
                {"CONTINUAR"}
              </button>
            </div>
          ) : (
            <div className="flex flex-center">
              <button
                className="btn btn-primary button-responsive"
                onClick={() => this.handleRegistryCustomer()}
              >
                {"CADASTRAR"}
              </button>
            </div>
          )}

          <br />
          <hr />
          <div className="link-acesso text-center">
            <span onClick={this.props.changeAcesso}>
              Já tem conta? Clique aqui para logar
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, actions)(CadastroContainer);
