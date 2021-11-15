import {
  FETCH_CATEGORIAS,
  FETCH_CATEGORIA,
  FETCH_CATEGORIA_PRODUTOS,
} from "../types";
import axios from "axios";
import { API, loja } from "../../config";


export const fetchCategorias = () => (dispatch) => {
  return axios
    .get(`${API}/stores/${loja}/categories`)
    .then(({ data }) => {
      dispatch({ type: FETCH_CATEGORIAS, payload: data }); 
    })
    .catch((e) => console.log(e));
};

export const fetchCategoria = (id) => (dispatch) => {
  axios
    .get(`${API}/stores/${loja}/categories/${id}`)
    .then((response) =>
      dispatch({ type: FETCH_CATEGORIA, payload: response.data })
    )
    .catch((e) => console.log(e));
};

export const fetchProdutosCategoria = (id, skip = 0, limit = 4) => (dispatch) => {
  axios
    .get(`${API}/stores/${loja}/category/${id}/products?page=${skip}&limit=${limit}`)
    .then((response) => {
      dispatch({ type: FETCH_CATEGORIA_PRODUTOS, payload: response.data })
    })
    .catch((e) => console.log(e));
};

export default {
  fetchCategorias,
  fetchCategoria,
  fetchProdutosCategoria,
};
