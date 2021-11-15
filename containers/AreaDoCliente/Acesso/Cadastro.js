import React, { Component } from "react";

import FormSimples from "../../../components/Inputs/FormSimples";
import { connect } from "react-redux";
import actions from "../../../redux/actions";

import { ESTADOS } from "../../../utils";
import { getCookie } from "../../../utils/cookie";
import { toast } from "react-toastify";

import cepData from "../../helper/cepData";

import {
  formatCPF,
  formatCEP,
  formatNumber,
} from "../../../utils/format";
import { validateCPF, validateEmail } from "../../../utils/validate";

class CadastroContainer extends Component {
  state = {
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
        this.setState({ state: addressComplete.uf });
      }

      if (addressComplete.erro) {
        this.setState({ zipcode: cep });
        this.setState({ street: "" });
        this.setState({ neighborhood: "" });
        this.setState({ city: "" });
        this.setState({ state: "" });

        return alert("Por favor, digite um CEP valido");
      }
    }
  }

  renderCustomer() {
    const { email, password, userName, cpf, cellphone } = this.state;

    return (
      <div>
        <FormSimples
          label="Nome completo"
          value={userName}
          name="userName"
          type="text"
          placeholder="nome"
          onChange={(e) => this.onChangeInput("userName", e.target.value)}
        />
        <FormSimples
          label="CPF"
          value={cpf}
          name="cpf"
          type="text"
          placeholder="cpf"
          onChange={(e) => this.onChangeInput("cpf", formatCPF(e.target.value))}
        />
        <FormSimples
          label="Email"
          value={email}
          name="email"
          type="email"
          placeholder="email"
          onChange={(e) => this.onChangeInput("email", e.target.value)}
        />
        <FormSimples
          label="Senha"
          value={password}
          name="password"
          type="password"
          placeholder="senha"
          onChange={(e) => this.onChangeInput("password", e.target.value)}
        />
        <FormSimples
          label="Telefone"
          value={cellphone}
          name="cellphone"
          type="text"
          placeholder="11-9999-9999"
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
        {this.renderCustomer()}
        <FormSimples
          value={zipcode}
          name="CEP"
          placeholder="12345-678"
          label="Cep"
          onChange={(e) => this.handleCepData(formatCEP(e.target.value))}
        />
        <div className="flex horizontal">
          <div className="flex-3">
            <FormSimples
              value={street}
              name="street"
              placeholder="Endereço"
              label="Endereço"
              onChange={(e) => this.onChangeInput("street", e.target.value)}
            />
          </div>
          <div className="flex-1">
            <FormSimples
              value={number}
              name="numero"
              placeholder="Número"
              label="Numero"
              onChange={(e) =>
                this.onChangeInput("number", formatNumber(e.target.value))
              }
            />
          </div>
        </div>
        <div className="flex horizontal">
          <div className="flex-1">
            <FormSimples
              value={neighborhood}
              name="bairro"
              placeholder="Bairro"
              label="Bairro"
              onChange={(e) =>
                this.onChangeInput("neighborhood", e.target.value)
              }
            />
          </div>
          <div className="flex-1">
            <FormSimples
              value={complement}
              name="complemento"
              placeholder="Complemento"
              label="Complemento"
              onChange={(e) => this.onChangeInput("complement", e.target.value)}
            />
          </div>
        </div>
        <div className="flex horizontal">
          <div className="flex-1">
            <FormSimples
              label="Cidade"
              value={city}
              name="cidade"
              placeholder="Cidade"
              label="Cidade"
              onChange={(e) => this.onChangeInput("city", e.target.value)}
            />
          </div>
          <div className="form-input">
            <label>Estado</label>
            <select
              name="state_code"
              value={state_code}
              onChange={(e) => this.onChangeInput("state_code", e.target.value)}
            >
              <option>Selecione seu estado</option>
              {Object.keys(ESTADOS).map((abbr) => (
                <option key={abbr}>{ESTADOS[abbr]}</option>
              ))}
            </select>
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
                className="btn btn-primary"
                onClick={() => this.showAddressInput()}
              >
                {"CONTINUAR"}
              </button>
            </div>
          ) : (
            <div className="flex flex-center">
              <button
                className="btn btn-primary"
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
