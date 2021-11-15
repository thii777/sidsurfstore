import React, { Component } from 'react';
import Router from 'next/router';
import { connect } from 'react-redux';
import actions from '../../redux/actions';

class Pesquisa extends Component {
  state = { termo: "" };

  submitPesquisa() {
    const { termo } = this.state;
    this.props.fetchTermo(termo);
    Router.push({ pathname: "/pesquisa", query: { termo } });
  }

  render() {
    return (
      <div className="flex-3 flex flex-center input-container">
        <input
          name="pesquisa"
          value={this.state.termo}
          onChange={(e) => this.setState({ termo: e.target.value })}
          placeholder="O que você procura?"
          className="input-pesquisa"
        />
        <button
          onClick={() => this.submitPesquisa()}
          className="button-pesquisa"
        >
          <i className="fa fa-search"></i>
        </button>
      </div>
    );
  }
}

export default connect(null, actions)(Pesquisa);
