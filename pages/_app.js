import { Provider } from "react-redux";
import App, { Container } from "next/app";
import withRedux from "next-redux-wrapper";
import { initStore } from "../redux";
import DataContext from "../containers/Context/DataContext";
import { getCountItemsCart } from "../utils/cart";

class Main extends App {
  state = {
    qtd: 0,
  };
  static async getInitialProps({ Component, ctx }) {
    return {
      pageProps: Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {},
    };
  }

  componentDidMount() {
    this.setState({ qtd: getCountItemsCart() });
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <DataContext.Provider
        value={{
          state: this.state,
          updateQtd: (qtd) => {
            this.setState({
              qtd: qtd,
            });
          },
        }}
      >
        <Container>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </Container>
      </DataContext.Provider>
    );
  }
}

export default withRedux(initStore)(Main);
