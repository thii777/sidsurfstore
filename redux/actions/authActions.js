import { AUTENTICAR_TOKEN, AUTENTICAR, USER } from "../types";
import axios from "axios";
import { API } from "../../config";
import errorHandling from "./errorHandling";
import { setCookie, removeCookie, getCookie } from "../../utils/cookie";
import { addToken } from "../../utils/token";
import { fetchClient } from "./clientActions";

const getHeaders = (token) => ({
  header: { Authorization: `Bearer ${token}` },
});

export const getUser =
  // TODO - decidir se decodifica o token e pega userId e storeId, ou se faz a query no back pelo proprio token
    ({ token }) =>
    (dispatch) => {
      axios
        .get(`${API}/stores/1/clients/2`, getHeaders(token))
        .then((response) => {
          dispatch({ type: USER, payload: response.data.user });
        })
        .catch((e) => console.log(e));
    };

export const autenticar =
  ({ email, cpf, password }, goTo = false, cb) =>
  (dispatch) => {
    axios
    .post(`${API}/session`, { email, cpf, password })
    .then((response) => {
        console.log(response, cpf)
        addToken(response.data.user.token);
        setCookie("token", response.data.user.token);
        if (goTo) Router.push(goTo);
        dispatch({ type: AUTENTICAR, payload: response.data });
        dispatch(
          fetchClient(response.data.user.userId, response.data.user.token)
        );
      })
      .catch((e) => cb(errorHandling(e)));
  };

export const reauthenticate = (token) => ({
  type: AUTENTICAR_TOKEN,
  payload: token,
});

export const desautenticar = () => (dispatch) => {
  removeCookie("token");
  Router.push("/");
  dispatch({ type: DESAUTENTICAR });
};

export default {
  getUser,
  autenticar,
  reauthenticate,
  desautenticar,
};
