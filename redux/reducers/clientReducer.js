import {
  NEW_USER,
  NEW_CLIENT,
  NEW_ADDRESS,
  FETCH_CLIENTE,
  UPDATE_USER,
  CHECK_CLIENTE_EXIST,
  UPDATE_ADDRESS
} from "../types";

const initialState = { token: null, usuario: null };

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CLIENTE:
      return {
        ...state,
        cliente: action.payload,
      };
    case CHECK_CLIENTE_EXIST:
      return {
        ...state,
        check_client_exist: action.payload,
      };
    case NEW_USER:
      return { ...state, newUser: action.payload };
    case NEW_CLIENT:
      return { ...state, newClient: action.payload };
    case NEW_ADDRESS:
      return { ...state, newAddress: action.payload };
    case UPDATE_ADDRESS:
      return { ...state, updateAddress: action.payload };
    case UPDATE_USER:
      return { ...state, updateUser: action.payload };
    default:
      return state;
  }
};
