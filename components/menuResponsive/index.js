import React, { Component } from "react";
import Link from "next/link";
import { connect } from "react-redux";
import { getToken } from "../../utils/token";
import axios from "axios";
import { API, loja } from "../../config";
import { getHeaders } from "../../redux/actions/helpers";

class MenuResposive extends Component {
  state = {
    open: false,
    userName: "",
  };

  async componentDidMount() {
    const token = getToken && getToken();
    if (token) {
      try {
        const { data } = await axios.get(
          `${API}/stores/${loja}/clients/me`,
          getHeaders(token)
        );
        if (data) {
          this.setState({ userName: data.userName });
        }
      } catch (e) {
        throw e;
      }
    }
  }

  componentDidUpdate() {}

  toggleOpen = async () => {
    this.setState({ open: !this.state.open });
  };

  handleMenuResponsive() {
    const { categorias } = this.props;
    return (
      <div className="Menu-responsive">
        <div className="Header-menu-responsive">
          <div className="header-menu-responsive">
            {this.state.userName ? (
              <p>
                <span className="login-responsive">{`Olá ${this.state.userName.toUpperCase()}`}</span>
              </p>
            ) : (
              <p>
                <Link href="/customer-area">
                  <span className="login-responsive">Entrar</span>
                </Link>
              </p>
            )}
            <p onClick={() => this.toggleOpen()}>
              <i className="fa fa-angle-left"></i>
            </p>
          </div>
          <div className="my-orders-responsive">
            <p>
              <Link href="/customer-area">
                <span className="login-responsive">Meus pedidos</span>
              </Link>
            </p>
          </div>
        </div>

        <h3 className="Categories">Categorias e departamentos</h3>
        <div className="categories">
          {categorias.map((categoria) => (
            <Link
              href={`/category/${categoria.categoryName}?id=${categoria.categoryId}`}
              key={categoria.categoryId}
            >
              <div
                onClick={() => this.toggleOpen()}
                className="categoria-item categoria-item-responsive flex-1 flex"
              >
                <span className="category">{categoria.categoryName}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  render() {
    const { open } = this.state;

    return (
      <div className="menu-responsive">
        <div>
          {open ? this.handleMenuResponsive() : ""}
          <div onClick={() => this.toggleOpen()}>
            <i className="fa fa-bars"></i>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  categorias: state.categoria.categorias,
});

export default connect(mapStateToProps)(MenuResposive);
