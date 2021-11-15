import React, { Component } from "react";
import Link from "next/link";
import { connect } from "react-redux";
import actions from "../../redux/actions";
import { createOrder } from "../../redux/actions/pedidoActions";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import FormRadio from "../../components/Inputs/FormRadio";
import TextField from "@material-ui/core/TextField";
import { getToken } from "../../utils/token";

class DadosPagamento extends Component {
  state = {
    CPF: "",
    // PAYMENT
    opcaoPagamentoSelecionado: "boleto",
    holderName: "Jose da Silva",
    numeroCartao: "4111111111111111",
    CVCartao: "123",
    mesCartao: "03",
    anoCartao: "2026",
    value: 1000,
    installment: 1,
    // FRETE
    cost: 25,
    deadline: 5,
    type: "PAC",
    //ADDRESS
    city: "",
    complement: "",
    country: "",
    neighborhood: "",
    number: "",
    state: "",
    state_code: "",
    street: "",
    zipcode: "",
    //CART
    cart: [],
    //CANCELAMENTO
    cancel: false,
    //CREDENTIALS
    token: "",
    orderProcess: "AWAITING",
  };

  async orderFinish() {
    this.setState({ orderProcess: "PROCESSING" });

    const { cleanCarrinho } = this.props;

    const processOrderResponse = await createOrder(this.state);

    console.log("res dados pagamento", processOrderResponse);

    if (!processOrderResponse) {
      this.setState({ orderProcess: "DENIED" });
      return toast.error("Erro ao processar pagamento");
    }

    const { paymentResponse } = processOrderResponse.data;

    if (
      paymentResponse.message == "SUCESSO" ||
      paymentResponse.paymentStatus == "AUTHORIZED"
    ) {
      this.setState({ orderProcess: "APPROVED" });

      if (this.state.orderProcess == "APPROVED")
        toast.success("Pedido realizado com sucesso ;)");
      return;
      //REDIRECIONAR PARA A PAGINA DE SUCESSO;
    }
    // cleanCarrinho();

    this.setState({ orderProcess: "DENIED" });

    if (this.state.orderProcess == "DENIED") toast.error("Pedido negado ;)");
  }

  async componentDidMount() {
    const { carrinho, fetchClient, cliente } = this.props;

    let newCart =
      carrinho &&
      carrinho.map(({ variationId, quantidade }) => {
        return {
          variation_id: variationId,
          staticalProduct: variationId,
          amount: quantidade,
        };
      });

    newCart = newCart ? [...newCart] : "";

    fetchClient(this.state.token);
    this.setState({ cart: newCart });
    this.setState({ token: getToken && getToken() });
    this.setState({ CPF: cliente && cliente.cpf });
    this.setState({ city: cliente && cliente.city });
    this.setState({ complement: cliente && cliente.complement });
    this.setState({ country: cliente && cliente.country });
    this.setState({ neighborhood: cliente && cliente.neighborhood });
    this.setState({ number: cliente && cliente.number });
    this.setState({ state: cliente && cliente.state });
    this.setState({ state_code: cliente && cliente.state_code });
    this.setState({ zipcode: cliente && cliente.zipcode });
  }

  renderOpcoesPagamento() {
    const { opcaoPagamentoSelecionado } = this.state;

    return (
      <div
        className={
          opcaoPagamentoSelecionado === "cartao"
            ? "flex horizontal Dados_Pagamento"
            : "flex horizontal Dados_Pagamento_boleto"
        }
      >
        <div>
          <FormRadio
            name="tipo_pagamento_selecionado"
            checked={opcaoPagamentoSelecionado === "cartao"}
            onChange={() =>
              this.setState({ opcaoPagamentoSelecionado: "cartao" })
            }
            label="Cartão de Crédito"
          />
        </div>
        <div>
          <FormRadio
            name="tipo_pagamento_selecionado"
            checked={opcaoPagamentoSelecionado === "boleto"}
            onChange={() =>
              this.setState({ opcaoPagamentoSelecionado: "boleto" })
            }
            label="Boleto Bancário"
          />
        </div>
      </div>
    );
  }

  onChange = (field, e) => this.setState({ [field]: e.target.value });

  renderPagamentoComBoleto() {
    const { CPF } = this.state;

    return (
      <div className="Dados-Pagamento">
        <div className="text-field_input pagamento-input-boleto">
          <TextField
            id="outlined-required"
            required
            label="CPF"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            value={CPF}
            onChange={(e) => this.onChange("CPF", e)}
          />
        </div>
      </div>
    );
  }

  renderPagamentoComCartao() {
    const { holderName, numeroCartao, CVCartao, mesCartao, anoCartao } =
      this.state;

    return (
      <div className="Dados-Pagamento">
        <div className="text-field_input pagamento-input">
          <TextField
            id="outlined-required"
            required
            label="Número do cartão"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            value={numeroCartao}
            onChange={(e) => this.onChange("numeroCartao", e)}
          />
        </div>
        <div className="flex horizontal">
          <div className="flex-1 text-field_input pagamento-input">
            <TextField
              id="outlined-required"
              required
              label="Nome do titular"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              value={holderName}
              onChange={(e) => this.onChange("holderName", e)}
            />
          </div>
        </div>
        <div className="flex text-field_input pagamento-input">
          <TextField
            id="outlined-required"
            required
            label="Mês"
            placeholder="MM"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            value={mesCartao}
            onChange={(e) => this.onChange("mesCartao", e)}
          />
          <TextField
            id="outlined-required"
            required
            label="Ano"
            style={{ marginLeft: 8 }}
            placeholder="AAAA"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            value={anoCartao}
            onChange={(e) => this.onChange("anoCartao", e)}
          />
          <TextField
            id="outlined-required"
            required
            label="Código de segurança"
            style={{ marginLeft: 8 }}
            placeholder="XXX"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            value={CVCartao}
            onChange={(e) => this.onChange("CVCartao", e)}
          />
        </div>
        <div className="flex">
          <TextField
            id="outlined-select-currency-native"
            select
            label="Parcelas"
            SelectProps={{
              native: true,
            }}
            variant="outlined"
          >
            <option>Parcelamento</option>
            <option value="1">1x de R$ 105,00 sem juros</option>
            <option value="2">2x de R$ 62,50 sem juros</option>
            <option value="3">3x de R$ 35,00 sem juros</option>
            <option value="4">4x de R$ 31,75 sem juros</option>
            <option value="5">5x de R$ 21,00 sem juros</option>
            <option value="6">6x de R$ 17,50 sem juros</option>
          </TextField>
        </div>
      </div>
    );
  }

  render() {
    const { opcaoPagamentoSelecionado } = this.state;
    if (this.state.orderProcess == "PROCESSING")
      toast.loading("Processando pagamento...");
    if (this.state.orderProcess !== "PROCESSING") toast.dismiss();
    return (
      <div className="Dados-Pagamento-Container">
        {this.renderOpcoesPagamento()}
        {opcaoPagamentoSelecionado === "boleto" &&
          this.renderPagamentoComBoleto()}
        {opcaoPagamentoSelecionado === "cartao" &&
          this.renderPagamentoComCartao()}
        <div className="flex flex-right Button-payment-responsive">
          {/* <Link href="/OrderFinishedPage"> */}
          <button
            className="btn btn-cta btn-success button-responsive"
            onClick={() => this.orderFinish()}
          >
            <span>CONCLUIR PEDIDO</span>
          </button>
          {/* </Link> */}
        </div>
        <ToastContainer
          position="top-center"
          autoClose={5500}
          hideProgressBar={true}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          className="toast-container"
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  carrinho: state.carrinho.carrinho,
  cliente: state.client.cliente,
  criarPedido: state.pedido.criarPedido,
});

export default connect(mapStateToProps, actions)(DadosPagamento);
