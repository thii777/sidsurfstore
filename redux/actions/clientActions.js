import {
  FETCH_CLIENTE,
  LOGOUT_CLIENTE,
  NEW_CLIENT,
  NEW_ADDRESS,
  UPDATE_CLIENT,
  CHECK_CLIENTE_EXIST,
  UPDATE_ADDRESS,
} from "../types";
import axios from "axios";
import { API, versao, loja } from "../../config";
import { setCookie, getCookie } from "../../utils/cookie";
import { getHeaders } from "./helpers";
import { autenticar, desautenticar } from "./authActions";
import errorHandling from "./errorHandling";

export const getRawData = (data) => {
  let _data = data.split("/");
  let ano = _data[2];
  let _mes = _data[1];
  let mes = _mes < 10 ? "0" + _mes : _mes;
  let _dia = Number(_data[0]) + 1;
  let dia = _dia < 10 ? "0" + _dia : _dia;
  return `${ano}-${mes}-${dia}`;
};

export const fetchClient = (token) => (dispatch) => {
  axios
    .get(`${API}/stores/${loja}/clients/me`, getHeaders(token))
    .then((response) => {
      dispatch({ type: FETCH_CLIENTE, payload: response.data });
    })
    .catch((e) => console.log(e));
};

export const checkClientExist = (cpf) => (dispatch) => {
  axios
    .post(`${API}/stores/${loja}/clients/check-customer`, { cpf: String(cpf) })
    .then((response) => {
      dispatch({ type: CHECK_CLIENTE_EXIST, payload: response.data });
    })
    .catch((e) => console.log(e));
};

export const updateUser = (payload, token) => (dispatch) => {
  axios
    .put(
      `${API}/users`,
      {
        userName: payload.userName,
        email: payload.email,
        password: payload.password ? payload.password : null,
        avatar_id: payload.avatar_id,
      },
      getHeaders(token)
    )
    .then((response) => {
      dispatch({ type: UPDATE_USER, payload: response.data });
    })
    .catch((e) => console.log(e));

  axios
    .put(
      `${API}/stores/${loja}/clients/me`,
      {
        dateOfBirth: payload.dateOfBirth,
        cpf: payload.cpf,
      },
      getHeaders(token)
    )
    .then((response) => {
      dispatch({ type: UPDATE_CLIENT, payload: response.data });
    })
    .catch((e) => console.log(e));

  axios
    .put(
      `${API}/stores/${loja}/addresses/${payload.addressId}`,
      {
        zipcode: payload.cep,
        street: payload.local,
        number: payload.numero,
        complement: payload.complemento,
        neighborhood: payload.bairro,
        city: payload.cidade,
        state: payload.estado,
        // state_code: payload.state_code,
        country: payload.country,
      },
      getHeaders(token)
    )
    .then((response) => {
      dispatch({ type: UPDATE_CLIENT, payload: response.data });
    })
    .catch((e) => console.log(e));
};

export const newClient = (payload, cb) => (dispatch) => {
  axios
    .post(`${API}/stores/${loja}/clients`, {
      userName: payload.userName,
      email: payload.email,
      password: payload.password,
      cpf: payload.cpf,
      dateOfBirth: getRawData(payload.dateOfBirth),
      address: {
        zipcode: payload.zipcode,
        street: payload.street,
        number: payload.number,
        complement: payload.complement,
        neighborhood: payload.neighborhood,
        city: payload.city,
        state: payload.street,
        state_code: payload.state_code,
        country: payload.country,
        storeIdToAddress: payload.storeIdToAddress,
      },
    })
    .then((response) => {
      dispatch({ type: NEW_CLIENT, payload: response.data });
      dispatch(
        autenticar(
          { email: payload.email, password: payload.password },
          null,
          cb
        )
      );
      cb(null);
    })
    .catch((e) => cb(errorHandling(e)));
};

export const newAddress = (payload, token, cb) => (dispatch) => {
  if (payload.local) {
    axios
      .post(
        `${API}/stores/${loja}/addresses`,
        {
          zipcode: payload.CEP,
          street: payload.local,
          number: payload.numero,
          complement: payload.complemento,
          neighborhood: payload.cidade,
          city: payload.cidade,
          state: payload.estado,
          state_code: "sp",
          country: "Brasil",
          storeIdToAddress: 1,
          // TODO - criar ENUM com tipos de endereço no backend
        },
        getHeaders(token)
      )
      .then((response) => {
        console.log(response, "aciotn addres");
        dispatch({ type: NEW_ADDRESS, payload: response.data });
      })
      .catch((e) => cb(errorHandling(e)));
  }
};

export const updateAddress = (addressId, payload, token, cb) => (dispatch) => {
  axios
    .put(
      `${API}/stores/${loja}/addresses/${parseInt(addressId)}`,
      {
        zipcode: payload.CEP,
        street: payload.local,
        number: payload.numero,
        complement: payload.complemento,
        neighborhood: payload.bairro,
        city: payload.cidade,
        state: payload.estado,
        state_code: "sp",
        country: "Brasil",
        storeIdToAddress: 1,
        // TODO - criar ENUM com tipos de endereço no backend
      },
      getHeaders(token)
    )
    .then((response) => {
      dispatch({ type: UPDATE_ADDRESS, payload: response.data });
    })
    .catch((e) => cb(errorHandling(e)));
};

export const logoutClient = () => (dispatch) => {
  dispatch(desautenticar());
  dispatch({ type: LOGOUT_CLIENTE });
};

export default {
  fetchClient,
  checkClientExist,
  updateUser,
  newClient,
  updateAddress,
  newAddress,
  logoutClient,
};
