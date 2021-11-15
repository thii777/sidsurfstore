import { combineReducers } from 'redux';

import authReducer from './authReducer';
import categoriaReducer from './categoriaReducers';
import lojaReducer from './lojaReducers';
import produtoReducer from './produtoReducers';
import carrinhoReducer from './carrinhoReducers';
import clientReducer from './clientReducer';
import pedidoReducer from './pedidoReducers';

export default combineReducers({
  auth: authReducer,
  client: clientReducer,
  categoria: categoriaReducer,
  loja: lojaReducer,
  produto: produtoReducer,
  carrinho: carrinhoReducer,
  pedido: pedidoReducer
});