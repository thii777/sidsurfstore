import { AUTENTICAR_TOKEN, AUTENTICAR, USER } from "../types";

const initialState = { token: null, usuario: null };
export default (state = initialState, action) => {
  switch (action.type) {
    case USER:
      return {
        ...state,
        usuario: action.payload,
        token: action.payload ? action.payload.token : null,
      };
      
    case AUTENTICAR_TOKEN:
      return { ...state, token: action.payload };

    case AUTENTICAR:
      return {
        ...state,
        token: action.payload.user ? action.payload.user.token : null,
        usuario: action.payload.user || null,
      };
    default:
      return state;
  }
};
