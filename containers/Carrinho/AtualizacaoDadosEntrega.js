import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import axios from "axios";
import Link from "next/link";
import { getHeaders } from "../../redux/actions/helpers";
import cepData from "../helper/cepData";

import { ESTADOS } from "../../utils/";
import { formatCEP, formatNumber } from "../../utils/format";
import actions from "../../redux/actions";
import { API, loja } from "../../config";
import { getToken } from "../../utils/token";
import { toast } from "react-toastify";

class AtualizacaoDadosEntrega extends Component {
  constructor() {
    super();
    this.state = {
      addressId: "",
      local: "",
      numero: "",
      bairro: "",
      complemento: "",
      cidade: "",
      estado: "",
      CEP: "",
      newCep: "",
      token: "",
    };
  }

  onChange = (field, e) => this.setState({ [field]: e.target.value });

  handleCreateOrUpdateShipping() {
    const { CEP, newCep, local, numero, cidade } = this.state;

    if ((CEP !== newCep && local.length, numero.length, cidade.length)) {
      this.props.newAddress(this.state, this.state.token, (error) => {
        if (error)
          this.setState({ aviso: { status: false, message: error.message } });
        else this.setState({ aviso: null });
      });
      // alert("criado com sucesso");
    }
    // if (this.state.CEP == this.state.newCep) {
    //   this.props.updateAddress(
    //     this.state.addressId,
    //     this.state,
    //     this.state.token,
    //     (error) => {
    //       if (error)
    //         this.setState({ aviso: { status: false, message: error.message } });
    //       else this.setState({ aviso: null });
    //     }
    //   );
    // }
  }

  async handleCepData(cep) {
    this.setState({ CEP: cep });

    if (cep.length > 8) {
      const addressComplete = await cepData(cep);

      if (addressComplete.cep) {
        this.setState({ CEP: addressComplete.cep || cep });
        this.setState({ addressId: "" });

        // this.setState({ newCep: addressComplete.cep });
        this.setState({ local: addressComplete.logradouro });
        this.setState({ bairro: addressComplete.bairro });
        this.setState({ cidade: addressComplete.localidade });
        this.setState({ estado: addressComplete.uf });
      }

      if (addressComplete.erro) {
        this.setState({ CEP: cep });
        this.setState({ local: "" });
        this.setState({ bairro: "" });
        this.setState({ cidade: "" });
        this.setState({ estado: "" });

        return toast.error("Por favor, digite um CEP valido");
      }
    }
  }

  async componentDidMount() {
    const localToken = getToken && getToken();
    const { token } = await this.props;

    const { data } = await axios.get(
      `${API}/stores/${loja}/clients/me`,
      getHeaders(token || localToken)
    );

    this.setState({ CEP: data.zipcode });
    this.setState({ newCep: data.zipcode });
    this.setState({ addressId: data.addressId });
    this.setState({ local: data.street });
    this.setState({ numero: data.number });
    this.setState({ bairro: data.neighborhood });
    this.setState({ complemento: data.complement });
    this.setState({ cidade: data.city });
    this.setState({ estado: data.state });
    this.setState({ token: token });
  }

  componentDidUpdate(prevProps) {}

  render() {
    const { local, numero, bairro, complemento, cidade, estado, CEP } =
      this.state;

    return (
      <div className="flex-1 flex vertical update-delivery">
        <div className="flex-1 text-field_input">
          <TextField
            id="outlined-required"
            required
            label="CEP"
            fullWidth={true}
            variant="outlined"
            value={CEP || " "}
            onChange={(e) => this.handleCepData(formatCEP(e.target.value))}
          />
        </div>
        <div className="flex-1 flex horizontal">
          <div className="flex-1 text-field_input">
            <TextField
              id="outlined-required"
              required
              label="Logradouro"
              fullWidth={true}
              variant="outlined"
              value={local || " "}
              onChange={(e) => this.onChange("local", e)}
            />
          </div>
          <div className="numero-input">
            <TextField
              id="outlined-required"
              required
              label="Número"
              fullWidth={true}
              variant="outlined"
              value={numero || " "}
              onChange={(e) =>
                this.setState({ numero: formatNumber(e.target.value) })
              }
            />
          </div>
        </div>

        <div className="flex-1 flex vertical">
          <div className="flex-1 text-field_input">
            <TextField
              id="outlined-required"
              required
              label="Bairro"
              fullWidth={true}
              variant="outlined"
              value={bairro || " "}
              onChange={(e) => this.onChange("bairro", e)}
            />
          </div>
          <div className="flex-1 text-field_input">
            <TextField
              id="outlined-required"
              required
              label="Complemento"
              fullWidth={true}
              variant="outlined"
              value={complemento || " "}
              onChange={(e) => this.onChange("complemento", e)}
            />
          </div>
        </div>
        <div className="flex-1 flex horizontal">
          <div className="flex-1 text-field_input">
            <TextField
              id="outlined-required"
              required
              label="Cidade"
              fullWidth={true}
              variant="outlined"
              value={cidade || " "}
              onChange={(e) => this.onChange("cidade", e)}
            />
          </div>
          <div className="estado-input">
            <TextField
              id="outlined-select-currency-native"
              select
              label="UF"
              value={estado}
              onChange={(e) => this.onChange("estado", e)}
              SelectProps={{
                native: true,
              }}
              variant="outlined"
            >
              {Object.keys(ESTADOS).map((abbr) => (
                <option key={abbr} value={abbr}>
                  {ESTADOS[abbr]}
                </option>
              ))}
            </TextField>
          </div>
        </div>
        <Link href="/checkoutFinal">
        <button
          className="btn btn-success"
          onClick={() => this.handleCreateOrUpdateShipping()}
        >
          Ir para pagamento
        </button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
  novoEndereco: state.client.newAddress,
  atualizaEndereco: state.client.updateAddress,
});

export default connect(mapStateToProps, actions)(AtualizacaoDadosEntrega);
