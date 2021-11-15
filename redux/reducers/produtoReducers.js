import {
  FETCH_PRODUTOS,
  FETCH_PESQUISA,
  FETCH_PRODUTOS_PESQUISA,
  FETCH_PRODUTO,
  FETCH_PRODUTO_AVALIACOES,
  FETCH_PRODUTO_VARIACOES
} from '../types';

const initialState = {
  produtos: null,
  termo: "",
  produtosPesquisa: null,
  produto: null,
  variacoes: null
};

export default (state = initialState, action) => {
  switch(action.type){
    case FETCH_PRODUTOS:
      return {
        ...state,
        produtos: action.payload
      }
    case FETCH_PESQUISA:
      return {
        ...state,
        termo: action.termo
      }
    case FETCH_PRODUTOS_PESQUISA:
      return {
        ...state,
        produtosPesquisa: action.payload,
        termo: action.termo
      }
    case FETCH_PRODUTO:
      return {
        ...state,
        produto: action.payload
      }
    // case FETCH_PRODUTO_AVALIACOES:
    //   return {
    //     ...state,
    //     avaliacoes: action.payload
    //   }
    case FETCH_PRODUTO_VARIACOES:
      return {
        ...state,
        variacoes: action.payload
      }
    default:
      return state;
  }
}