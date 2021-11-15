import axios from 'axios';
import { API, loja } from '../../config';
import { getCart, removeCart, cleanCart } from '../../utils/cart';
import {
    SET_CARRINHO,
    CLEAN_CARRINHO,
    FETCH_PRODUTO_CARRINHO,
    FETCH_VARIACAO_CARRINHO,
    FETCH_VALOR_ENTREGA,
    UPDATE_QTD_CART,
    UPDATE_FRETE_CART,
    REMOVE_PROD_CART,
    CLEAN_FRETES
} from '../types';

export const setCarrinho = () => ({ type: SET_CARRINHO, carrinho: getCart() });

export const cleanCarrinho = () => {
    cleanCart();
    return { type: CLEAN_CARRINHO };
};

export const fetchProdutoCarrinho = (id, idxCarrinho) => dispatch => {
    axios.get(`${API}/stores/${loja}/products/${parseInt(id)}`)
        .then(response => dispatch({
            type: FETCH_PRODUTO_CARRINHO,
            payload: response.data,
            idxCarrinho
        }))
        .catch(e => console.log(e));
};

export const fetchVariacoesCarrinho = (id, produto, idxCarrinho) => dispatch => {
    axios.get(`${API}/stores/${loja}/variations/${parseInt(id)}`)
        .then(response => dispatch({
            type: FETCH_VARIACAO_CARRINHO,
            payload: response.data,
            idxCarrinho
        }))
        .catch(e => console.log(e));
};

export const calcularFrete = (id, cep) => dispatch => {
    axios.post(`${API}/stores/${loja}/calculateFreight/variations/${parseInt(id)}`, { cep })
        .then(response => dispatch({
            type: FETCH_VALOR_ENTREGA,
            payload: response.data,
            cep
        }))
        .catch(e => console.log(e));
};

export const removerProduto = (index) => {
    removeCart(index);
    return { type: REMOVE_PROD_CART, idxCarrinho: index };
};

export const updateQuantidade = (change, index) => ({
    type: UPDATE_QTD_CART,
    change,
    idxCarrinho: index
});

export const selecionarFrete = (freteSelecionado) => ({
    type: UPDATE_FRETE_CART,
    freteSelecionado
});

export const cleanFretes = () => ({ type: CLEAN_FRETES });

export default {
    setCarrinho,
    cleanCarrinho,
    fetchProdutoCarrinho,
    fetchVariacoesCarrinho,
    calcularFrete,
    updateQuantidade,
    selecionarFrete,
    removerProduto,
    cleanFretes
};