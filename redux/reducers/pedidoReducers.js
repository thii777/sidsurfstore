import {
  FETCH_PEDIDOS,
  FETCH_PEDIDO,
  CLEAN_PEDIDO,
  CANCELAR_PEDIDO,
  CREATE_ORDER
} from "../types";

// const CREATE_ORDER = "CREATE_ORDER"

const initialState = {
  pedidos: null,
  pedido: null,
};

export default function pedidoReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_ORDER:
        return {
            ...state,
            criarPedido: action.payload
        }
    case FETCH_PEDIDOS:
      return {
        ...state,
        pedidos: action.payload,
      };
    case FETCH_PEDIDO:
      return {
        ...state,
        pedido: action.payload,
      };
    case CLEAN_PEDIDO:
      return {
        ...state,
        pedido: null,
        pedidoRegistros: null,
      };
    case CANCELAR_PEDIDO:
      return {
        ...state,
        pedido: state.pedido ? { ...state.pedido, cancelado: true } : null,
      };
    default:
      return state;
  }
}
