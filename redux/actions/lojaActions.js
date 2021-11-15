import axios from 'axios';
import {
  FETCH_DADOS
} from '../types';
import { API, loja } from '../../config';

export const fetchDadosLoja = () => (dispatch) => {
  return axios
    .get(`${API}/stores/${loja}`)
    .then(({ data }) => {
      dispatch({ type: FETCH_DADOS, payload: data });
    })
    .catch((e) => console.log(e));
}

export default {
  fetchDadosLoja
};