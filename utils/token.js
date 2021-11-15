export const addToken = (token) => {
  localStorage.setItem("@token", JSON.stringify(token));
};

export const getToken = () => {
  if (typeof window !== "undefined")
    return JSON.parse(localStorage.getItem("@token"));
};

export const cleanToken = () => {
  JSON.parse(localStorage.removeItem("@token"));
};
