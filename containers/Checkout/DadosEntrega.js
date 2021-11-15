import React, { Component } from 'react';
import FormSimples from '../../components/Inputs/FormSimples';
import TextField from '@material-ui/core/TextField';
import { ESTADOS } from '../../utils';

export default class DadosClienteContainer extends Component {

  state = {
    dadosEntregaIgualDadosCobranca: true,
    local: "",
    numero: "",
    bairro: "",
    complemento: "",
    cidade: "",
    estado: "",
    CEP: "",
    dadosCobranca: {
      local: "",
      numero: "",
      bairro: "",
      complemento: "",
      cidade: "",
      estado: "",
      CEP: ""
    }
  };

  onChange = (field, e) => this.setState({ [field]: e.target.value });

  onChangeCobranca = (field, e) => {
    const { state } = this;
    state.dadosCobranca[field] = e.target.value;
    this.setState(state);
  };

  renderDadosDeEntrega() {
    const {
      dadosEntregaIgualDadosCobranca,
      local,
      numero,
      bairro,
      complemento,
      cidade,
      estado,
      CEP
    } = this.state;

    return (
      <div className="flex-1 flex vertical">
        <div>
          <h2>Dados De Entrega</h2>
        </div>
        <div className="flex-1 text-field_input">
          <TextField
            id="outlined-required"
            required
            label="CEP"
            fullWidth={true}
            variant="outlined"
            value={CEP || " "}
            onChange={(e) => this.onChange("CEP", e)} />
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
              onChange={(e) => this.onChange("local", e)} />
          </div>
          <div className="numero-input">
            <TextField
              id="outlined-required"
              required
              label="Número"
              fullWidth={true}
              variant="outlined"
              value={numero || " "}
              onChange={(e) => this.onChange("numero", e)} />
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
              onChange={(e) => this.onChange("bairro", e)} />
          </div>
          <div className="flex-1 text-field_input">
            <TextField
              id="outlined-required"
              required
              label="Complemento"
              fullWidth={true}
              variant="outlined"
              value={complemento || " "}
              onChange={(e) => this.onChange("complemento", e)} />
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
              onChange={(e) => this.onChange("cidade", e)} />
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
              { Object.keys(ESTADOS).map((abbr) => 
              (<option key={abbr} value={abbr}>{ESTADOS[abbr]}</option>)) }
            </TextField>
          </div>
        </div>
        <br/>
        <div>
          <input
            checked={dadosEntregaIgualDadosCobranca} 
            type="checkbox"
            onChange={() =>this.setState({"dadosEntregaIgualDadosCobranca" : !dadosEntregaIgualDadosCobranca})}
          />
          <label>&nbsp;Os dados de entrega são iguais aos dados de cobrança</label>
        </div>
      </div>
    );
  }

  renderDadosDeCobranca() {
    const {
      local,
      numero,
      bairro,
      complemento,
      cidade,
      estado,
      CEP
    } = this.state.dadosCobranca;

    return (
      <div className="flex-1 flex vertical">
        <div className="dados-cobranca">
          <h2>Dados De Cobrança</h2>
        </div>
        <div className="flex-1 text-field_input">
          <TextField
            id="outlined-required"
            required
            label="CEP"
            fullWidth={true}
            variant="outlined"
            value={CEP || " "}
            onChange={(e) => this.onChangeCobranca("CEP", e)} />
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
              onChange={(e) => this.onChangeCobranca("local", e)} />
          </div>
          <div className="numero-input">
            <TextField
              id="outlined-required"
              required
              label="Número"
              fullWidth={true}
              variant="outlined"
              value={numero || " "}
              onChange={(e) => this.onChangeCobranca("numero", e)} />
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
              onChange={(e) => this.onChangeCobranca("bairro", e)} />
          </div>
          <div className="flex-1 text-field_input">
            <TextField
              id="outlined-required"
              required
              label="Complemento"
              fullWidth={true}
              variant="outlined"  
              value={complemento || " "}
              onChange={(e) => this.onChangeCobranca("complemento", e)} />
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
              onChange={(e) => this.onChangeCobranca("cidade", e)} />
          </div>
          <div className="estado-input">
            <TextField 
              id="outlined-select-currency-native"
              select
              label="UF"
              value={estado || " "}
              onChange={(e) => this.onChangeCobranca("estado", e)}
              SelectProps={{
                native: true,
              }}
              variant="outlined"
            >
              { Object.keys(ESTADOS).map((abbr) => 
              (<option key={abbr} value={abbr}>{ESTADOS[abbr]}</option>)) }
            </TextField>
          </div>
        </div>
      </div>
    );
  }


  render() {
    const { dadosEntregaIgualDadosCobranca } = this.state;

    return (
      <div className="flex-1">
        { this.renderDadosDeEntrega()}
        { !dadosEntregaIgualDadosCobranca && this.renderDadosDeCobranca() }
      </div>
    );
  }
}