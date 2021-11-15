import React from 'react';
import { connect } from 'react-redux';


class DadosDaLoja extends React.Component {

  render() {
    if (!this.props.loja) return (<div></div>);
    const [ loja ]  = this.props.loja
    
    return (
      <div className="flex-1 dados-da-loja">
        <div>
          <h2>Entre em Contato</h2>
          <br />
        </div>
          <p className="loja-nome">Nome: {loja.storeName}</p>
          <p className="loja-cnpj">CNPJ: {loja.cnpj}</p>
          <p className="loja-nome">E-mail: <a href={`mailto:${loja.email}`}>{loja.email}</a></p>
          <p className="loja-telefones">Telefones: <a href={`phone:${loja.cellPhone}`}>{loja.cellPhone}</a></p>
          <p className="loja-endereço">{loja.street}, {loja.number} - {loja.neighborhood}</p>
          <p className="loja-cidade">{loja.city}/{loja.state_code} - {loja.zipcode}</p>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loja: state.loja.loja
});

export default connect(mapStateToProps)(DadosDaLoja);